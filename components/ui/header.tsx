"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { ButtonSm, ButtonLg, BodySm } from "./typography";
import { useWishlist } from "./use-wishlist";
import { useCart } from "./use-cart";
import { useScrollLock } from "./use-scroll-lock";

const EASE   = [0.44, 0, 0.56, 1] as const;
const SPRING = { type: "spring" as const, duration: 0.4, bounce: 0.2 };
// Long, low-bounce ease so the panel glides rather than snaps.
const PANEL  = { duration: 0.45, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] };

const NAV = [
  { title: "Home",     href: "/"         },
  { title: "Shop All", href: "/shop-all" },
  { title: "About",    href: "/about"    },
  { title: "Contact",  href: "/contact"  },
];

/**
 * Nav link built on the same sweep-fill interaction as OutlineButton: a solid
 * block slides in behind the label and the type flips to accent. The current
 * page holds that state permanently.
 */
function NavLink({ title, href, active }: { title: string; href: string; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const on = active || hovered;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-row items-center justify-center px-[12px] py-[6px] rounded-none overflow-clip"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-plum rounded-none"
        animate={{ opacity: on ? 1 : 0 }}
        transition={SPRING}
      />
      <ButtonSm
        className="relative z-10 text-left"
        style={{
          color: on ? "var(--color-lavender)" : "var(--color-brown)",
          transition: `color 0.4s cubic-bezier(0.44, 0, 0.56, 1)`,
        }}
      >
        {title}
      </ButtonSm>
    </Link>
  );
}

function WishlistLink({ className = "" }: { className?: string }) {
  const { count, ready } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const filled = hovered;

  return (
    <Link
      href="/wishlist"
      aria-label={ready && count > 0 ? `Wishlist, ${count} saved` : "Wishlist"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center w-[36px] h-[36px] tablet:w-[40px] tablet:h-[40px] desktop:w-[44px] desktop:h-[44px] rounded-none ${className}`}
    >
      {/* Two stacked hearts crossfade — the SVG `fill` attribute cannot be
          CSS-transitioned, so opacity does the work instead. */}
      <span className="relative flex items-center justify-center w-[16px] h-[16px] tablet:w-[19px] tablet:h-[19px] desktop:w-[23px] desktop:h-[23px]">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: filled ? 0 : 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Heart strokeWidth={1.5} className="text-brown w-[16px] h-[16px] tablet:w-[19px] tablet:h-[19px] desktop:w-[23px] desktop:h-[23px]" fill="none" />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: filled ? 1 : 0, scale: filled ? 1 : 0.8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Heart strokeWidth={1.5} className="text-plum w-[16px] h-[16px] tablet:w-[19px] tablet:h-[19px] desktop:w-[23px] desktop:h-[23px]" fill="var(--color-plum)" />
        </motion.span>
      </span>
      {ready && count > 0 && (
        <span className="absolute top-[4px] right-[2px] min-w-[16px] h-[16px] px-[3px] flex items-center justify-center bg-plum rounded-none">
          <span className="font-clash font-medium text-[10px] leading-none text-white">{count}</span>
        </span>
      )}
    </Link>
  );
}

function CartLink({ className = "" }: { className?: string }) {
  const { count, ready } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/cart"
      aria-label={ready && count > 0 ? `Cart, ${count} items` : "Cart"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center w-[36px] h-[36px] tablet:w-[40px] tablet:h-[40px] desktop:w-[44px] desktop:h-[44px] rounded-none ${className}`}
    >
      <motion.span
        className="flex items-center justify-center"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <ShoppingBag
          strokeWidth={1.5}
          fill="none"
          className={`${hovered ? "text-plum" : "text-brown"} w-[16px] h-[16px] tablet:w-[19px] tablet:h-[19px] desktop:w-[23px] desktop:h-[23px]`}
          style={{ transition: "color 0.3s cubic-bezier(0.44,0,0.56,1)" }}
        />
      </motion.span>
      {ready && count > 0 && (
        <span className="absolute top-[4px] right-[2px] min-w-[16px] h-[16px] px-[3px] flex items-center justify-center bg-plum rounded-none">
          <span className="font-clash font-medium text-[10px] leading-none text-white">{count}</span>
        </span>
      )}
    </Link>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block w-[24px] h-[11px]" aria-hidden>
      <motion.span
        className="absolute left-0 h-px w-full bg-brown rounded-none"
        animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <motion.span
        className="absolute left-0 h-px w-full bg-brown rounded-none"
        animate={open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer whenever navigation lands on a new route.
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(open);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Contact opens straight into content rather than a hero image, so the header
  // needs its own edge from the start; elsewhere the rule appears on scroll.
  const alwaysBordered = pathname.startsWith("/contact");

  return (
    <>
      <header
        className={`sticky top-0 z-[100] w-full rounded-none border-b border-dashed transition-colors duration-300 ${
          scrolled || alwaysBordered
            ? "bg-lavender/95 backdrop-blur-md border-beige"
            : "bg-lavender/75 backdrop-blur-sm border-transparent"
        }`}
      >
        <div className="relative w-full max-w-[1920px] mx-auto flex flex-row justify-between items-center rounded-none
          h-[60px] px-[16px]
          tablet:h-[68px] tablet:px-[24px]
          desktop:h-[72px] desktop:px-[32px]">

          {/* Wordmark */}
          <Link href="/" className="flex items-center shrink-0" aria-label="GLAZE — home">
            <ButtonLg className="!text-black !text-left !text-[20px] desktop:!text-[24px]">
              GLAZE
            </ButtonLg>
          </Link>

          {/* Centred nav — absolute so the wordmark and actions never shift it off-centre */}
          <nav className="hidden tablet:flex absolute left-1/2 -translate-x-1/2 flex-row items-center gap-[8px] desktop:gap-[16px]">
            {NAV.map(({ title, href }) => (
              <NavLink key={href} title={title} href={href} active={isActive(href)} />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex flex-row items-center gap-0">

            <WishlistLink />
            <CartLink className="-mr-[6px] tablet:mr-0" />

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="tablet:hidden flex items-center justify-center w-[40px] h-[40px] -mr-[8px] rounded-none bg-transparent border-none cursor-pointer"
            >
              <Hamburger open={false} />
            </button>

          </div>

        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="tablet:hidden fixed inset-0 z-[200]">

            <motion.div
              className="absolute inset-0 bg-brown/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="absolute top-0 left-0 h-full w-[300px] max-w-[85vw] bg-lavender flex flex-col justify-start items-start gap-[40px] px-[16px] py-[14px] rounded-none overflow-y-auto overscroll-contain border-r border-dashed border-beige"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={PANEL}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >

              <div className="w-full flex flex-row justify-between items-center pb-[14px] border-b border-dashed border-beige">
                <ButtonLg className="!text-black !text-left !text-[20px]">GLAZE</ButtonLg>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-[40px] h-[40px] -mr-[8px] rounded-none bg-transparent border-none cursor-pointer"
                >
                  <Hamburger open />
                </button>
              </div>

              <nav className="w-full flex flex-col justify-start items-start gap-[16px]">
                {NAV.map(({ title, href }) => (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className="w-full flex flex-row justify-between items-center gap-[10px] pb-[12px] rounded-none border-b border-dashed border-beige"
                  >
                    <ButtonSm className={`!text-left !text-[16px] ${isActive(href) ? "!text-plum" : "!text-brown"}`}>
                      {title}
                    </ButtonSm>
                    {isActive(href) && <span className="w-[6px] h-[6px] bg-plum rounded-none shrink-0" aria-hidden />}
                  </Link>
                ))}
              </nav>

              <div className="w-full mt-auto flex flex-col justify-start items-start gap-[4px]">
                <BodySm className="!text-brown !text-left">Korean skincare, curated</BodySm>
                <a href="https://glaze.alinsafawi.com" target="_blank" rel="noopener noreferrer">
                  <BodySm className="!text-plum !text-left">glaze.alinsafawi.com</BodySm>
                </a>
              </div>

            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
