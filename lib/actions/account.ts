"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { accountPost, clearToken, readToken, setToken } from "@/lib/account";

export interface AccountState {
  error?: string;
  ok?: boolean;
}

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

/** Only ever send the shopper back inside the site. */
function safeNext(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

export async function signUp(
  _state: AccountState,
  formData: FormData
): Promise<AccountState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");
  if (password !== confirm) return { error: "The two passwords do not match." };

  const { status, data } = await accountPost("register", {
    name: field(formData, "name"),
    email: field(formData, "email"),
    password,
    phone: field(formData, "phone"),
    address: field(formData, "address"),
    city: field(formData, "city"),
  });

  if (status !== 201) {
    return { error: String(data.error ?? "We could not create your account.") };
  }

  await setToken(String(data.token), String(data.expiresAt));
  redirect(safeNext(field(formData, "next")));
}

export async function signIn(
  _state: AccountState,
  formData: FormData
): Promise<AccountState> {
  const { status, data } = await accountPost("login", {
    email: field(formData, "email"),
    password: String(formData.get("password") ?? ""),
  });

  if (status !== 200) {
    return { error: String(data.error ?? "We could not sign you in.") };
  }

  await setToken(String(data.token), String(data.expiresAt));
  redirect(safeNext(field(formData, "next")));
}

export async function signOut(): Promise<void> {
  const token = await readToken();
  // Revoke server-side first so the session dies even if the cookie lingers.
  await accountPost("logout", {}, token).catch(() => undefined);
  await clearToken();
  redirect("/");
}

export async function saveProfile(
  _state: AccountState,
  formData: FormData
): Promise<AccountState> {
  const token = await readToken();
  if (!token) return { error: "You are signed out. Sign in and try again." };

  const { status, data } = await accountPost(
    "profile",
    {
      name: field(formData, "name"),
      phone: field(formData, "phone"),
      address: field(formData, "address"),
      city: field(formData, "city"),
    },
    token
  );

  if (status !== 200) {
    return { error: String(data.error ?? "We could not save your details.") };
  }

  revalidatePath("/account");
  return { ok: true };
}

export interface CheckoutState {
  error?: string;
  orderNumber?: number;
}

/**
 * Placing an order runs through the server so the signed-in customer can be
 * attached from the httpOnly cookie, and so the API key never reaches the
 * browser. Guests take the same path with no token.
 */
export async function placeOrder(
  lines: Array<{ slug: string; qty: number }>,
  details: { name: string; phone: string; address: string; city: string; notes: string }
): Promise<CheckoutState> {
  if (lines.length === 0) return { error: "Your cart is empty." };

  const token = await readToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BACKEND_URL}/glaze/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_API_KEY}`,
      ...(token ? { "X-Customer-Token": token } : {}),
    },
    cache: "no-store",
    body: JSON.stringify({
      Name: details.name,
      Phone: details.phone,
      Address: details.address,
      City: details.city,
      Notes: details.notes,
      Payment: "Cash on delivery",
      Items: lines.map((line) => ({ Slug: line.slug, Qty: line.qty })),
    }),
  }).catch(() => null);

  if (!res) return { error: "We could not reach the store. Please try again." };

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: String(data.error ?? "We could not place the order.") };
  }

  revalidatePath("/account/orders");
  return { orderNumber: Number(data?.data?.Number) || undefined };
}
