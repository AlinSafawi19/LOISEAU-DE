"use client";

import { useState, useEffect, useMemo } from "react";
import { Filters, type FilterItem } from "./filters";
import { ProductCard } from "./product-card";
import { H4, SubtitleMd } from "./typography";

const CATEGORIES_URL = "https://cms-api-production-e357.up.railway.app/api/public/v1/projects/prj-mpf7ktu4-1w/categories/cat-mpf7ktu2-w";
const BRANDS_URL     = "https://cms-api-production-e357.up.railway.app/api/public/v1/projects/prj-mpf7ktu4-1w/categories/cat-mpf7ktu2-q";
const PRODUCTS_URL   = "https://cms-api-production-e357.up.railway.app/api/public/v1/projects/prj-mpf7ktu4-1w/categories/cat-mpf7ktu4-1v";

interface RawProduct {
  id:    string;
  values: {
    slug:        string;
    title:       string;
    cover_img_1: string;
    price:       number;
    discount:    number;
    gender:      string;
    category:    string;
    brand:       string;
  };
}

interface Product {
  id:       string;
  slug:     string;
  title:    string;
  price:    number;
  discount: number;
  imageSrc: string;
  gender:   string;
  category: string;
  brand:    string;
}

const DESKTOP_PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE  = 8;

async function fetchFilterItems(url: string): Promise<FilterItem[]> {
  const res  = await fetch(url);
  const data = await res.json();
  return (data?.category?.entries ?? []).map((e: { id: string; values: { slug: string; title: string } }) => ({
    id:   e.id,
    name: e.values.title,
    slug: e.values.slug,
  }));
}

async function fetchProducts(url: string): Promise<Product[]> {
  const res  = await fetch(url);
  const data = await res.json();
  return (data?.category?.entries ?? []).map((e: RawProduct) => ({
    id:       e.id,
    slug:     e.values.slug,
    title:    e.values.title,
    price:    e.values.price,
    discount: e.values.discount,
    imageSrc: e.values.cover_img_1,
    gender:   e.values.gender,
    category: e.values.category,
    brand:    e.values.brand,
  }));
}

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
  const [categories,          setCategories]          = useState<FilterItem[]>([]);
  const [brands,              setBrands]              = useState<FilterItem[]>([]);
  const [allProducts,         setAllProducts]         = useState<Product[]>([]);
  const [loading,             setLoading]             = useState(true);
  const [page,                setPage]                = useState(1);
  const [isMobile,            setIsMobile]            = useState(false);

  // Filter state
  const [searchValue,         setSearchValue]         = useState("");
  const [selectedGender,      setSelectedGender]      = useState("ALL");
  const [selectedCategories,  setSelectedCategories]  = useState<Set<string>>(new Set());
  const [selectedBrands,      setSelectedBrands]      = useState<Set<string>>(new Set());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 810);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchFilterItems(CATEGORIES_URL),
      fetchFilterItems(BRANDS_URL),
      fetchProducts(PRODUCTS_URL),
    ]).then(([cats, brnds, prods]) => {
      setCategories(cats);
      setBrands(brnds);
      setAllProducts(prods);
    }).finally(() => setLoading(false));
  }, []);

  // Build lookup maps: slug → id
  const categorySlugToId = useMemo(() => {
    const m: Record<string, string> = {};
    categories.forEach((c) => { m[c.slug] = c.id; });
    return m;
  }, [categories]);

  const brandSlugToId = useMemo(() => {
    const m: Record<string, string> = {};
    brands.forEach((b) => { m[b.slug] = b.id; });
    return m;
  }, [brands]);

  const filtered = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (selectedGender !== "ALL" && p.gender !== selectedGender) return false;
      if (selectedCategories.size > 0) {
        const catId = categorySlugToId[p.category];
        if (!catId || !selectedCategories.has(catId)) return false;
      }
      if (selectedBrands.size > 0) {
        const brandId = brandSlugToId[p.brand];
        if (!brandId || !selectedBrands.has(brandId)) return false;
      }
      return true;
    });
  }, [allProducts, searchValue, selectedGender, selectedCategories, selectedBrands, categorySlugToId, brandSlugToId]);

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1); }, [searchValue, selectedGender, selectedCategories, selectedBrands]);

  const pageSize  = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
  const paginated = filtered.slice(0, page * pageSize);
  const hasMore   = filtered.length > page * pageSize;

  function handleCategoryToggle(id: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleBrandToggle(id: string) {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleClear() {
    setSearchValue("");
    setSelectedGender("ALL");
    setSelectedCategories(new Set());
    setSelectedBrands(new Set());
  }

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
            <Filters
              categories={categories}
              brands={brands}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              selectedBrands={selectedBrands}
              onBrandToggle={handleBrandToggle}
              onClear={handleClear}
            />
          </div>

          {/* Products area */}
          <div className="flex-1 flex flex-col gap-[40px] w-full">

            {loading ? (
              <LoadingSpinner />
            ) : filtered.length === 0 ? (
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
