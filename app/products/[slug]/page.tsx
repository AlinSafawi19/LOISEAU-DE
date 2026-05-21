"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Truck, LockKeyhole, Wallet, PhoneCall, ShoppingBag } from "lucide-react";
import { H1, H4, H5, BodySm, ItalicBodySm, SubtitleSm } from "@/components/ui/typography";
import Link from "next/link";
import { OutlineButton, FilledButton } from "@/components/ui/button";
import { FaqCardProduct } from "@/components/ui/faq-card";
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
  const related = products.filter((p) => p.slug !== slug).slice(0, 4);
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

          {/* Images wrapper */}
          <div className="w-full desktop:w-[55%] flex flex-col justify-start items-start gap-[1px] p-0 overflow-clip rounded-none bg-caledon">

            {/* img 1 — full height banner */}
            <div className="relative w-full h-[400px] tablet:h-[50vh] desktop:h-screen overflow-visible rounded-none">
              <Image
                src={product.cover_img_1}
                alt={product.title}
                fill
                sizes="(max-width: 1199px) 100vw, 55vw"
                quality={100}
                unoptimized
                className="object-cover object-center"
              />
            </div>

            {/* img 2 + img 3 — mid banner */}
            {(product.img_2 || product.img_3) && (
              <div className="w-full h-[640px] tablet:h-[50vh] flex flex-col tablet:flex-row justify-start items-center gap-[1px] overflow-clip rounded-none">
                {product.img_2 && (
                  <div className="relative flex-1 w-full h-full overflow-visible rounded-none">
                    <Image
                      src={product.img_2}
                      alt=""
                      fill
                      sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 27vw"
                      quality={100}
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>
                )}
                {product.img_3 && (
                  <div className="relative flex-1 w-full h-full overflow-visible rounded-none">
                    <Image
                      src={product.img_3}
                      alt=""
                      fill
                      sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 27vw"
                      quality={100}
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>
                )}
              </div>
            )}

            {/* img 4 — full height banner */}
            {product.img_4 && (
              <div className="relative w-full h-[400px] tablet:h-[50vh] desktop:h-screen overflow-visible rounded-none">
                <Image
                  src={product.img_4}
                  alt=""
                  fill
                  sizes="(max-width: 1199px) 100vw, 55vw"
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
            )}

          </div>

          {/* Details wrapper */}
          <div className="flex-1 sticky top-0 self-start flex flex-col justify-start items-start gap-[48px] overflow-visible rounded-none bg-caledon z-[1]
            pt-[80px] px-[32px] pb-[48px]">

            {/* Top wrapper */}
            <div className="w-[476px] max-w-full flex flex-col justify-start items-start gap-[24px] p-0 overflow-visible rounded-none">

              {/* Title box */}
              <div className="w-full flex flex-col justify-start items-start gap-[16px] p-0 overflow-clip rounded-none">

                {/* Sales type */}
                {product.sales_type && (
                  <div className="flex flex-row justify-end items-center gap-[8px] py-[8px] px-[16px] bg-pistachio overflow-clip rounded-none">
                    <SubtitleSm className="!text-black !text-left w-auto">{product.sales_type}</SubtitleSm>
                  </div>
                )}

                {/* Title */}
                <H1 className="w-full max-w-[480px] h-auto !text-black !text-left">{product.title}</H1>

                {/* Price × discount wrapper */}
                <div className="w-full flex flex-row justify-start items-center gap-[12px] p-0 overflow-clip rounded-none">

                  {/* Price */}
                  <div className="flex flex-row justify-start items-center gap-[8px]">
                    <H4 className="!text-brown !text-left w-auto">$</H4>
                    <H4 className="!text-brown !text-left w-auto">{finalPrice ?? product.price}</H4>
                  </div>

                  {/* Discount */}
                  {product.discount !== 0 && (
                    <div className="flex flex-row items-center gap-[6px] py-[4px] px-[12px] bg-golden overflow-clip rounded-none">
                      <H4 className="!text-brown !text-left w-auto">%</H4>
                      <H4 className="!text-brown !text-left w-auto">{product.discount}</H4>
                    </div>
                  )}

                </div>

              </div>

              {/* SKU box */}
              <div className="w-full flex flex-row justify-start items-start gap-[8px] p-0 overflow-clip rounded-none">
                <BodySm className="w-auto max-w-[600px] !text-brown !text-left">SKU:</BodySm>
                <BodySm className="w-auto h-auto max-w-[600px] !text-brown !text-left">{product.sku}</BodySm>
              </div>

            </div>

            {/* Divider */}
            <div className="w-full h-[1px] overflow-clip rounded-none bg-beige" />

            {/* Key Ingredients × Size */}
            <div className="w-full flex flex-row justify-start items-start gap-[24px] p-0 overflow-clip rounded-none">

              <div className="flex flex-col justify-start items-start gap-[8px] p-0 overflow-clip rounded-none">
                <SubtitleSm className="w-full max-w-[600px] h-auto !text-black !text-left">Key Ingredients</SubtitleSm>
                <BodySm className="w-full max-w-[600px] h-auto !text-black !text-left">{product.key_ingredients}</BodySm>
              </div>

              <div className="flex flex-col justify-start items-start gap-[8px] p-0 overflow-clip rounded-none">
                <SubtitleSm className="w-full max-w-[600px] h-auto !text-black !text-left">Size</SubtitleSm>
                <BodySm className="w-full max-w-[600px] h-auto !text-black !text-left">{product.size}</BodySm>
              </div>

            </div>

            {/* Details */}
            <div className="w-full flex flex-col justify-start items-start gap-[8px] p-0 overflow-clip rounded-none">
              <SubtitleSm className="w-full max-w-[600px] h-auto !text-black !text-left">Details</SubtitleSm>
              <BodySm className="w-full max-w-[600px] h-auto !text-black !text-left">{product.description}</BodySm>
            </div>

            {/* Buy now */}
            <a
              href="https://contra.com/payment-link/whQsyhNo-aionic-modern-ai-saa-s-framer-template"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <FilledButton className="w-full" icon={<ShoppingBag size={16} strokeWidth={1.5} />}>
                Buy now
              </FilledButton>
            </a>

            {/* Bottom wrapper */}
            <div className="w-full flex flex-col justify-start items-start gap-[8px] p-0 overflow-clip rounded-none">
              <div className="w-full h-[1px] overflow-clip rounded-none bg-beige" />
              <FaqCardProduct
                question="Delivery & Shipping"
                answer="Orders are processed within 1–2 business days."
                className="w-full"
              />
              <div className="w-full h-[1px] overflow-clip rounded-none bg-beige" />
              <FaqCardProduct
                question="Returns & Refunds"
                answer="Items must be unused and in their original packaging to be eligible for a refund or exchange."
                className="w-full"
              />
              <div className="w-full h-[1px] overflow-clip rounded-none bg-beige" />
              <FaqCardProduct
                question="Product Details / Safety"
                answer="All products are carefully crafted using high-quality, safe ingredients and materials."
                className="w-full"
              />
              <div className="w-full h-[1px] overflow-clip rounded-none bg-beige" />
            </div>

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
            <H4 className="w-full !text-black !text-left">Your Benefits, <br/>Our Promise</H4>
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
          <div className="w-full flex flex-row justify-between items-center gap-[16px] overflow-visible rounded-none p-0">
            <H4 className="!text-black !text-left [text-wrap:balance]">Related <br/>Products</H4>
            <Link href="/shop-all" tabIndex={-1}>
              <OutlineButton icon={<></>}>Explore all</OutlineButton>
            </Link>
          </div>

          {/* Products grid */}
          <div
            className="w-full grid overflow-visible rounded-none p-0
              grid-cols-1
              tablet:grid-cols-2"
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
