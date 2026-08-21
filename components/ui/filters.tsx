"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  Eraser,
  Eye,
  Check,
} from "lucide-react";
import { H5, SubtitleSm, bodySmBaseCls } from "./typography";
import { OutlineButton, FilledButton } from "./button";
import { useScrollLock } from "./use-scroll-lock";

const SPRING        = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };
const SPRING_POPUP  = { type: "spring" as const, duration: 0.4, bounce: 0,   delay: 0 };


export interface FilterItem {
  id:   string;
  name: string;
  slug: string;
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
      <span className={`${bodySmBaseCls} text-black`}>{item.name}</span>
    </label>
  );
}

export interface FiltersProps {
  categories:         FilterItem[];
  collections:        FilterItem[];
  skinTypes:          FilterItem[];
  searchValue:        string;
  onSearchChange:     (v: string) => void;
  selectedCategories: Set<string>;
  onCategoryToggle:   (id: string) => void;
  selectedCollections: Set<string>;
  onCollectionToggle:  (id: string) => void;
  selectedSkinTypes:  Set<string>;
  onSkinTypeToggle:   (id: string) => void;
  onClear:            () => void;
  className?:         string;
}

function FilterSections({
  categories, collections, skinTypes,
  searchValue, onSearchChange,
  selectedCategories, onCategoryToggle,
  selectedCollections, onCollectionToggle,
  selectedSkinTypes, onSkinTypeToggle,
}: Omit<FiltersProps, "onClear" | "className">) {
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[40px] font-inter font-normal text-black text-[14px] bg-white border border-beige rounded-none pl-[36px] pr-[12px] placeholder:text-brown focus:outline-none focus:border-black"
            style={{ lineHeight: "1.2em", letterSpacing: "0em", transition: "border-color 0.3s cubic-bezier(0.44, 0, 0.56, 1)" }}
          />
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown pointer-events-none" />
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
            onToggle={() => onCategoryToggle(cat.id)}
          />
        ))}
      </div>

      {/* Skin type — stays hidden until the dashboard list has entries */}
      {skinTypes.length > 0 && (
        <div className="w-full flex flex-col justify-start items-start gap-[8px]">
          <SubtitleSm className="w-full !text-black">Skin type</SubtitleSm>
          {skinTypes.map((skin) => (
            <CheckboxItem
              key={skin.id}
              item={skin}
              checked={selectedSkinTypes.has(skin.id)}
              onToggle={() => onSkinTypeToggle(skin.id)}
            />
          ))}
        </div>
      )}

      {/* Collections */}
      <div className="w-full flex flex-col justify-start items-start gap-[8px]">
        <SubtitleSm className="w-full !text-black">Collection</SubtitleSm>
        {collections.map((col) => (
          <CheckboxItem
            key={col.id}
            item={col}
            checked={selectedCollections.has(col.id)}
            onToggle={() => onCollectionToggle(col.id)}
          />
        ))}
      </div>
    </>
  );
}

export function Filters({
  categories, collections, skinTypes,
  searchValue, onSearchChange,
  selectedCategories, onCategoryToggle,
  selectedCollections, onCollectionToggle,
  selectedSkinTypes, onSkinTypeToggle,
  onClear,
  className = "",
}: FiltersProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const [mounted,    setMounted]    = useState(false);

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

  useScrollLock(isMobile && filterOpen);

  const sectionProps = {
    categories, collections, skinTypes,
    searchValue, onSearchChange,
    selectedCategories, onCategoryToggle,
    selectedCollections, onCollectionToggle,
    selectedSkinTypes, onSkinTypeToggle,
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
        {/* Toggle — mobile only, the sections stand on their own from tablet up */}
        <div className="w-full tablet:hidden flex flex-row justify-between items-center gap-[16px]">
          <SubtitleSm className="!text-black !text-left">Filters</SubtitleSm>
          <button
            className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer text-black"
            onClick={() => setFilterOpen((v) => !v)}
            aria-label="Toggle filters"
          >
            {filterOpen ? <X size={24} strokeWidth={1} /> : <SlidersHorizontal size={24} strokeWidth={1} />}
          </button>
        </div>

        {/* Desktop: inline filter content */}
        <div className="hidden tablet:flex flex-col gap-[32px] w-full">
          <FilterSections {...sectionProps} />
          <div className="w-full pt-[24px] border-t border-beige">
            <OutlineButton onClick={onClear} icon={<Eraser size={16} />} className="w-full">
              Clear Filter
            </OutlineButton>
          </div>
        </div>
      </motion.div>

      {/* Mobile: portal popup */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobile && filterOpen && (
            <>
              <motion.div
                key="overlay"
                className="fixed inset-0 z-40 bg-plum"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={SPRING_POPUP}
                onClick={() => setFilterOpen(false)}
              />
              <motion.div
                key="sheet"
                className="fixed inset-0 z-50 flex items-center justify-center p-[24px] pointer-events-none"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={SPRING_POPUP}
              >
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="filters-title"
                  className="bg-white w-full max-w-[400px] max-h-[85vh] rounded-none overflow-y-auto flex flex-col gap-[32px] px-[24px] pt-[24px] pb-[32px] pointer-events-auto"
                >
                  <div className="flex flex-row justify-between items-center gap-[16px]">
                    <H5 id="filters-title" className="!text-black !text-left">Filters</H5>
                    <button
                      className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer text-black"
                      onClick={() => setFilterOpen(false)}
                      aria-label="Close filters"
                    >
                      <X size={24} strokeWidth={1} />
                    </button>
                  </div>
                  <FilterSections {...sectionProps} />
                  <div className="w-full flex flex-col gap-[16px] pt-[24px] border-t border-beige">
                    <OutlineButton onClick={onClear} icon={<Eraser size={16} />} className="w-full">
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
