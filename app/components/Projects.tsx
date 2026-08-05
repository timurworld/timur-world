"use client";

import Image from "next/image";
import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const categories = ["Characters", "Backgrounds"] as const;

type Collection = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
  coverImage?: string;
  coverChars?: string[];
  comingSoon?: boolean;
};

const collections: Collection[] = [
  { id: "lovini",    name: "Lovini Collection",    emoji: "💖", color: "#ff1493", gradient: "linear-gradient(135deg, #ff1493, #ff69b4)", description: "Love, hearts & Mother's Day — the OG emotional crew",           coverImage: "/Loveni_banner.png" },
  { id: "partini",   name: "Partini Collection",   emoji: "🎉", color: "#ffd700", gradient: "linear-gradient(135deg, #ffd700, #ff6347)", description: "Birthday chaos, cakes & confetti mayhem",                     coverImage: "/partini_banner.png" },
  { id: "sportini",  name: "Hockini Collection",   emoji: "🏆", color: "#00d4ff", gradient: "linear-gradient(135deg, #00d4ff, #30d158)", description: "Hockey legends & arena warriors",                            coverImage: "/sportini_banner.png" },
  { id: "fidgetini", name: "Fidgetini Collection", emoji: "🧩", color: "#bf5af2", gradient: "linear-gradient(135deg, #bf5af2, #4db8db)", description: "Pop it, spin it, squish it — the fidget toy squad",            coverImage: "/fidgitini_banner.png" },
  { id: "foodini",   name: "Foodini Collection",   emoji: "🍣", color: "#ff6f61", gradient: "linear-gradient(135deg, #ff6f61, #ff8c00)", description: "Sushi rolls, citrus kings & berry legends",                   coverImage: "/foodini_banner.png" },
  { id: "summer",    name: "Summer Collection",    emoji: "☀️", color: "#ffe23d", gradient: "linear-gradient(135deg, #ffe23d, #ff9f0a)", description: "Sun-soaked summer vibes — beach, lemonade & World Cup fever",  coverImage: "/summer_banner2.png" },
  { id: "halloween", name: "Halloween Collection", emoji: "🎃", color: "#ff9f0a", gradient: "linear-gradient(135deg, #ff9f0a, #e63900)", description: "Spooky season is coming",                                     coverImage: "/halloween_banner.png", comingSoon: true },
  { id: "christmas", name: "Christmas Collection", emoji: "🎄", color: "#30d158", gradient: "linear-gradient(135deg, #30d158, #e74c3c)", description: "Holiday magic under the tree",                                coverImage: "/christmas_banner.png", comingSoon: true },
];

type Character = {
  name: string;
  file: string;
  rarity: string;
  mult: string;
  color: string;
  collection: string;
  addedAt?: string;
  unlock?: string;
};

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
function isNew(ch: Character): boolean {
  if (!ch.addedAt) return false;
  return Date.now() - new Date(ch.addedAt).getTime() < THIRTY_DAYS;
}

const characters: Character[] = [
  // ── Summer Collection ──
  { name: "Chillen Lemonade",     file: "36_Chillen Lemonade.png",       rarity: "Secret",       mult: "15x",  color: "#ffe23d", collection: "summer", addedAt: "2026-08-05" },
  { name: "Cuppini Triondini",    file: "38_Cuppini Triondini.png",      rarity: "Legendary",    mult: "9x",   color: "#ffd700", collection: "summer", addedAt: "2026-08-05" },
  { name: "Lemon Lemon Sahur",    file: "39_Lemon Lemon Sahur.png",      rarity: "Rare",         mult: "7.5x", color: "#f1c40f", collection: "summer", addedAt: "2026-08-05" },

  // ── Lovini Collection (new drops) ──
  { name: "Lovini Vibini",        file: "40_Lovini vibini.png",          rarity: "Limited",      mult: "28x",  color: "#ff69b4", collection: "lovini", addedAt: "2026-08-05", unlock: "5-skin fusion" },
  { name: "Bobini Lovini",        file: "34_Bobini Lovini.png",          rarity: "Secret",       mult: "11x",  color: "#c8894f", collection: "lovini", addedAt: "2026-08-05" },
  { name: "Cappy Family",         file: "35_Cappy Family.png",           rarity: "Rare",         mult: "8x",   color: "#8B6914", collection: "lovini", addedAt: "2026-08-05" },
  { name: "Cupcakini Sweetini",   file: "37_Cupcakini Sweetini.png",     rarity: "Secret",       mult: "10.5x",color: "#ffb6c1", collection: "lovini", addedAt: "2026-08-05" },
  { name: "Toastini Butterini",   file: "41_Toastini Butterini.png",     rarity: "Rare",         mult: "7.5x", color: "#d4a03c", collection: "lovini", addedAt: "2026-08-05" },

  // ── Fidgetini Collection ──
  { name: "Stressini Ballini",     file: "33_Stressini_ballini.png",      rarity: "Secret",       mult: "14x",  color: "#3498db", collection: "fidgetini", },
  { name: "Spinirino",             file: "32_Spinirino.png",              rarity: "Secret",       mult: "16x",  color: "#e74c3c", collection: "fidgetini", },
  { name: "La Fidget Combination", file: "31_la_fidget_combination.png",  rarity: "Limited",      mult: "35x",  color: "#ff4500", collection: "fidgetini", unlock: "3-skin fusion" },
  { name: "Dragini Sqishini",      file: "30_dragini_sqishini.png",       rarity: "Mythic",       mult: "18x",  color: "#c0392b", collection: "fidgetini", },
  { name: "Fidgetini Cubini",      file: "29_fidgetini_cubini.png",       rarity: "Secret",       mult: "15x",  color: "#9b8ec4", collection: "fidgetini", },
  { name: "Popini Itini",          file: "28_popini_itini.png",           rarity: "Secret",       mult: "13x",  color: "#4db8db", collection: "fidgetini", },

  // ── Sportini Collection ──
  { name: "Los Hockeys",           file: "27_los_hockeys.png",            rarity: "Limited",      mult: "30x",  color: "#00bfff", collection: "sportini", unlock: "3-skin fusion" },
  { name: "Cupideini Hockini",     file: "26_cupideini_hockini.png",      rarity: "Mythic",       mult: "25x",  color: "#ffd700", collection: "sportini", unlock: "Maple Cup fusion" },
  { name: "Hockey Bros",           file: "22_hockey_bros.png",            rarity: "Limited",      mult: "22x",  color: "#ffe23d", collection: "sportini", unlock: "2-skin fusion" },
  { name: "No My Pucks",           file: "21_no_my_pucks.png",            rarity: "Secret",       mult: "12x",  color: "#30d158", collection: "sportini", },
  { name: "Stick Stick",           file: "20_stick_stick.png",            rarity: "Secret",       mult: "9.5x", color: "#00d4ff", collection: "sportini", },

  // ── Foodini Collection ──
  { name: "Auraberry",             file: "25_auraberry.png",              rarity: "Prestige",     mult: "20x",  color: "#a259ff", collection: "foodini",  unlock: "Ascend 5×" },
  { name: "Kingurini Orangini",    file: "24_kinguru_orange.png",         rarity: "Prestige",     mult: "18x",  color: "#ff8c00", collection: "foodini",  unlock: "Ascend 3×" },
  { name: "Sushiro & Soyaro",      file: "23_sushiro_soyaro.png",         rarity: "Prestige",     mult: "12x",  color: "#ff6f61", collection: "foodini",  unlock: "Ascend 1×" },

  // ── Lovini Collection ──
  { name: "Cupidini Hotspottini",  file: "19_cupid_hotspot.png",          rarity: "Legendary",    mult: "9x",   color: "#ff4500", collection: "lovini" },
  { name: "Noo Mio Heartini",      file: "18_noo_my_heart.png",           rarity: "Rare",         mult: "8x",   color: "#8b0000", collection: "lovini" },
  { name: "Rositti Tueletti",      file: "11_rositti_tueletti.png",       rarity: "Rare",         mult: "6x",   color: "#ba55d3", collection: "lovini" },
  { name: "Cupidini Sahuroni",     file: "10_cupid_cupid_sahur.png",      rarity: "Legendary",    mult: "5.5x", color: "#ff1493", collection: "lovini" },
  { name: "Heartini Smilekurro",   file: "08_heartini_smilekur.png",      rarity: "Common",       mult: "4.5x", color: "#40c4c4", collection: "lovini" },
  { name: "Lovini Rosetti",        file: "07_lovin_rose.png",             rarity: "Rare",         mult: "4x",   color: "#4db8db", collection: "lovini" },
  { name: "Teddini & Robotini",    file: "04_teddy_and_rosie.png",        rarity: "Legendary",    mult: "2.5x", color: "#c8894f", collection: "lovini" },
  { name: "Lovini Lovini Lovini",  file: "03_lovini_lovini_lovini.png",   rarity: "Brainrot God", mult: "2x",   color: "#ff1493", collection: "lovini" },
  { name: "Romantini Grandini",    file: "02_la_romantic_grande.png",     rarity: "Common",       mult: "1.5x", color: "#e74c3c", collection: "lovini" },
  { name: "Noobini Lovini",        file: "01_noobini_lovini.png",         rarity: "Common",       mult: "1x",   color: "#ff69b4", collection: "lovini" },

  // ── Partini Collection ──
  { name: "Pizzini Partyini",      file: "15_noobini_partyini.png",       rarity: "Brainrot God", mult: "7x",   color: "#2ecc71", collection: "partini" },
  { name: "Cakini Elephantini",    file: "13_cakini_elephantini.png",     rarity: "OG",           mult: "6.75x",color: "#9b8ec4", collection: "partini" },
  { name: "Birthdayini Cardini",   file: "12_birthdayini_cardini.png",    rarity: "Brainrot God", mult: "6.5x", color: "#ffd700", collection: "partini" },
  { name: "Dragini Partini",       file: "09_dragon_partyini.png",        rarity: "OG",           mult: "5x",   color: "#ffd700", collection: "partini" },
  { name: "Cakini Presintini",     file: "06_cakini_and_presintini.png",  rarity: "Secret",       mult: "3.5x", color: "#ff8c00", collection: "partini" },
  { name: "Noobini Partini",       file: "05_noobini_partini.png",        rarity: "Brainrot God", mult: "3x",   color: "#ff6347", collection: "partini" },
];

const rarityColors: Record<string, string> = {
  Common: "#aaa",
  Rare: "#00d4ff",
  Limited: "#ff9f0a",
  Legendary: "#ffe23d",
  "Brainrot God": "#ff2d78",
  Secret: "#bf5af2",
  OG: "#30d158",
  Prestige: "#a259ff",
  Mythic: "#ffd700",
};

type BgProject = {
  title: string;
  image: string;
  emoji: string;
  description: string;
  glow: string;
  featured: boolean;
};

const backgrounds: BgProject[] = [
  { title: "Fidget World",         image: "/worlds/bg_26.jpg", emoji: "🧩", description: "Neon-lit fidget playground — home of Popini, Cubini, Dragini, Spinirino, Stressini & La Fidget Combo.", glow: "#bf5af2", featured: true },
  { title: "Los Hockeys Stadium",  image: "/worlds/bg_25.jpg", emoji: "⛸️", description: "The Los Hockeys home rink — electric blue ice and the floodlights of a fusion night.", glow: "#00bfff", featured: true },
  { title: "Timur World Arena",    image: "/worlds/bg_24.jpg", emoji: "🏒", description: "Timur World's flagship hockey arena — home of the Maple Cup and Cupideini Hockini.", glow: "#ffd700", featured: true },
  { title: "Candy Dreamland",      image: "/worlds/bg_01.jpg", emoji: "🍭", description: "Noobini Lovini's sweet world of lollipops and cotton candy.", glow: "#ff69b4", featured: false },
  { title: "Castle at Dusk",       image: "/worlds/bg_02.jpg", emoji: "🏰", description: "Romantini Grandini's medieval kingdom under crimson sky.", glow: "#e74c3c", featured: false },
  { title: "Heart Cloud Kingdom",  image: "/worlds/bg_03.jpg", emoji: "💕", description: "Lovini Lovini Lovini's pink paradise of hearts and rainbows.", glow: "#ff1493", featured: false },
  { title: "Toy Workshop",         image: "/worlds/bg_04.jpg", emoji: "🧸", description: "Teddini & Robotini's cozy workshop full of toys and gears.", glow: "#c8894f", featured: false },
  { title: "Fireworks Night",      image: "/worlds/bg_05.jpg", emoji: "🎆", description: "Noobini Partini's celebration under a sky of fireworks.", glow: "#ff6347", featured: false },
  { title: "Bakery Kitchen",       image: "/worlds/bg_06.jpg", emoji: "🧁", description: "Cakini Presintini's magical kitchen of cakes and treats.", glow: "#ff8c00", featured: false },
  { title: "Rose Garden",          image: "/worlds/bg_07.jpg", emoji: "🌹", description: "Lovini Rosetti's beautiful garden bursting with roses.", glow: "#db7093", featured: false },
  { title: "Cloud Kingdom",        image: "/worlds/bg_08.jpg", emoji: "☁️", description: "Heartini Sorrissoni's dreamy floating clouds and rainbows.", glow: "#40c4c4", featured: false },
  { title: "Dark Battle Arena",    image: "/worlds/bg_09.jpg", emoji: "⚔️", description: "Transformini Firini's epic arena with fire pillars.", glow: "#e63900", featured: false },
  { title: "Celestial Temple",     image: "/worlds/bg_10.jpg", emoji: "🌙", description: "Cupidini Sahuroni's floating temple under the moon.", glow: "#ff1493", featured: false },
  { title: "Enchanted Forest",     image: "/worlds/bg_11.jpg", emoji: "🍄", description: "Rositti Tueletti's magical forest with glowing mushrooms.", glow: "#ba55d3", featured: false },
  { title: "Birthday Party",       image: "/worlds/bg_12.jpg", emoji: "🎈", description: "Birthdayini Cardini's golden celebration room.", glow: "#ffd700", featured: false },
  { title: "Circus Tent",          image: "/worlds/bg_13.jpg", emoji: "🎪", description: "Cakini Elephantini's magical circus with spotlights.", glow: "#9b8ec4", featured: false },
  { title: "Inventor Lab",         image: "/worlds/bg_14.jpg", emoji: "💡", description: "Yessini Innovarini's futuristic workshop with holograms.", glow: "#3498db", featured: false },
  { title: "Jungle Party",         image: "/worlds/bg_15.jpg", emoji: "🌴", description: "Noobini Partyini's tropical jungle celebration.", glow: "#2ecc71", featured: false },
  { title: "Ocean Sunset",         image: "/worlds/bg_16.jpg", emoji: "🌅", description: "Lovini Lovini Sahur's peaceful ocean at golden hour.", glow: "#5dade2", featured: false },
  { title: "Crimson Arena",        image: "/worlds/bg_17.jpg", emoji: "🔥", description: "Chiclitera Cupidini's fiery battlefield.", glow: "#dc143c", featured: false },
  { title: "Rainy Night",          image: "/worlds/bg_18.jpg", emoji: "🌧️", description: "Noo Mio Heartini's moody midnight rain.", glow: "#8b0000", featured: false },
  { title: "Volcano Throne",       image: "/worlds/bg_19.jpg", emoji: "🌋", description: "Cupidini Hotspottini's epic lava kingdom.", glow: "#ff4500", featured: false },
  { title: "Hockey Rink",          image: "/worlds/bg_20.jpg", emoji: "🏒", description: "The Sportini crew's ice arena — home of Stick Stick, No My Pucks & Hockey Bros.", glow: "#00d4ff", featured: false },
  { title: "Citrus Oasis",         image: "/worlds/bg_21.jpg", emoji: "🍊", description: "Kingurini Orangini's tropical orange grove with waterfalls and paw banners.", glow: "#ff8c00", featured: false },
  { title: "Neon Berry City",      image: "/worlds/bg_22.jpg", emoji: "🍓", description: "Auraberry's electric skyline lit by neon strawberries and stars.", glow: "#a259ff", featured: false },
  { title: "Sushi Sunset",         image: "/worlds/bg_23.jpg", emoji: "🍣", description: "Sushiro & Soyaro's torii-gated sushi shop at golden hour.", glow: "#ff6f61", featured: false },
];

const BG_PER_PAGE = 9;

function collectionHasNew(colId: string): boolean {
  return characters.some((ch) => ch.collection === colId && isNew(ch));
}

const sortedCollections = [...collections].sort((a, b) => {
  const aNew = collectionHasNew(a.id) ? 0 : 1;
  const bNew = collectionHasNew(b.id) ? 0 : 1;
  return aNew - bNew;
});

export default function Projects() {
  const [activeTab, setActiveTab] = useState<(typeof categories)[number]>("Characters");
  const [openCollection, setOpenCollection] = useState<string | null>(null);
  const [bgPage, setBgPage] = useState(0);
  const ref = useReveal();

  const activeCollection = collections.find((c) => c.id === openCollection);
  const collectionChars = openCollection
    ? characters.filter((ch) => ch.collection === openCollection)
    : [];

  const bgFiltered = backgrounds;
  const bgTotalPages = Math.ceil(bgFiltered.length / BG_PER_PAGE);
  const bgSlice = bgFiltered.slice(bgPage * BG_PER_PAGE, (bgPage + 1) * BG_PER_PAGE);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setOpenCollection(null);
    setBgPage(0);
  };

  return (
    <section id="projects" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[10%] right-[-5%] w-[35%] h-[40%] rounded-full bg-neon-pink/[0.05] blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[35%] rounded-full bg-neon-green/[0.05] blur-[120px]" />
      </div>
      <div className="absolute inset-0 grain" />
      <div className="absolute top-0 left-[5%] right-[5%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,120,0.15), rgba(48,209,88,0.15), transparent)" }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
            style={{ background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.2)" }}
          >
            <span className="text-lg">🎯</span>
            <span className="text-neon-pink">Collections</span>
          </span>
        </div>

        <h2 className="reveal font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-12">
          The <span className="gradient-text">universe</span>
        </h2>

        {/* Primary tabs: Characters / Backgrounds */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide
                transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-110 active:scale-90 hover-wiggle
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue
                ${activeTab === cat
                  ? "text-white shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  : "text-white/50 hover:text-white"
                }`}
              style={
                activeTab === cat
                  ? { background: "linear-gradient(135deg, #00d4ff, #bf5af2)", border: "none" }
                  : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {cat === "Characters" ? "Collections" : cat}
            </button>
          ))}
        </div>

        {/* ─── Characters tab: collection cards or open collection ─── */}
        {activeTab === "Characters" && !openCollection && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedCollections.map((col, idx) => {
              const count = characters.filter((ch) => ch.collection === col.id).length;
              return (
                <button
                  key={col.id}
                  onClick={() => !col.comingSoon && setOpenCollection(col.id)}
                  disabled={col.comingSoon}
                  className={`group relative rounded-2xl overflow-hidden text-left
                    transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${col.comingSoon ? "cursor-default opacity-70" : "cursor-pointer hover:scale-[1.05] hover-wiggle"}`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.08}s both`,
                    background: "var(--color-surface)",
                    border: `2px solid ${col.color}22`,
                    boxShadow: `0 4px 30px ${col.color}15`,
                  }}
                >
                  {/* Cover area */}
                  <div className="relative aspect-[3/2] overflow-hidden"
                    style={{ background: `radial-gradient(ellipse at 50% 60%, ${col.color}20, ${col.color}08, var(--color-surface))` }}
                  >
                    {col.coverImage ? (
                      <Image
                        src={col.coverImage}
                        alt={col.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${col.comingSoon ? "opacity-60 saturate-[0.7]" : ""}`}
                      />
                    ) : col.coverChars && !col.comingSoon ? (
                      <div className="relative w-full h-full">
                        {(() => {
                          const chars = col.coverChars!;
                          const n = chars.length;
                          const layouts: Record<number, { left: string; bottom: string; w: string; z: number }[]> = {
                            3: [
                              { left: "5%",  bottom: "2%", w: "40%", z: 1 },
                              { left: "30%", bottom: "6%", w: "44%", z: 3 },
                              { left: "56%", bottom: "2%", w: "40%", z: 2 },
                            ],
                            4: [
                              { left: "-2%",  bottom: "0%", w: "36%", z: 1 },
                              { left: "18%", bottom: "5%",  w: "40%", z: 3 },
                              { left: "40%", bottom: "5%",  w: "40%", z: 4 },
                              { left: "60%", bottom: "0%",  w: "36%", z: 2 },
                            ],
                          };
                          const layout = layouts[n] || layouts[4];
                          return chars.map((file, ci) => {
                            const pos = layout[ci] || layout[layout.length - 1];
                            return (
                              <div
                                key={file}
                                className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                style={{
                                  left: pos.left,
                                  bottom: pos.bottom,
                                  width: pos.w,
                                  height: "90%",
                                  zIndex: pos.z,
                                }}
                              >
                                <Image
                                  src={`/characters/${file}`}
                                  alt=""
                                  fill
                                  sizes="200px"
                                  loading="lazy"
                                  className="object-contain object-bottom"
                                  style={{ filter: `drop-shadow(0 4px 16px ${col.color}44)` }}
                                />
                              </div>
                            );
                          });
                        })()}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3">
                        <span className="text-6xl" style={{ filter: col.comingSoon ? "grayscale(0.5)" : undefined }}>{col.emoji}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #0f0825, transparent 40%)" }} />

                    {/* NEW collection badge */}
                    {collectionHasNew(col.id) && (
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ background: "linear-gradient(135deg, #30d158, #00d4ff)", color: "#0f0825", boxShadow: "0 0 14px rgba(48,209,88,0.45)" }}
                      >
                        New
                      </div>
                    )}

                    {/* Count badge */}
                    {!col.comingSoon && (
                      <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${col.color}22`, color: col.color, border: `1px solid ${col.color}44` }}
                      >
                        {count} {count === 1 ? "character" : "characters"}
                      </div>
                    )}

                    {/* Coming soon badge */}
                    {col.comingSoon && (
                      <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.15em]"
                        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        Coming Soon
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 pt-3">
                    <div className="mb-1">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                        {col.name}
                      </h3>
                    </div>
                    <p className="text-sm text-white/35">{col.description}</p>
                  </div>

                  {/* Bottom glow */}
                  {!col.comingSoon && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(90deg, transparent, ${col.color}, transparent)`, boxShadow: `0 0 12px ${col.color}` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ─── Open collection: back button + character grid ─── */}
        {activeTab === "Characters" && openCollection && activeCollection && (
          <div>
            {/* Back + collection header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setOpenCollection(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
                  transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  hover:scale-105 active:scale-95"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All Collections
              </button>
              <div className="flex items-center gap-2">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  {activeCollection.name}
                </h3>
                <span className="text-sm text-white/40 ml-1">({collectionChars.length})</span>
              </div>
            </div>

            {/* Character grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {collectionChars.map((ch, idx) => (
                <div
                  key={ch.file}
                  className="group relative rounded-2xl overflow-hidden cursor-default
                    transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    hover:scale-[1.05] hover-wiggle"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.06}s both`,
                    background: "var(--color-surface)",
                    border: `2px solid ${ch.color}22`,
                    boxShadow: `0 4px 30px ${ch.color}15`,
                  }}
                >
                  {/* Rarity badge */}
                  <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: `${rarityColors[ch.rarity] || "#aaa"}22`, color: rarityColors[ch.rarity] || "#aaa", border: `1px solid ${rarityColors[ch.rarity] || "#aaa"}44` }}
                  >
                    {ch.rarity}
                  </div>

                  {/* NEW badge */}
                  {isNew(ch) && (
                    <div className="absolute top-11 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ background: "linear-gradient(135deg, #30d158, #00d4ff)", color: "#0f0825", boxShadow: "0 0 14px rgba(48,209,88,0.45)" }}
                    >
                      ✨ New
                    </div>
                  )}

                  {/* Unlock badge */}
                  {ch.unlock && (
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ background: "linear-gradient(135deg, #a259ff, #ffd700)", color: "#0f0825", boxShadow: "0 0 14px rgba(162,89,255,0.45)" }}
                    >
                      👑 {ch.unlock}
                    </div>
                  )}

                  {/* Character image */}
                  <div className="relative aspect-[3/2] overflow-hidden flex items-center justify-center"
                    style={{ background: `radial-gradient(circle, ${ch.color}15, var(--color-surface))` }}
                  >
                    <Image
                      src={`/characters/${ch.file}`}
                      alt={ch.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      style={{ filter: `drop-shadow(0 0 15px ${ch.color}66)`, objectPosition: "center", padding: "9% 5%" }}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #0f0825, transparent 40%)" }} />

                    {/* Category tag */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full font-bold"
                        style={{ background: `${ch.color}20`, color: ch.color, border: `1px solid ${ch.color}30` }}
                      >
                        Characters
                      </span>
                    </div>

                    {/* Multiplier */}
                    <div className="absolute bottom-3 right-4 text-lg font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: ch.color, textShadow: `0 0 10px ${ch.color}` }}
                    >
                      {ch.mult}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 pt-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300 mb-1">
                      {ch.name}
                    </h3>
                    <p className="text-sm text-white/35">{activeCollection.name} · {ch.rarity} · {ch.mult}</p>
                  </div>

                  {/* Bottom glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(90deg, transparent, ${ch.color}, transparent)`, boxShadow: `0 0 12px ${ch.color}` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Backgrounds tab ─── */}
        {activeTab === "Backgrounds" && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bgSlice.map((bg, idx) => (
                <div
                  key={bg.title}
                  className={`group relative rounded-2xl overflow-hidden cursor-default
                    transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    hover:scale-[1.05] hover-wiggle
                    ${bg.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.06}s both`,
                    background: "var(--color-surface)",
                    border: `2px solid ${bg.glow}22`,
                    boxShadow: `0 4px 30px ${bg.glow}15`,
                  }}
                >
                  {bg.featured && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ background: "linear-gradient(135deg, #ffe23d, #ff9f0a)", color: "#0f0825" }}
                    >
                      ⭐ Featured
                    </div>
                  )}

                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={bg.image}
                      alt={bg.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #0f0825, transparent 40%)" }} />
                  </div>

                  <div className="p-5 pt-2 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300 mb-1">
                        {bg.title}
                      </h3>
                      <p className="text-sm text-white/35">{bg.description}</p>
                    </div>
                    <a
                      href={bg.image}
                      download
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
                        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        hover:scale-110 active:scale-90"
                      style={{ background: `${bg.glow}20`, color: bg.glow, border: `1px solid ${bg.glow}30` }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Save
                    </a>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(90deg, transparent, ${bg.glow}, transparent)`, boxShadow: `0 0 12px ${bg.glow}` }}
                  />
                </div>
              ))}
            </div>

            {bgTotalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setBgPage(Math.max(0, bgPage - 1))}
                  disabled={bgPage === 0}
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  ← Prev
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: bgTotalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setBgPage(i)}
                      className="w-9 h-9 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-110"
                      style={{
                        background: bgPage === i ? "linear-gradient(135deg, #00d4ff, #bf5af2)" : "rgba(255,255,255,0.06)",
                        border: bgPage === i ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setBgPage(Math.min(bgTotalPages - 1, bgPage + 1))}
                  disabled={bgPage === bgTotalPages - 1}
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
