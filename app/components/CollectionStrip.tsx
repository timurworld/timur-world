"use client";

import Image from "next/image";
import { type Series, SERIES_META } from "../data/characters";

type CollectionCard = {
  id: Series;
  label: string;
  banner: string;
  color: string;
};

const collections: CollectionCard[] = [
  { id: "lovini",    label: "Lovini",    banner: "/Loveni_banner.png",     color: SERIES_META.lovini.color },
  { id: "partini",   label: "Partini",   banner: "/partini_banner.png",    color: SERIES_META.partini.color },
  { id: "hockini",   label: "Hockini",   banner: "/sportini_banner.png",   color: SERIES_META.hockini.color },
  { id: "fidgetini", label: "Fidgetini", banner: "/fidgitini_banner.png",  color: SERIES_META.fidgetini.color },
  { id: "foodini",   label: "Foodini",   banner: "/foodini_banner.png",    color: SERIES_META.foodini.color },
  { id: "summerini", label: "Summerini", banner: "/summer_banner2.png",    color: SERIES_META.summerini.color },
];

export default function CollectionStrip({
  active,
  onSelect,
}: {
  active: Series | "all";
  onSelect: (id: Series | "all") => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
      {collections.map((col) => {
        return (
          <button
            key={col.id}
            onClick={() => onSelect(active === col.id ? "all" : col.id)}
            className={`group relative shrink-0 w-40 rounded-2xl overflow-hidden transition-all duration-200
              ${active === col.id ? "ring-2 ring-offset-2 ring-offset-paper" : "hover:scale-[1.03]"}`}
            style={active === col.id ? { ringColor: col.color } as React.CSSProperties : undefined}
          >
            <div className="aspect-[16/10] relative">
              <Image
                src={col.banner}
                alt={col.label}
                fill
                sizes="160px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-2 left-3 font-[family-name:var(--font-display)] text-sm font-bold text-white drop-shadow-sm">
                {col.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
