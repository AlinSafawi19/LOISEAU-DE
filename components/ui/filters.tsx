"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Eraser,
  Eye,
  Check,
} from "lucide-react";
import { SubtitleSm, ButtonLg, bodySmBaseCls } from "./typography";
import { OutlineButton, FilledButton } from "./button";

const SPRING        = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };
const SPRING_POPUP  = { type: "spring" as const, duration: 0.4, bounce: 0,   delay: 0 };

const GENDERS = ["ALL", "Women", "Men", "Unisex"];

interface FilterItem {
  id:   string;
  name: string;
  slug: string;
}

interface ApiEntry {
  id:     string;
  values: { title?: string; slug?: string; [key: string]: string | undefined };
}

interface ApiResponse {
  category?: { entries?: ApiEntry[] };
}

function parseItems(data: ApiResponse): FilterItem[] {
  return (data?.category?.entries ?? []).map((entry) => ({
    id:   entry.id,
    name: entry.values.title ?? entry.id,
    slug: entry.values.slug  ?? "",
  }));
}

function CheckboxItem({
  item,
  checked,
  onToggle,
}: {
  item:     FilterItem;
  checked:  boolean;
  onToggle: () => void;
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = focused || checked ? "black" : "var(--color-beige)";
  const bgColor     = checked ? "black" : "white";

  return (
    <label className="flex flex-row justify-start items-center gap-[10px] w-full p-0 overflow-visible cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onToggle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <span
        className="w-5 h-5 flex-shrink-0 rounded-none flex items-center justify-center"
        style={{
          border: `1px solid ${borderColor}`,
          backgroundColor: bgColor,
          transition: "background-color 0.3s cubic-bezier(0.44, 0, 0.56, 1), border-color 0.3s cubic-bezier(0.44, 0, 0.56, 1)",
        }}
      >
        {checked && <Check size={14} strokeWidth={2.5} className="text-white" />}
      </span>
      <span className={`${bodySmBaseCls} text-black`}>
        {item.name}
      </span>
    </label>
  );
}

interface FilterSectionsProps {
  categories:           FilterItem[];
  brands:               FilterItem[];
  searchValue:          string;
  setSearchValue:       (v: string) => void;
  selectedGender:       string;
  setSelectedGender:    (v: string) => void;
  selectedCategories:   Set<string>;
  setSelectedCategories:(s: Set<string>) => void;
  selectedBrands:       Set<string>;
  setSelectedBrands:    (s: Set<string>) => void;
  toggleItem:           (set: Set<string>, setFn: (s: Set<string>) => void, id: string) => void;
}

function FilterSections({
  categories, brands,
  searchValue, setSearchValue,
  selectedGender, setSelectedGender,
  selectedCategories, setSelectedCategories,
  selectedBrands, setSelectedBrands,
  toggleItem,
}: FilterSectionsProps) {
  return (
    <>
      {/* Search */}
      <div className="w-full flex flex-col justify-start items-start gap-[8px]">
        <SubtitleSm className="w-full !text-black">Search</SubtitleSm>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-[40px] font-inter font-normal text-black text-[14px] bg-white border border-beige rounded-none pl-[36px] pr-[12px] placeholder:text-brown focus:outline-none focus:border-black"
            style={{
              lineHeight: "1.2em",
              letterSpacing: "0em",
              transition: "border-color 0.3s cubic-bezier(0.44, 0, 0.56, 1)",
            }}
          />
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown pointer-events-none" />
        </div>
      </div>

      {/* Gender */}
      <div className="w-full flex flex-col justify-start items-start gap-[8px]">
        <SubtitleSm className="w-full !text-black">Gender</SubtitleSm>
        <div className="relative w-full h-[40px]">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full h-full font-inter font-normal text-black text-[14px] appearance-none bg-transparent border-none rounded-none p-0 pr-6 focus:outline-none cursor-pointer"
            style={{ lineHeight: "1.2em", letterSpacing: "0em" }}
          >
            {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <ChevronDown size={16} strokeWidth={1.5} className="absolute right-0 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
        </div>
      </div>

      {/* Categories */}
      <div className="w-full flex flex-col justify-start items-start gap-[8px]">
        <SubtitleSm className="w-full !text-black">Category</SubtitleSm>
        {categories.map((cat) => (
          <CheckboxItem
            key={cat.id}
            item={cat}
            checked={selectedCategories.has(cat.id)}
            onToggle={() => toggleItem(selectedCategories, setSelectedCategories, cat.id)}
          />
        ))}
      </div>

      {/* Brands */}
      <div className="w-full flex flex-col justify-start items-start gap-[8px]">
        <SubtitleSm className="w-full !text-black">Brand</SubtitleSm>
        {brands.map((brand) => (
          <CheckboxItem
            key={brand.id}
            item={brand}
            checked={selectedBrands.has(brand.id)}
            onToggle={() => toggleItem(selectedBrands, setSelectedBrands, brand.id)}
          />
        ))}
      </div>
    </>
  );
}

interface FiltersProps {
  className?: string;
}

export function Filters({ className = "" }: FiltersProps) {
  const [categories,         setCategories]         = useState<FilterItem[]>([]);
  const [brands,             setBrands]             = useState<FilterItem[]>([]);
  const [filterOpen,         setFilterOpen]         = useState(false);
  const [isMobile,           setIsMobile]           = useState(false);
  const [mounted,            setMounted]            = useState(false);
  const [searchValue,        setSearchValue]        = useState("");
  const [selectedGender,     setSelectedGender]     = useState("ALL");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedBrands,     setSelectedBrands]     = useState<Set<string>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const shouldLock = isMobile && filterOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, filterOpen]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 810);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("/api/loiseau/projects/p-mp9148pm-1/categories/cat-mp917uxy-1f")
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => setCategories(parseItems(data)))
      .catch(() => {});

    fetch("/api/loiseau/projects/p-mp9148pm-1/categories/cat-mp919ixa-1l")
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => setBrands(parseItems(data)))
      .catch(() => {});
  }, []);

  const toggleItem = (set: Set<string>, setFn: (s: Set<string>) => void, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id); else next.add(id);
    setFn(next);
  };

  const clearFilters = () => {
    setSearchValue("");
    setSelectedGender("ALL");
    setSelectedCategories(new Set());
    setSelectedBrands(new Set());
  };

  const sectionProps: FilterSectionsProps = {
    categories, brands,
    searchValue, setSearchValue,
    selectedGender, setSelectedGender,
    selectedCategories, setSelectedCategories,
    selectedBrands, setSelectedBrands,
    toggleItem,
  };

  return (
    <>
      <motion.div
        className={`flex flex-col justify-start items-start gap-[32px] rounded-none
          w-full tablet:w-[227px]
          border border-dusty tablet:border-0
          bg-white tablet:bg-transparent
          pt-2 pr-3 pb-2 pl-4 tablet:p-0
          ${className}`}
        transition={SPRING}
      >
        {/* ── Title + Toggle ── */}
        <div className="w-full flex flex-row justify-between items-center">
          <ButtonLg className="text-left !text-[20px] desktop:!text-[24px] !leading-[1.4] !text-black">
            Filters
          </ButtonLg>

          <button
            className="tablet:hidden flex items-center justify-center p-0 bg-transparent border-none cursor-pointer text-black"
            onClick={() => setFilterOpen((v) => !v)}
            aria-label="Toggle filters"
          >
            {filterOpen ? <X size={24} strokeWidth={1} /> : <SlidersHorizontal size={24} strokeWidth={1} />}
          </button>
        </div>

        {/* ── Desktop: inline filter content (always visible) ── */}
        <div className="hidden tablet:flex flex-col gap-[32px] w-full">
          <FilterSections {...sectionProps} />
          <div className="w-full pt-[24px] border-t border-beige">
            <OutlineButton onClick={clearFilters} icon={<Eraser size={16} />} className="w-full">
              Clear Filter
            </OutlineButton>
          </div>
        </div>
      </motion.div>

      {/* ── Mobile: portal popup ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobile && filterOpen && (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                className="fixed inset-0 z-40 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                transition={SPRING_POPUP}
                onClick={() => setFilterOpen(false)}
              />

              {/* Centered modal */}
              <motion.div
                key="sheet"
                className="fixed inset-0 z-50 flex items-center justify-center p-[24px] pointer-events-none"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={SPRING_POPUP}
              >
              <div className="bg-white w-full max-w-[400px] max-h-[85vh] overflow-y-auto flex flex-col gap-[32px] px-[24px] pt-[24px] pb-[32px] pointer-events-auto">
                {/* Sheet header */}
                <div className="flex flex-row justify-between items-center">
                  <ButtonLg className="text-left !text-[20px] !leading-[1.4] !text-black">
                    Filters
                  </ButtonLg>
                  <button
                    className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer text-black"
                    onClick={() => setFilterOpen(false)}
                    aria-label="Close filters"
                  >
                    <X size={24} strokeWidth={1} />
                  </button>
                </div>

                <FilterSections {...sectionProps} />

                {/* Actions */}
                <div className="w-full flex flex-col gap-[16px] pt-[24px] border-t border-beige">
                  <OutlineButton onClick={clearFilters} icon={<Eraser size={16} />} className="w-full">
                    Clear Filter
                  </OutlineButton>
                  <FilledButton icon={<Eye size={16} />} className="w-full" onClick={() => setFilterOpen(false)}>
                    Show Results
                  </FilledButton>
                </div>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
