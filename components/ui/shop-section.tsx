"use client";

import { useState, useEffect } from "react";
import { Filters } from "./filters";
import { ProductCard } from "./product-card";
import { H4, SubtitleMd } from "./typography";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  discount: number;
  imageSrc: string;
}

const DESKTOP_PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE  = 8;

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full py-[48px]">
      <div
        className="w-[40px] h-[40px] rounded-full border-[2px] border-beige animate-spin"
        style={{ borderTopColor: "var(--color-brown)" }}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="w-full min-w-full max-h-full flex flex-col justify-center items-center gap-[10px] p-[10px] overflow-visible rounded-[20px] bg-dusty min-h-[276px]"
      style={{ border: "1px dashed var(--color-beige)" }}
    >
      <SubtitleMd className="!text-brown !text-center">
        No items found for your selection
      </SubtitleMd>
    </div>
  );
}

export function ShopSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [page,     setPage]     = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 810);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // TODO: fetch from API when available
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/loiseau/products")
  //     .then((r) => r.json())
  //     .then((data) => setProducts(data))
  //     .finally(() => setLoading(false));
  // }, []);

  const pageSize  = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
  const paginated = products.slice(0, page * pageSize);
  const hasMore   = products.length > page * pageSize;

  return (
    <section className="relative w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-visible rounded-none bg-white z-[10]">

      {/* Container */}
      <div className="w-full max-w-[1920px] flex flex-col justify-start items-center
        gap-[24px] pt-[32px] px-[16px] pb-[48px]
        tablet:gap-[40px] tablet:pt-[48px] tablet:px-[24px] tablet:pb-[64px]
        desktop:pt-[64px] desktop:px-[32px] desktop:pb-[80px]">

        {/* Title wrapper */}
        <div className="w-full flex flex-row justify-start items-center gap-[16px] p-0 overflow-visible rounded-none">
          <H4 className="w-auto h-auto !text-beige !text-left">Products</H4>
        </div>

        {/* Shop */}
        <div className="w-full flex flex-col md:flex-row justify-start items-start overflow-visible rounded-none
          gap-[32px]
          tablet:gap-[24px]
          desktop:gap-[32px]">

          {/* Filters sidebar */}
          <div className="sticky top-[58px] md:top-[80px] self-start w-full tablet:w-auto">
            <Filters />
          </div>

          {/* Products area */}
          <div className="flex-1 flex flex-col gap-[40px] w-full">

            {loading ? (
              <LoadingSpinner />
            ) : products.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid
                grid-cols-1 gap-x-[16px] gap-y-[48px]
                tablet:grid-cols-2 tablet:gap-y-[40px]
                desktop:grid-cols-3 desktop:gap-y-[48px]">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    discount={product.discount}
                    imageSrc={product.imageSrc}
                    href={`/products/${product.slug}`}
                    className="!w-full"
                  />
                ))}
              </div>
            )}

            {/* Load more */}
            {hasMore && !loading && (
              <div className="w-full flex justify-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="font-clash font-medium clash-features uppercase text-brown text-[14px] leading-[1.4] border border-dashed border-beige px-[32px] py-[12px] rounded-none bg-transparent cursor-pointer"
                  style={{ transition: "border-color 0.3s cubic-bezier(0.44,0,0.56,1)" }}
                >
                  Load more
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
