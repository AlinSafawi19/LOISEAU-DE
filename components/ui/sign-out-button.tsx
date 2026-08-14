"use client";

import { useTransition } from "react";

import { OutlineButton } from "./button";
import { signOut } from "@/lib/actions/account";

/**
 * Signing out has to clear the browser copies too. The cart and wishlist are
 * mirrored into localStorage for speed, and leaving them behind would show the
 * next person on a shared device what the last one had saved.
 *
 * The server action revokes the session; this only tidies up the local mirror,
 * which a server action cannot reach.
 */
export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <OutlineButton
      type="button"
      icon={<></>}
      disabled={pending}
      onClick={() => {
        try {
          window.localStorage.removeItem("glaze:cart");
          window.localStorage.removeItem("glaze:wishlist");
        } catch {
          /* storage blocked — the session is still revoked below */
        }
        window.dispatchEvent(new Event("glaze:cart-change"));
        window.dispatchEvent(new Event("glaze:wishlist-change"));

        startTransition(() => {
          void signOut();
        });
      }}
    >
      {pending ? "Signing out…" : "Sign out"}
    </OutlineButton>
  );
}
