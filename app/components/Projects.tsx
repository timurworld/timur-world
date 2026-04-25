"use client";

import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const categories = ["Characters", "Backgrounds"] as const;

// Character classes — thematic families grouping characters by vibe.
// "Foodini" covers the new edible-themed cast (sushi, fruit, berries...) —
// distinct from Partini which is birthday/party food.
const CHARACTER_CLASSES = ["All", "Lovini", "Partini", "Robotini", "Sportini", "Foodini"] as const;
type CharacterClass = typeof CHARACTER_CLASSES[number];

const classMeta: Record<Exclude<CharacterClass, "All">, { emoji: string; desc: string; color: string }> = {
  Lovini:   { emoji: "💖", desc: "Emotion characters",  color: "#ff1493" },
  Partini:  { emoji: "🎉", desc: "Chaos characters",     color: "#ffd700" },
  Robotini: { emoji: "🤖", desc: "Tech characters",      color: "#00d4ff" },
  Sportini: { emoji: "🏆", desc: "Sports characters",    color: "#30d158" },
  Foodini:  { emoji: "🍣", desc: "Food characters",      color: "#ff6f61" },
};

const characters = [
  { name: "Noobini Lovini",     file: "01_noobini_lovini.png",         rarity: "Common",       mult: "1x",   color: "#ff69b4", class: "Lovini" },
  { name: "Romantini Grandini", file: "02_la_romantic_grande.png",     rarity: "Common",       mult: "1.5x", color: "#e74c3c", class: "Lovini" },
  { name: "Lovini Lovini Lovini", file: "03_lovini_lovini_lovini.png", rarity: "Brainrot God", mult: "2x",   color: "#ff1493", class: "Lovini" },
  { name: "Teddini & Robotini", file: "04_teddy_and_rosie.png",        rarity: "Legendary",    mult: "2.5x", color: "#c8894f", class: "Robotini" },
  { name: "Noobini Partini",    file: "05_noobini_partini.png",        rarity: "Brainrot God", mult: "3x",   color: "#ff6347", class: "Partini" },
  { name: "Cakini Presintini",  file: "06_cakini_and_presintini.png",  rarity: "Secret",       mult: "3.5x", color: "#ff8c00", class: "Partini" },
  { name: "Lovini Rosetti",     file: "07_lovin_rose.png",             rarity: "Rare",         mult: "4x",   color: "#4db8db", class: "Lovini" },
  { name: "Heartini Smilekurro", file: "08_heartini_smilekur.png",     rarity: "Common",       mult: "4.5x", color: "#40c4c4", class: "Lovini" },
  { name: "Dragini Partini",    file: "09_dragon_partyini.png",        rarity: "OG",           mult: "5x",   color: "#ffd700", class: "Partini" },
  { name: "Cupidini Sahuroni",  file: "10_cupid_cupid_sahur.png",      rarity: "Legendary",    mult: "5.5x", color: "#ff1493", class: "Lovini" },
  { name: "Rositti Tueletti",   file: "11_rositti_tueletti.png",       rarity: "Rare",         mult: "6x",   color: "#ba55d3", class: "Lovini" },
  { name: "Birthdayini Cardini", file: "12_birthdayini_cardini.png",   rarity: "Brainrot God", mult: "6.5x", color: "#ffd700", class: "Partini" },
  { name: "Cakini Elephantini", file: "13_cakini_elephantini.png",     rarity: "OG",           mult: "6.75x",color: "#9b8ec4", class: "Partini" },
  { name: "Pizzini Partyini",   file: "15_noobini_partyini.png",       rarity: "Brainrot God", mult: "7x",   color: "#2ecc71", class: "Partini" },
  { name: "Noo Mio Heartini",   file: "18_noo_my_heart.png",           rarity: "Rare",         mult: "8x",   color: "#8b0000", class: "Lovini" },
  { name: "Cupidini Hotspottini", file: "19_cupid_hotspot.png",        rarity: "Legendary",    mult: "9x",   color: "#ff4500", class: "Lovini" },
  { name: "Stick Stick",        file: "20_stick_stick.png",            rarity: "Secret",       mult: "9.5x", color: "#00d4ff", class: "Sportini", isNew: true },
  { name: "No My Pucks",        file: "21_no_my_pucks.png",            rarity: "Secret",       mult: "12x",  color: "#30d158", class: "Sportini", isNew: true },
  { name: "Hockey Bros",        file: "22_hockey_bros.png",            rarity: "Limited",      mult: "22x",  color: "#ffe23d", class: "Sportini", isNew: true },
  // Prestige skins — earned only by ascending in the game, not random drops.
  // All food-themed → Foodini class. Prestige is the rarity tier.
  { name: "Sushiro & Soyaro",   file: "23_sushiro_soyaro.png",         rarity: "Prestige",     mult: "12x",  color: "#ff6f61", class: "Foodini",  isNew: true, unlock: "Ascend 1×" },
  { name: "Kingurini Orangini", file: "24_kinguru_orange.png",         rarity: "Prestige",     mult: "18x",  color: "#ff8c00", class: "Foodini",  isNew: true, unlock: "Ascend 3×" },
  { name: "Auraberry",          file: "25_auraberry.png",              rarity: "Prestige",     mult: "20x",  color: "#a259ff", class: "Foodini",  isNew: true, unlock: "Ascend 5×" },
];
// Order intentional: Prestige sits at the very top — the aspirational endgame
// tier. Limited is "scarce drops"; Prestige is "skill flex".
const RARITY_ORDER = ["All", "Prestige", "Common", "Rare", "Legendary", "Brainrot God", "Secret", "Limited", "OG"] as const;
type Rarity = typeof RARITY_ORDER[number];

const rarityColors: Record<string, string> = {
  Common: "#aaa",
  Rare: "#00d4ff",
  Limited: "#ff9f0a",
  Legendary: "#ffe23d",
  "Brainrot God": "#ff2d78",
  Secret: "#bf5af2",
  OG: "#30d158",
  Prestige: "#a259ff",
};

type Project = {
  title: string;
  category: "Characters" | "Backgrounds";
  image: string;
  emoji: string;
  description: string;
  glow: string;
  featured: boolean;
  rarity?: string;
  mult?: string;
  charClass?: Exclude<CharacterClass, "All">;
  isNew?: boolean;
  unlock?: string;          // e.g. "Ascend 3×" — shown as a badge for prestige skins
};

const projects: Project[] = [
  // Characters from the game
  ...characters.map((ch) => ({
    title: ch.name,
    category: "Characters" as const,
    image: `/characters/${ch.file}`,
    emoji: "",
    description: `${ch.class} · ${ch.rarity} · ${ch.mult}`,
    glow: ch.color,
    featured: false,
    rarity: ch.rarity,
    mult: ch.mult,
    charClass: ch.class as Exclude<CharacterClass, "All">,
    isNew: (ch as { isNew?: boolean }).isNew ?? false,
    unlock: (ch as { unlock?: string }).unlock,
  })),
  // Backgrounds — all 19 worlds
  { title: "Candy Dreamland", category: "Backgrounds" as const, image: "/worlds/bg_01.png", emoji: "🍭", description: "Noobini Lovini's sweet world of lollipops and cotton candy.", glow: "#ff69b4", featured: false },
  { title: "Castle at Dusk", category: "Backgrounds" as const, image: "/worlds/bg_02.png", emoji: "🏰", description: "Romantini Grandini's medieval kingdom under crimson sky.", glow: "#e74c3c", featured: false },
  { title: "Heart Cloud Kingdom", category: "Backgrounds" as const, image: "/worlds/bg_03.png", emoji: "💕", description: "Lovini Lovini Lovini's pink paradise of hearts and rainbows.", glow: "#ff1493", featured: false },
  { title: "Toy Workshop", category: "Backgrounds" as const, image: "/worlds/bg_04.png", emoji: "🧸", description: "Teddini & Robotini's cozy workshop full of toys and gears.", glow: "#c8894f", featured: false },
  { title: "Fireworks Night", category: "Backgrounds" as const, image: "/worlds/bg_05.png", emoji: "🎆", description: "Noobini Partini's celebration under a sky of fireworks.", glow: "#ff6347", featured: false },
  { title: "Bakery Kitchen", category: "Backgrounds" as const, image: "/worlds/bg_06.png", emoji: "🧁", description: "Cakini Presintini's magical kitchen of cakes and treats.", glow: "#ff8c00", featured: false },
  { title: "Rose Garden", category: "Backgrounds" as const, image: "/worlds/bg_07.png", emoji: "🌹", description: "Lovini Rosetti's beautiful garden bursting with roses.", glow: "#db7093", featured: false },
  { title: "Cloud Kingdom", category: "Backgrounds" as const, image: "/worlds/bg_08.png", emoji: "☁️", description: "Heartini Sorrissoni's dreamy floating clouds and rainbows.", glow: "#40c4c4", featured: false },
  { title: "Dark Battle Arena", category: "Backgrounds" as const, image: "/worlds/bg_09.png", emoji: "⚔️", description: "Transformini Firini's epic arena with fire pillars.", glow: "#e63900", featured: false },
  { title: "Celestial Temple", category: "Backgrounds" as const, image: "/worlds/bg_10.png", emoji: "🌙", description: "Cupidini Sahuroni's floating temple under the moon.", glow: "#ff1493", featured: false },
  { title: "Enchanted Forest", category: "Backgrounds" as const, image: "/worlds/bg_11.png", emoji: "🍄", description: "Rositti Tueletti's magical forest with glowing mushrooms.", glow: "#ba55d3", featured: false },
  { title: "Birthday Party", category: "Backgrounds" as const, image: "/worlds/bg_12.png", emoji: "🎈", description: "Birthdayini Cardini's golden celebration room.", glow: "#ffd700", featured: false },
  { title: "Circus Tent", category: "Backgrounds" as const, image: "/worlds/bg_13.png", emoji: "🎪", description: "Cakini Elephantini's magical circus with spotlights.", glow: "#9b8ec4", featured: false },
  { title: "Inventor Lab", category: "Backgrounds" as const, image: "/worlds/bg_14.png", emoji: "💡", description: "Yessini Innovarini's futuristic workshop with holograms.", glow: "#3498db", featured: false },
  { title: "Jungle Party", category: "Backgrounds" as const, image: "/worlds/bg_15.png", emoji: "🌴", description: "Noobini Partyini's tropical jungle celebration.", glow: "#2ecc71", featured: false },
  { title: "Ocean Sunset", category: "Backgrounds" as const, image: "/worlds/bg_16.png", emoji: "🌅", description: "Lovini Lovini Sahur's peaceful ocean at golden hour.", glow: "#5dade2", featured: false },
  { title: "Crimson Arena", category: "Backgrounds" as const, image: "/worlds/bg_17.png", emoji: "🔥", description: "Chiclitera Cupidini's fiery battlefield.", glow: "#dc143c", featured: false },
  { title: "Rainy Night", category: "Backgrounds" as const, image: "/worlds/bg_18.png", emoji: "🌧️", description: "Noo Mio Heartini's moody midnight rain.", glow: "#8b0000", featured: false },
  { title: "Volcano Throne", category: "Backgrounds" as const, image: "/worlds/bg_19.png", emoji: "🌋", description: "Cupidini Hotspottini's epic lava kingdom.", glow: "#ff4500", featured: false },
  { title: "Hockey Rink", category: "Backgrounds" as const, image: "/worlds/bg_20.png", emoji: "🏒", description: "The Sportini crew's ice arena — home of Stick Stick, No My Pucks & Hockey Bros.", glow: "#00d4ff", featured: false },
];

const ITEMS_PER_PAGE = 9;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("Characters");
  const [activeClass, setActiveClass] = useState<CharacterClass>("All");
  const [activeRarity, setActiveRarity] = useState<Rarity>("All");
  const [page, setPage] = useState(0);
  const ref = useReveal();

  const allFiltered = projects.filter((p) => {
    if (p.category !== activeFilter) return false;
    if (activeFilter === "Characters") {
      if (activeClass !== "All" && p.charClass !== activeClass) return false;
      if (activeRarity !== "All" && p.rarity !== activeRarity) return false;
    }
    return true;
  }).sort((a, b) => {
    // Newest (isNew) first; preserves the original ordering otherwise.
    const an = a.isNew ? 0 : 1;
    const bn = b.isNew ? 0 : 1;
    return an - bn;
  });
  const totalPages = Math.ceil(allFiltered.length / ITEMS_PER_PAGE);
  const filtered = allFiltered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  // Count of characters per class so we can show counts in pills
  const classCounts: Record<string, number> = { All: characters.length };
  for (const ch of characters) classCounts[ch.class] = (classCounts[ch.class] || 0) + 1;

  // Reset filters when switching primary tab
  const handleFilterChange = (cat: typeof activeFilter) => {
    setActiveFilter(cat);
    setActiveClass("All");
    setActiveRarity("All");
    setPage(0);
  };
  const handleClassChange = (c: CharacterClass) => { setActiveClass(c); setPage(0); };
  const handleRarityChange = (r: Rarity) => { setActiveRarity(r); setPage(0); };

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
            <span className="text-neon-pink">Projects</span>
          </span>
        </div>

        <h2 className="reveal font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-12">
          My <span className="gradient-text">creations</span>
        </h2>

        {/* Primary filter: Characters / Backgrounds */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide
                transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-110 active:scale-90 hover-wiggle
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue
                ${
                  activeFilter === cat
                    ? "text-white shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                    : "text-white/50 hover:text-white"
                }`}
              style={
                activeFilter === cat
                  ? { background: "linear-gradient(135deg, #00d4ff, #bf5af2)", border: "none" }
                  : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters — only show for Characters */}
        {activeFilter === "Characters" && (
          <div className="space-y-3 mb-10">
            {/* Rarity row */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-white/35 self-center mr-2">Rarity</span>
              {RARITY_ORDER.map((rar) => {
                const isActive = activeRarity === rar;
                const tint = rar === "All" ? "#00d4ff" : rarityColors[rar] || "#aaa";
                return (
                  <button
                    key={rar}
                    onClick={() => handleRarityChange(rar)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide
                      transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      hover:scale-105 active:scale-95`}
                    style={
                      isActive
                        ? { background: `${tint}22`, color: tint, border: `1px solid ${tint}66`, boxShadow: `0 0 14px ${tint}22` }
                        : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {rar}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {activeFilter !== "Characters" && <div className="mb-8" />}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="text-5xl mb-4 opacity-50">
              {activeFilter === "Characters" && activeClass !== "All" && classMeta[activeClass as Exclude<CharacterClass, "All">]?.emoji}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white/80 mb-2">
              No characters here yet
            </h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              {activeClass !== "All"
                ? `The ${activeClass} class is coming soon — new ${classMeta[activeClass as Exclude<CharacterClass, "All">]?.desc.toLowerCase()} are on the way.`
                : "Try a different filter combination."}
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, idx) => (
            <div
              key={project.title}
              className={`group relative rounded-2xl overflow-hidden cursor-default
                transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-[1.05] hover-wiggle
                ${project.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{
                animation: `fadeInUp 0.5s ease-out ${idx * 0.06}s both`,
                background: "var(--color-surface)",
                border: `2px solid ${project.glow}22`,
                boxShadow: `0 4px 30px ${project.glow}15`,
              }}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: "linear-gradient(135deg, #ffe23d, #ff9f0a)", color: "#0f0825" }}
                >
                  ⭐ Featured
                </div>
              )}

              {/* Rarity badge for characters */}
              {project.rarity && (
                <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: `${rarityColors[project.rarity] || "#aaa"}22`, color: rarityColors[project.rarity] || "#aaa", border: `1px solid ${rarityColors[project.rarity] || "#aaa"}44` }}
                >
                  {project.rarity}
                </div>
              )}

              {/* NEW badge — sits below the rarity badge on fresh drops */}
              {project.isNew && (
                <div className="absolute top-11 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{
                    background: "linear-gradient(135deg, #30d158, #00d4ff)",
                    color: "#0f0825",
                    boxShadow: "0 0 14px rgba(48,209,88,0.45)",
                  }}
                >
                  ✨ New
                </div>
              )}

              {/* Unlock requirement badge (Prestige tier) — top-right */}
              {project.unlock && (
                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{
                    background: "linear-gradient(135deg, #a259ff, #ffd700)",
                    color: "#0f0825",
                    boxShadow: "0 0 14px rgba(162,89,255,0.45)",
                  }}
                >
                  👑 {project.unlock}
                </div>
              )}

              {/* Image / Character */}
              <div className="relative aspect-[3/2] overflow-hidden flex items-center justify-center"
                style={{ background: project.category === "Characters" ? `radial-gradient(circle, ${project.glow}15, var(--color-surface))` : undefined }}
              >
                {project.category === "Characters" && project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-[82%] w-auto max-w-[95%] object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    style={{ filter: `drop-shadow(0 0 15px ${project.glow}66)` }}
                  />
                ) : project.category === "Backgrounds" && project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                ) : project.category === "Backgrounds" ? (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">{project.emoji}</span>
                    <span className="text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-full"
                      style={{ background: "rgba(191,90,242,0.15)", color: "#bf5af2", border: "1px solid rgba(191,90,242,0.3)" }}
                    >
                      Coming Soon
                    </span>
                  </div>
                ) : null}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #0f0825, transparent 40%)" }} />

                {/* Category tag */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full font-bold"
                    style={{ background: `${project.glow}20`, color: project.glow, border: `1px solid ${project.glow}30` }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Multiplier badge for characters */}
                {project.mult && (
                  <div className="absolute bottom-3 right-4 text-lg font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: project.glow, textShadow: `0 0 10px ${project.glow}` }}
                  >
                    {project.mult}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 pt-2 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/35">{project.description}</p>
                </div>
                {project.category === "Backgrounds" && project.image && (
                  <a
                    href={project.image}
                    download
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
                      transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      hover:scale-110 active:scale-90"
                    style={{
                      background: `${project.glow}20`,
                      color: project.glow,
                      border: `1px solid ${project.glow}30`,
                    }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Save
                  </a>
                )}
              </div>

              {/* Bottom glow line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${project.glow}, transparent)`, boxShadow: `0 0 12px ${project.glow}` }}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
            >
              ← Prev
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className="w-9 h-9 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-110"
                  style={{
                    background: page === i ? "linear-gradient(135deg, #00d4ff, #bf5af2)" : "rgba(255,255,255,0.06)",
                    border: page === i ? "none" : "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
