"use client";

import { useState, useEffect } from "react";
import { characters, SERIES_META, characterOfTheDay, type Series } from "../data/characters";
import { useAlbumContext } from "../context/AlbumContext";
import CharacterCard from "./CharacterCard";
import AlbumProgress from "./AlbumProgress";
import CollectionStrip from "./CollectionStrip";

const seriesKeys: (Series | "all")[] = ["all", "lovini", "partini", "hockini", "fidgetini", "foodini", "summerini"];

const visibleCharacters = characters.filter((c) => !c.hidden);
const releasedCount = visibleCharacters.filter((c) => c.status === "released").length;
const releasedSlugs = new Set(
  visibleCharacters.filter((c) => c.status === "released").map((c) => c.slug)
);

export default function Roster() {
  const [activeSeries, setActiveSeries] = useState<Series | "all">("all");
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);
  const todaySlug = characterOfTheDay().slug;
  const { collected, triggerReward, rewarded } = useAlbumContext();

  // Only one card open at a time; clicking the same card closes it.
  const handleToggle = (slug: string) =>
    setFlippedSlug((cur) => (cur === slug ? null : slug));

  // Deep-link: #char-<slug> reveals that character (used by "Character of the Day").
  useEffect(() => {
    const openFromHash = () => {
      const m = window.location.hash.match(/^#char-(.+)$/);
      if (!m) return;
      const slug = decodeURIComponent(m[1]);
      if (!visibleCharacters.some((c) => c.slug === slug)) return;
      setActiveSeries("all"); // make sure it isn't filtered out
      setFlippedSlug(slug);
      requestAnimationFrame(() => {
        document
          .getElementById(`char-${slug}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Close the open card when clicking anywhere outside a card.
  useEffect(() => {
    if (!flippedSlug) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest(".flip-card")) setFlippedSlug(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFlippedSlug(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [flippedSlug]);

  useEffect(() => {
    if (rewarded) return;
    const allCollected = [...releasedSlugs].every((slug) => collected.has(slug));
    if (allCollected && collected.size >= releasedSlugs.size) {
      triggerReward();
    }
  }, [collected, triggerReward, rewarded]);

  const filtered = activeSeries === "all"
    ? visibleCharacters
    : visibleCharacters.filter((c) => c.series === activeSeries);

  const sorted = [...filtered].sort((a, b) => {
    // Secrets always at the end
    if (a.status === "secret" && b.status !== "secret") return 1;
    if (b.status === "secret" && a.status !== "secret") return -1;
    // Newest first for everything else
    return b.number - a.number;
  });

  const secretsByNumber = sorted
    .filter((c) => c.status === "secret")
    .sort((a, b) => a.number - b.number)
    .slice(0, 3)
    .map((c) => c.slug);

  return (
    <section id="characters" className="relative pt-10 md:pt-14 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4D7D]">
            The Roster
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight mt-3">
            Meet the whole crew.
          </h2>
          <p className="text-pencil mt-3 text-lg">
            Every character started as an idea in Timur's sketchbook.
          </p>
          <AlbumProgress />
        </div>

        {/* Collection banner strip */}
        <div className="mb-6">
          <CollectionStrip active={activeSeries} onSelect={setActiveSeries} />
        </div>

        {/* Text filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {seriesKeys.map((key) => {
            const isActive = activeSeries === key;
            const meta = key === "all" ? null : SERIES_META[key];
            const label = key === "all" ? "All" : meta!.label;
            const color = meta?.color || "#1C1B22";
            // Mystery placeholders don't count as characters yet.
            const real = visibleCharacters.filter((c) => c.status !== "secret");
            const count = key === "all"
              ? real.length
              : real.filter((c) => c.series === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveSeries(key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200
                  ${isActive ? "text-white" : "text-pencil hover:text-ink bg-ink/[0.04] hover:bg-ink/[0.08]"}`}
                style={isActive ? { background: color } : undefined}
              >
                {label}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {sorted.map((ch) => (
            <div key={ch.slug} id={`char-${ch.slug}`} className="scroll-mt-28">
              <CharacterCard
                character={ch}
                dropsSoon={secretsByNumber.includes(ch.slug)}
                flipped={flippedSlug === ch.slug}
                onToggle={handleToggle}
                isToday={ch.slug === todaySlug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
