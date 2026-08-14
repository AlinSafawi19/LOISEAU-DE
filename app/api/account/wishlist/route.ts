import { accountPost, readToken } from "@/lib/account";

/** Wishlist counterpart of the cart handlers — see the notes there. */

const BASE = process.env.NEXT_PUBLIC_CMS_BACKEND_URL;
const KEY = process.env.NEXT_PUBLIC_CMS_API_KEY;

export async function GET() {
  const token = await readToken();
  if (!token) return Response.json({ signedIn: false, slugs: [] });

  try {
    const res = await fetch(`${BASE}/glaze/account/wishlist`, {
      headers: { Authorization: `Bearer ${KEY}`, "X-Customer-Token": token },
      cache: "no-store",
    });
    if (!res.ok) return Response.json({ signedIn: false, slugs: [] });
    const data = await res.json();
    return Response.json({ signedIn: true, slugs: data.slugs ?? [] });
  } catch {
    return Response.json({ signedIn: false, slugs: [] });
  }
}

export async function PUT(request: Request) {
  const token = await readToken();
  if (!token) return Response.json({ signedIn: false, slugs: [] });

  const body = await request.json().catch(() => ({ slugs: [] }));
  const { status, data } = await accountPost("wishlist", { slugs: body.slugs ?? [] }, token);

  if (status !== 200) return Response.json({ signedIn: false, slugs: [] });
  return Response.json({ signedIn: true, slugs: data.slugs ?? [] });
}
