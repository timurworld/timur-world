"use client";

import { characters, SERIES_META, SEASONAL_SERIES, isSeasonal, type Series } from "../data/characters";
import { useAlbumContext } from "../context/AlbumContext";

const releasedChars = characters.filter((c) => c.status === "released" && !c.hidden);
// The core album is what ALBUMHERO unlocks. Limited seasonal collections get
// their own completion row so they never dilute the core bar.
const coreChars = releasedChars.filter((c) => !isSeasonal(c.series));

export default function AlbumProgress() {
  const { collected, mounted } = useAlbumContext();

  if (!mounted) return null;

  const collectedCount = coreChars.filter((c) => collected.has(c.slug)).length;
  const total = coreChars.length;

  const seriesCounts: { series: Series; count: number; total: number }[] = [];
  const seriesKeys = (Object.keys(SERIES_META) as Series[]).filter((s) => !isSeasonal(s));
  for (const s of seriesKeys) {
    const inSeries = coreChars.filter((c) => c.series === s);
    const collectedInSeries = inSeries.filter((c) => collected.has(c.slug)).length;
    if (inSeries.length > 0) {
      seriesCounts.push({ series: s, count: collectedInSeries, total: inSeries.length });
    }
  }

  // Seasonal albums: only shown once the visitor has met someone from them.
  const seasonalAlbums = SEASONAL_SERIES.map((s) => {
    const inSeries = releasedChars.filter((c) => c.series === s);
    return {
      series: s,
      count: inSeries.filter((c) => collected.has(c.slug)).length,
      total: inSeries.length,
    };
  }).filter((a) => a.total > 0 && a.count > 0);

  if (collectedCount === 0 && seasonalAlbums.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      {collectedCount > 0 && (
        <div>
          <p className="text-sm text-pencil font-semibold mb-2">
            You&apos;ve met {collectedCount} of {total}
          </p>
          <div className="flex h-2.5 rounded-full overflow-hidden bg-ink/[0.06]">
            {seriesCounts.map((sc) => {
              const pct = (sc.count / total) * 100;
              if (pct === 0) return null;
              return (
                <div
                  key={sc.series}
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: SERIES_META[sc.series].color,
                  }}
                  title={`${SERIES_META[sc.series].label}: ${sc.count}/${sc.total}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {seasonalAlbums.map((a) => {
        const complete = a.count === a.total;
        return (
          <div key={a.series}>
            <p className="text-sm text-pencil font-semibold mb-2">
              {SERIES_META[a.series].label} album — {a.count} of {a.total}
              {complete && <span className="ml-1.5">complete</span>}
            </p>
            <div className="flex h-2.5 rounded-full overflow-hidden bg-ink/[0.06]">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${(a.count / a.total) * 100}%`,
                  background:
                    a.series === "halloweenini"
                      ? "linear-gradient(100deg, #FF7A1A, #5B2A86)"
                      : SERIES_META[a.series].color,
                }}
                title={`${SERIES_META[a.series].label}: ${a.count}/${a.total}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
