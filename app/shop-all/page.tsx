"use client";

import { Suspense } from "react";
import { ShopSection } from "@/components/ui/shop-section";

export default function ShopAll() {
  return (
    <main>
      {/* The shop is the page — no hero in front of it, so the grid is the first
          thing on screen. ShopSection reads `?collection=` and `?brand=`, hence
          the Suspense boundary. */}
      <Suspense fallback={null}>
        <ShopSection />
      </Suspense>
    </main>
  );
}
