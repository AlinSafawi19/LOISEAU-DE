"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { H4, SubtitleMd, ItalicBodySm } from "./typography";
import { OutlineButton } from "./button";
import { ProductCard } from "./product-card";

const PRODUCTS_URL    = `${process.env.NEXT_PUBLIC_CMS_BACKEND_URL}/loiseau-d/products?limit=100`;
const COLLECTIONS_URL = `${process.env.NEXT_PUBLIC_CMS_BACKEND_URL}/loiseau-d/collections?limit=100`;
const API_HEADERS     = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_API_KEY}` };

// The entry in the CMS `collections` list that drives this section.
const OFFERS_SLUG = "offers";

/**
 * A relation field arrives either expanded into an object or as a bare slug
 * string, depending on the entry — normalise both down to a slug.
 */
type Relation = string | { Slug?: string } | null | undefined;

function relationSlug(value: Relation): string {
  if (!value) return "";
  return typeof value === "string" ? value : value.Slug ?? "";
}

interface RawProduct {
  id:            string;
  Slug:          string;
  Title:         string;
  "Cover img 1": string;
  Price:         string;
  Discount:      string;
  Collections:   Relation;
}

interface RawCollection {
  Slug:       string;
  Title:      string;
  tagline:    string;
  ButtonText: string;
  ButtonPath: string;
}

interface OfferProduct {
  id:       string;
  slug:     string;
  title:    string;
  price:    number;
  discount: number;
  imageSrc: string;
}

function useOffers() {
  const [products,   setProducts]   = useState<OfferProduct[]>([]);
  const [collection, setCollection] = useState<RawCollection | null>(null);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(PRODUCTS_URL,    { headers: API_HEADERS }).then((r) => r.json()),
      fetch(COLLECTIONS_URL, { headers: API_HEADERS }).then((r) => r.json()),
    ])
      .then(([productsData, collectionsData]) => {
        const entries: RawProduct[]    = productsData?.data    ?? [];
        const cols:    RawCollection[] = collectionsData?.data ?? [];

        setCollection(cols.find((c) => c.Slug === OFFERS_SLUG) ?? null);
        setProducts(
          entries
            .filter((e) => relationSlug(e.Collections) === OFFERS_SLUG)
            .map((e) => ({
              id:       e.id,
              slug:     e.Slug,
              title:    e.Title,
              price:    parseFloat(e.Price)    || 0,
              discount: parseFloat(e.Discount) || 0,
              imageSrc: e["Cover img 1"],
            }))
        );
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return { products, collection, loading };
}

export function OffersSection() {
  const { products, collection, loading } = useOffers();

  // Land on the shop with the Offers collection already ticked in the filters.
  const buttonPath = collection?.ButtonPath || "/shop-all";
  const shopAllHref = `${buttonPath}${buttonPath.includes("?") ? "&" : "?"}collection=${OFFERS_SLUG}`;

  return (
    <section className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip rounded-none bg-dusty">

      <div className="w-full max-w-[1920px] flex flex-col justify-start items-start rounded-none
        gap-[24px] py-[48px] px-[16px]
        tablet:gap-[32px] tablet:py-[64px] tablet:px-[24px]
        desktop:gap-[32px] desktop:py-[80px] desktop:px-[32px]">

        {/* Title + CTA */}
        <div className="w-full flex flex-row justify-between items-end gap-[16px] p-0 rounded-none">

          <div className="flex flex-col justify-start items-start gap-[4px] min-w-0">
            <H4 className="w-full !text-brown !text-left [text-wrap:balance]">
              {collection?.Title || "Offers"}
            </H4>
            <ItalicBodySm className="w-full !text-brown !text-left [text-wrap:balance]">
              {collection?.tagline || "bundles and reduced sets"}
            </ItalicBodySm>
          </div>

          {!loading && products.length > 0 && (
            <Link href={shopAllHref} className="shrink-0">
              <OutlineButton>{collection?.ButtonText || "See all offers"}</OutlineButton>
            </Link>
          )}

        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full py-[24px]">
            <div
              className="w-[40px] h-[40px] rounded-full border-[2px] border-beige animate-spin"
              style={{ borderTopColor: "var(--color-brown)" }}
            />
          </div>
        ) : products.length === 0 ? (
          /* No product is tagged into the Offers collection yet. */
          <div className="w-full flex flex-col justify-center items-center gap-[16px] py-[32px] border border-dashed border-beige rounded-none">
            <SubtitleMd className="!text-brown !text-center">No offers running right now</SubtitleMd>
            <ItalicBodySm className="!text-brown !text-center max-w-[420px] [text-wrap:balance]">
              New sets land regularly — in the meantime, everything is on the shop page.
            </ItalicBodySm>
            <Link href="/shop-all">
              <OutlineButton>Shop all</OutlineButton>
            </Link>
          </div>
        ) : (
          <div className="w-full grid
              grid-cols-1 gap-x-[16px] gap-y-[48px]
              tablet:grid-cols-2 tablet:gap-x-[24px] tablet:gap-y-[40px]
              desktop:grid-cols-4 desktop:gap-x-[32px] desktop:gap-y-[48px]">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  title={p.title}
                  price={p.price}
                  discount={p.discount}
                  imageSrc={p.imageSrc}
                  href={`/products/${p.slug}`}
                  className="!w-full"
                />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
