"use client";

import Image from "next/image";
import { useState } from "react";
import { Character, SERIES_META, isNew, TOTAL_ROSTER, type Series } from "../data/characters";
import { useFoilTilt } from "../hooks/useFoilTilt";
import { useAlbumContext } from "../context/AlbumContext";

const RARITY_LABELS: Record<string, string> = {
  standard: "Standard", rare: "Rare", legendary: "Legendary", secret: "Secret",
  limited: "Limited", mythic: "Mythic", prestige: "Prestige", og: "OG",
};

const HIGH_RARITY = new Set(["legendary", "mythic", "secret", "limited", "prestige"]);

function seriesColor(s: Series) { return SERIES_META[s].color; }

function NewStamp() {
  return (
    <span
      className="absolute top-3 left-3 z-10 px-2.5 py-1 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-white rounded-sm"
      style={{
        background: "linear-gradient(135deg, #7DF0FF, #B98CFF)",
        transform: "rotate(-3deg)",
        backfaceVisibility: "hidden",
      }}
    >
      New
    </span>
  );
}

function TodayStamp({ stacked }: { stacked: boolean }) {
  return (
    <span
      className={`absolute ${stacked ? "top-11" : "top-3"} left-3 z-10 flex items-center gap-1 px-2.5 py-1 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-ink rounded-sm`}
      style={{
        background: "linear-gradient(135deg, #FFD37D, #FFB01F)",
        transform: "rotate(-3deg)",
        backfaceVisibility: "hidden",
      }}
      title="Character of the Day"
    >
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6z" />
      </svg>
      Today
    </span>
  );
}

function CollectorNum({ number }: { number: number }) {
  return (
    <span className="collector-num">
      No. {String(number).padStart(3, "0")}
    </span>
  );
}

function ActionButtons({ character }: { character: Character }) {
  if (!character.spriteUrl && !character.sketchUrl) return null;

  function stopFlip(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div className="flex gap-1.5 mt-2" onClick={stopFlip} onMouseDown={stopFlip}>
      {character.sketchUrl && (
        <button
          onClick={(e) => { stopFlip(e); window.open(`/print/${character.slug}`, "_blank"); }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-ink bg-ink/[0.06] hover:bg-ink/[0.12] transition-colors"
          title="Print coloring page"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      )}
      {character.spriteUrl && (
        <a
          href={character.spriteUrl}
          download={`${character.slug}.png`}
          onMouseDown={stopFlip}
          onClick={(e) => {
            stopFlip(e);
            // Force an immediate download rather than navigating to the image.
            fetch(character.spriteUrl!)
              .then((r) => r.blob())
              .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${character.slug}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              })
              .catch(() => window.open(character.spriteUrl!, "_blank"));
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-ink bg-ink/[0.06] hover:bg-ink/[0.12] transition-colors"
          title="Download character"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save
        </a>
      )}
    </div>
  );
}

function InfoBar({ character, color }: { character: Character; color: string }) {
  return (
    <div className="px-4 py-3 border-t border-ink/[0.06]">
      <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-ink leading-tight truncate">
        {character.name}
      </h3>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="series-badge" style={{ background: color }}>
          {SERIES_META[character.series].label}
        </span>
        <span className="text-xs text-pencil font-semibold capitalize">
          {RARITY_LABELS[character.rarity]}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SECRET card — silhouette + mystery
// ═══════════════════════════════════════════
function SecretCard({ character, dropsSoon }: { character: Character; dropsSoon: boolean }) {
  const color = seriesColor(character.series);
  return (
    <div
      className="relative rounded-[20px] bg-white card-shadow overflow-hidden group"
      style={{ borderLeft: `3px solid ${color}40` }}
    >
      <div className="aspect-[3/4] flex flex-col items-center justify-center gap-3 bg-ink/[0.02] relative overflow-hidden">
        <span className="font-[family-name:var(--font-display)] text-6xl text-ink/10">?</span>
        <CollectorNum number={character.number} />
        {dropsSoon && (
          <span
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider rounded-sm"
            style={{
              background: "linear-gradient(135deg, #7DF0FF, #B98CFF, #FFD37D)",
              color: "#1C1B22",
              transform: "translateX(-50%) rotate(-2deg)",
            }}
          >
            Drops Soon
          </span>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none holo-shimmer" />
      </div>
      <div className="px-4 py-3 border-t border-ink/[0.06]">
        <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-pencil/40">???</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="series-badge" style={{ background: color, opacity: 0.4 }}>
            {SERIES_META[character.series].label}
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SKETCH card — pencil sketch as front face
// ═══════════════════════════════════════════
function SketchCard({ character }: { character: Character }) {
  const color = seriesColor(character.series);
  return (
    <div
      className="relative rounded-[20px] bg-white card-shadow overflow-hidden hover-lift"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="aspect-[3/4] notebook-paper relative flex items-center justify-center overflow-hidden">
        {character.sketchUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={character.sketchUrl}
              alt={`${character.name} sketch`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-6"
            />
          </div>
        ) : (
          <span className="text-5xl opacity-30">✏️</span>
        )}

        <span className="absolute top-3 right-3">
          <CollectorNum number={character.number} />
        </span>

        {isNew(character) && <NewStamp />}

        <span
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider bg-ink/80 text-white rounded-sm whitespace-nowrap"
          style={{ transform: "translateX(-50%) rotate(-2deg)" }}
        >
          In the Sketchbook
        </span>
      </div>

      <div className="px-4 py-3 border-t border-ink/[0.06]">
        <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-ink leading-tight truncate">
          {character.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="series-badge" style={{ background: color }}>
            {SERIES_META[character.series].label}
          </span>
          <span className="text-xs text-pencil italic">Sprite in progress</span>
        </div>
        <ActionButtons character={character} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// RELEASED card — sprite front / sketch back flip
// ═══════════════════════════════════════════
function ReleasedCard({
  character,
  flipped,
  onToggle,
  isToday = false,
}: {
  character: Character;
  flipped: boolean;
  onToggle: (slug: string) => void;
  isToday?: boolean;
}) {
  const [slapAnim, setSlapAnim] = useState(false);
  const color = seriesColor(character.series);
  const isHighRarity = HIGH_RARITY.has(character.rarity);
  const isSeasonal = character.series === "summerini";
  const foil = useFoilTilt(isHighRarity && !flipped);
  const { collected, collect } = useAlbumContext();
  const isCollected = collected.has(character.slug);

  function handleFlip() {
    if (!flipped) {
      const wasNew = collect(character.slug);
      if (wasNew) {
        setSlapAnim(true);
        setTimeout(() => setSlapAnim(false), 400);
      }
    }
    onToggle(character.slug);
  }

  return (
    <div
      ref={foil.ref}
      className={`flip-card cursor-pointer ${flipped ? "flipped" : ""} ${slapAnim ? "animate-slap" : ""}`}
      onClick={handleFlip}
      onPointerMove={foil.onPointerMove}
      onPointerLeave={foil.onPointerLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
      style={foil.style}
    >
      <div className="aspect-[3/4] relative">
        <div className="flip-card-inner">
          {/* ── Front: Sprite ── */}
          <div
            className="flip-card-front bg-white card-shadow flex flex-col"
            style={{
              borderLeft: `3px solid ${color}`,
              outline: isSeasonal ? "2px solid transparent" : undefined,
              outlineOffset: isSeasonal ? "-2px" : undefined,
              backgroundImage: isSeasonal ? "linear-gradient(white, white), linear-gradient(135deg, #7DF0FF, #B98CFF, #FFD37D)" : undefined,
              backgroundOrigin: isSeasonal ? "border-box" : undefined,
              backgroundClip: isSeasonal ? "padding-box, border-box" : undefined,
              border: isSeasonal ? "2px solid transparent" : undefined,
            }}
          >
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={character.spriteUrl!}
                  alt={character.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-5"
                  style={{ filter: `drop-shadow(0 4px 12px ${color}22)` }}
                />
              </div>

              {/* Foil glare overlay */}
              {isHighRarity && (
                <div className="absolute inset-0 pointer-events-none rounded-[20px]" style={foil.glareStyle} />
              )}

              <span className="absolute top-3 right-3">
                <CollectorNum number={character.number} />
              </span>

              {isNew(character) && <NewStamp />}

              {isToday && <TodayStamp stacked={isNew(character)} />}

              {isCollected && (
                <span className="absolute bottom-3 left-3 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </span>
              )}
            </div>

            <InfoBar character={character} color={color} />
          </div>

          {/* ── Back: Character profile ── */}
          <div
            className="flip-card-back bg-white flex flex-col card-shadow"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <div className="flex-1 flex flex-col items-center justify-center p-5 gap-3 text-center">
              <span className="series-badge" style={{ background: color }}>
                {SERIES_META[character.series].label}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink leading-tight">
                {character.name}
              </h3>
              {character.facts[0] && (
                <p className="text-sm text-ink/70 italic leading-snug">&ldquo;{character.facts[0]}&rdquo;</p>
              )}
            </div>

            <div className="px-4 py-3 border-t border-ink/[0.08]">
              <div className="flex items-center justify-between">
                <CollectorNum number={character.number} />
                <span className="text-xs text-pencil font-semibold capitalize">
                  {RARITY_LABELS[character.rarity]}
                </span>
              </div>
              <ActionButtons character={character} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Router — picks the right card variant
// ═══════════════════════════════════════════
export default function CharacterCard({
  character,
  dropsSoon = false,
  flipped = false,
  onToggle = () => {},
  isToday = false,
}: {
  character: Character;
  dropsSoon?: boolean;
  flipped?: boolean;
  onToggle?: (slug: string) => void;
  isToday?: boolean;
}) {
  if (character.hidden) return null;

  switch (character.status) {
    case "secret":
      return <SecretCard character={character} dropsSoon={dropsSoon} />;
    case "sketch":
      return <SketchCard character={character} />;
    case "released":
      return <ReleasedCard character={character} flipped={flipped} onToggle={onToggle} isToday={isToday} />;
  }
}
