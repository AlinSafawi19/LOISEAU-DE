import { accountPost, readToken } from "@/lib/account";

/**
 * The cart hooks run in the browser, where the session cookie is httpOnly and
 * unreadable. These handlers sit on the storefront's own origin, read the
 * cookie server-side and forward to the backend.
 *
 * A signed-out visitor gets `{ signedIn: false }` rather than a 401 — having no
 * account is a normal state here, not an error, and the hook falls back to
 * localStorage.
 */

const BASE = process.env.NEXT_PUBLIC_DASHBOARD_BACKEND_URL;
const KEY = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;

export async function GET() {
  const token = await readToken();
  if (!token) return Response.json({ signedIn: false, items: [] });

  try {
    const res = await fetch(`${BASE}/glaze/account/cart`, {
      headers: { Authorization: `Bearer ${KEY}`, "X-Customer-Token": token },
      cache: "no-store",
    });
    if (!res.ok) return Response.json({ signedIn: false, items: [] });
    const data = await res.json();
    return Response.json({ signedIn: true, items: data.items ?? [] });
  } catch {
    return Response.json({ signedIn: false, items: [] });
  }
}

export async function PUT(request: Request) {
  const token = await readToken();
  if (!token) return Response.json({ signedIn: false, items: [] });

  const body = await request.json().catch(() => ({ items: [] }));
  const { status, data } = await accountPost("cart", { items: body.items ?? [] }, token);

  if (status !== 200) return Response.json({ signedIn: false, items: [] });
  return Response.json({ signedIn: true, items: data.items ?? [] });
}
