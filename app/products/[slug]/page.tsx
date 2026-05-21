"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Truck, LockKeyhole, Wallet, PhoneCall, ShoppingBag } from "lucide-react";
import { H4, H5, ItalicBodySm, SubtitleSm, SubtitleMd } from "@/components/ui/typography";
import { FilledButton } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";

const PRODUCTS_URL = "https://cms-api-production-e357.up.railway.app/api/public/v1/projects/prj-mpf7ktu4-1w/categories/cat-mpf7ktu4-1v";

interface Product {
  id:              string;
  slug:            string;
  title:           string;
  price:           number;
  discount:        number;
  cover_img_1:     string;
  img_2:           string;
  img_3:           string;
  img_4:           string;
  gender:          string;
  category:        string;
  brand:           string;
  size:            string;
  sku:             number;
  description:     string;
  key_ingredients: string;
  sales_type:      string;
  collections:     string;
}

interface RawEntry {
  id: string;
  values: {
    slug:            string;
    title:           string;
    price:           number;
    discount:        number;
    cover_img_1:     string;
    img_2:           string;
    img_3:           string;
    img_4:           string;
    gender:          string;
    category:        string;
    brand:           string;
    size:            string;
    sku:             number;
    description:     string;
    key_ingredients: string;
    sales_type:      string;
    collections:     string;
  };
}

const FEATURES: { title: string; description: string; icon: ReactNode }[] = [
  {
    title:       "Free Shipping",
    description: "Enjoy fast and free delivery on all orders, with no hidden fees.",
    icon:        <Truck size={24} strokeWidth={1.5} />,
  },
  {
    title:       "Secure Checkout",
    description: "Your payments are protected with advanced encryption.",
    icon:        <LockKeyhole size={24} strokeWidth={1.5} />,
  },
  {
    title:       "Money-Back Guarantee",
    description: "Not satisfied? Get a full refund within our hassle-free return period.",
    icon:        <Wallet size={24} strokeWidth={1.5} />,
  },
  {
    title:       "24/7 Customer Support",
    description: "Our support team is always available to assist you anytime, anywhere.",
    icon:        <PhoneCall size={24} strokeWidth={1.5} />,
  },
];

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: ReactNode }) {
  return (
    <div className="flex flex-col justify-start items-start gap-[16px] p-0 overflow-clip rounded-none">
      <span className="text-black">{icon}</span>
      <div className="flex flex-col justify-start items-start gap-[8px]">
        <H5 className="!text-black !text-left">{title}</H5>
        <ItalicBodySm className="!text-black !text-left">{description}</ItalicBodySm>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div
        className="w-[40px] h-[40px] rounded-full border-[2px] border-beige animate-spin"
        style={{ borderTopColor: "var(--color-brown)" }}
      />
    </main>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const [products,     setProducts]     = useState<Product[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [activeImage,  setActiveImage]  = useState(0);

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((r) => r.json())
      .then((data) => {
        setProducts(
          (data?.category?.entries ?? []).map((e: RawEntry) => ({
            id:              e.id,
            slug:            e.values.slug            ?? "",
            title:           e.values.title           ?? "",
            price:           e.values.price           ?? 0,
            discount:        e.values.discount        ?? 0,
            cover_img_1:     e.values.cover_img_1     ?? "",
            img_2:           e.values.img_2           ?? "",
            img_3:           e.values.img_3           ?? "",
            img_4:           e.values.img_4           ?? "",
            gender:          e.values.gender          ?? "",
            category:        e.values.category        ?? "",
            brand:           e.values.brand           ?? "",
            size:            e.values.size            ?? "",
            sku:             e.values.sku             ?? 0,
            description:     e.values.description     ?? "",
            key_ingredients: e.values.key_ingredients ?? "",
            sales_type:      e.values.sales_type      ?? "",
            collections:     e.values.collections     ?? "",
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { setActiveImage(0); }, [slug]);

  if (loading) return <LoadingScreen />;

  const product = products.find((p) => p.slug === slug);
  const related = products.filter((p) => p.slug !== slug).slice(0, 3);
  const images  = product
    ? [product.cover_img_1, product.img_2, product.img_3, product.img_4].filter(Boolean)
    : [];

  if (!product) {
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <H4 className="!text-brown">Product not found</H4>
      </main>
    );
  }

  const finalPrice      = product.discount > 0
    ? (product.price * (1 - product.discount / 100)).toFixed(0)
    : null;
  const brandLabel      = product.brand.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryLabel   = product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main>

      {/* ── Cart container ── */}
      <div className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">

        {/* ── Container 1: Product detail ── */}
        <div className="w-full max-w-[1920px] flex flex-col desktop:flex-row justify-start items-start gap-0 p-0 overflow-clip rounded-none bg-caledon">

          {/* Images */}
          <div className="w-full desktop:w-1/2 flex flex-col gap-0 overflow-clip rounded-none">

            {/* Main image */}
            <div className="relative w-full overflow-clip rounded-none
              h-[400px]
              tablet:h-[560px]
              desktop:h-[680px]">
              <Image
                src={images[activeImage] ?? product.cover_img_1}
                alt={product.title}
                fill
                sizes="(max-width: 1199px) 100vw, 50vw"
                quality={100}
                unoptimized
                className="object-cover object-center"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-row gap-[8px] p-[12px] overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative flex-shrink-0 w-[64px] h-[64px] overflow-clip rounded-none cursor-pointer"
                    style={{
                      outline: i === activeImage ? "2px solid var(--color-brown)" : "2px solid transparent",
                      transition: "outline-color 0.2s",
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="64px"
                      quality={100}
                      unoptimized
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Product info */}
          <div className="w-full desktop:w-1/2 flex flex-col justify-start items-start gap-[32px] overflow-clip rounded-none
            px-[16px] py-[32px]
            tablet:px-[24px] tablet:py-[48px]
            desktop:px-[48px] desktop:py-[64px]">

            {/* Meta row */}
            <div className="flex flex-row flex-wrap items-center gap-[8px]">
              <ItalicBodySm className="!text-brown">{brandLabel}</ItalicBodySm>
              <span className="text-beige font-inter text-[14px]">·</span>
              <ItalicBodySm className="!text-brown">{categoryLabel}</ItalicBodySm>
              {product.gender && (
                <>
                  <span className="text-beige font-inter text-[14px]">·</span>
                  <ItalicBodySm className="!text-brown">{product.gender}</ItalicBodySm>
                </>
              )}
              {product.sales_type && (
                <span
                  className="ml-[4px] px-[8px] py-[2px] font-clash font-medium text-[11px] uppercase tracking-normal text-brown"
                  style={{ border: "1px solid var(--color-beige)" }}
                >
                  {product.sales_type}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-[8px]">
              <H4 className="!text-black !text-left !leading-[1.2]">{product.title}</H4>
              {product.size && (
                <ItalicBodySm className="!text-brown">{product.size}</ItalicBodySm>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-row items-baseline gap-[12px]">
              {finalPrice ? (
                <>
                  <span className="font-clash font-medium text-[28px] leading-[1.2] text-black">${finalPrice}</span>
                  <span className="font-inter font-light text-[18px] leading-[1.4] line-through" style={{ color: "var(--color-beige)" }}>${product.price}</span>
                  <span className="font-clash font-medium text-[12px] uppercase tracking-normal" style={{ color: "var(--color-brown)" }}>
                    -{product.discount}%
                  </span>
                </>
              ) : (
                <span className="font-clash font-medium text-[28px] leading-[1.2] text-black">${product.price}</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-[8px]">
                <SubtitleSm className="!text-brown">Description</SubtitleSm>
                <p className="font-inter font-light text-black text-[15px] leading-[1.6]">
                  {product.description}
                </p>
              </div>
            )}

            {/* Key ingredients */}
            {product.key_ingredients && (
              <div className="flex flex-col gap-[8px]">
                <SubtitleSm className="!text-brown">Key Ingredients</SubtitleSm>
                <p className="font-inter font-light text-black text-[15px] leading-[1.6]">
                  {product.key_ingredients}
                </p>
              </div>
            )}

            {/* Add to cart */}
            <FilledButton icon={<ShoppingBag size={16} strokeWidth={1.5} />}>
              Add to Cart
            </FilledButton>

          </div>

        </div>

        {/* ── Container 2: Benefits ── */}
        <div
          className="w-full max-w-[1920px] flex flex-col justify-start items-start gap-[32px] overflow-clip rounded-none bg-white
            pt-[48px] px-[16px] pb-[48px]
            tablet:pt-[48px] tablet:px-[24px] tablet:pb-[48px]
            desktop:pt-[64px] desktop:px-[32px] desktop:pb-[80px]"
          style={{
            borderTop:    "1px dashed var(--color-beige)",
            borderBottom: "1px dashed var(--color-beige)",
          }}
        >

          {/* Title wrapper */}
          <div className="w-full flex flex-col justify-start items-start gap-[16px] p-0 overflow-clip rounded-none">
            <H4 className="w-full !text-black !text-left">Your Benefits, Our Promise</H4>
          </div>

          {/* Features wrapper */}
          <div className="w-full grid overflow-clip rounded-none
            grid-cols-1 gap-x-0 gap-y-[32px]
            tablet:grid-cols-2 tablet:gap-x-[32px] tablet:gap-y-[32px]
            desktop:grid-cols-4 desktop:gap-x-[32px] desktop:gap-y-[32px]">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} title={f.title} description={f.description} icon={f.icon} />
            ))}
          </div>

        </div>

        {/* ── Container 3: Related products ── */}
        <div className="w-full max-w-[1920px] flex flex-col justify-start items-start gap-[24px] overflow-clip rounded-none bg-white
          pt-[48px] px-[16px] pb-[48px]
          tablet:pt-[48px] tablet:px-[24px] tablet:pb-[48px]
          desktop:pt-[64px] desktop:px-[32px] desktop:pb-[80px]">

          {/* Title */}
          <div className="w-full flex flex-col justify-start items-start gap-[8px] overflow-visible rounded-none p-0">
            <H4 className="w-full !text-black !text-left [text-wrap:balance]">Related Products</H4>
          </div>

          {/* Products grid */}
          <div
            className="w-full grid overflow-visible rounded-none p-0
              grid-cols-1
              tablet:grid-cols-3"
            style={{ columnGap: "16px", rowGap: "48px" }}
          >
            {related.map((p) => (
              <ProductCard
                key={p.id}
                title={p.title}
                price={p.price}
                discount={p.discount}
                imageSrc={p.cover_img_1}
                href={`/products/${p.slug}`}
                className="!w-full"
              />
            ))}
          </div>

        </div>

      </div>

    </main>
  );
}
