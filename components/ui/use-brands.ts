"use client";

import { useEffect, useState } from "react";

const BRANDS_URL  = `${process.env.NEXT_PUBLIC_CMS_BACKEND_URL}/loiseau-d/brands`;
const API_HEADERS = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_API_KEY}` };

export interface Brand {
  id:   string;
  name: string;
  slug: string;
}

interface RawBrand {
  id:    string;
  Title: string;
  Slug:  string;
}

/**
 * The header mounts once per session, but the drawer and the desktop nav both
 * want the list — share a single in-flight request between every caller.
 */
let cache: Promise<Brand[]> | null = null;

function load(): Promise<Brand[]> {
  if (!cache) {
    cache = fetch(BRANDS_URL, { headers: API_HEADERS })
      .then((r) => r.json())
      .then((data) =>
        (data?.data ?? []).map((e: RawBrand) => ({
          id:   e.id,
          name: e.Title,
          slug: e.Slug,
        }))
      )
      .catch(() => {
        cache = null; // let the next mount try again
        return [];
      });
  }
  return cache;
}

export function useBrands(): Brand[] {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    let alive = true;
    load().then((list) => { if (alive) setBrands(list); });
    return () => { alive = false; };
  }, []);

  return brands;
}
