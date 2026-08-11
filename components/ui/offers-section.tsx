"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { H4, SubtitleMd, SubtitleSm, ItalicBodySm, BodySm } from "./typography";
import { OutlineButton } from "./button";

const OFFERS_URL  = `${process.env.NEXT_PUBLIC_CMS_BACKEND_URL}/loiseau-d/offers?limit=100`;
const API_HEADERS = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_API_KEY}` };

interface RawOffer {
  id:              string;
  Slug:            string;
  Title:           string;
  Description:     string;
  Image:           string;
  Type:            string;
  Price:           string;
  "Compare price": string;
  Badge:           string;
  Link:            string;
  Active:          string;
}

interface Offer {
  id:           string;
  title:        string;
  description:  string;
  image:        string;
  type:         string;
  price:        number;
  comparePrice: number;
  badge:        string;
  href:         string;
}

function useOffers() {
  const [offers,  setOffers]  = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(OFFERS_URL, { headers: API_HEADERS })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const entries: RawOffer[] = data?.data ?? [];
        setOffers(
          entries
            // An entry only goes live once Active is set to Yes in the CMS.
            .filter((e) => (e.Active ?? "Yes").toLowerCase() !== "no")
            .map((e) => ({
              id:           e.id,
              title:        e.Title,
              description:  e.Description ?? "",
              image:        e.Image,
              type:         e.Type ?? "",
              price:        parseFloat(e.Price)             || 0,
              comparePrice: parseFloat(e["Compare price"])  || 0,
              badge:        e.Badge ?? "",
              href:         e.Link || "/shop-all",
            }))
        );
      })
      // The collection may not exist yet; the section simply stays hidden.
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);

  return { offers, loading };
}

export function OffersSection() {
  const { offers, loading } = useOffers();

  // Nothing published, or no collection yet — render no empty shell.
  if (!loading && offers.length === 0) return null;

  return (
    <section className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip rounded-none bg-dusty">

      <div className="w-full max-w-[1920px] flex flex-col justify-start items-start rounded-none
        gap-[24px] py-[48px] px-[16px]
        tablet:gap-[32px] tablet:py-[64px] tablet:px-[24px]
        desktop:gap-[32px] desktop:py-[80px] desktop:px-[32px]">

        {/* Title */}
        <div className="w-full flex flex-col justify-start items-start gap-[4px] p-0 rounded-none">
          <H4 className="w-full !text-brown !text-left [text-wrap:balance]">Bundles &amp; Offers</H4>
          <ItalicBodySm className="w-full !text-brown !text-left [text-wrap:balance]">
            sets worth more together
          </ItalicBodySm>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full py-[24px]">
            <div
              className="w-[40px] h-[40px] rounded-full border-[2px] border-beige animate-spin"
              style={{ borderTopColor: "var(--color-brown)" }}
            />
          </div>
        ) : (
          <div className="w-full flex flex-row flex-wrap justify-start items-stretch gap-[16px] tablet:gap-[24px]">
            {offers.map((offer) => (
              <Link
                key={offer.id}
                href={offer.href}
                className="group w-full tablet:w-[calc(50%-12px)] desktop:w-[calc(33.333%-16px)] flex flex-col justify-start items-start gap-0 rounded-none overflow-clip bg-white"
              >

                {/* Image */}
                <div className="relative w-full h-[220px] tablet:h-[260px] overflow-clip rounded-none">
                  {offer.image && (
                    <Image
                      src={offer.image}
                      alt=""
                      fill
                      sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 33vw"
                      quality={100}
                      unoptimized
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}

                  {offer.badge && (
                    <div className="absolute top-[16px] left-[16px] bg-accent px-[12px] py-[4px] rounded-none z-[1]">
                      <SubtitleSm className="!text-black !text-left">{offer.badge}</SubtitleSm>
                    </div>
                  )}

                  {offer.type && (
                    <div className="absolute top-[16px] right-[16px] bg-white px-[12px] py-[4px] rounded-none z-[1]">
                      <SubtitleSm className="!text-brown !text-right">{offer.type}</SubtitleSm>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-full flex flex-col justify-start items-start gap-[12px] p-[24px] rounded-none">

                  <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                    <SubtitleMd className="w-full !text-black !text-left">{offer.title}</SubtitleMd>
                    {offer.description && (
                      <BodySm className="w-full !text-brown !text-left [text-wrap:balance]">
                        {offer.description}
                      </BodySm>
                    )}
                  </div>

                  <div className="w-full flex flex-row justify-between items-center gap-[10px] pt-[12px] border-t border-dashed border-beige">

                    <div className="flex flex-row items-baseline gap-[8px]">
                      <SubtitleMd className="!text-black !text-left">${offer.price}</SubtitleMd>
                      {offer.comparePrice > offer.price && (
                        <BodySm className="!text-beige !text-left line-through">${offer.comparePrice}</BodySm>
                      )}
                    </div>

                    <OutlineButton>Shop</OutlineButton>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
