"use client";

import { characters, SERIES_META, type Series } from "../data/characters";
import { useAlbumContext } from "../context/AlbumContext";

const releasedChars = characters.filter((c) => c.status === "released" && !c.hidden);

export default function AlbumProgress() {
  const { collected, mounted } = useAlbumContext();

  if (!mounted) return null;

  const collectedCount = releasedChars.filter((c) => collected.has(c.slug)).length;
  const total = releasedChars.length;

  const seriesCounts: { series: Series; count: number; total: number }[] = [];
  const seriesKeys = Object.keys(SERIES_META) as Series[];
  for (const s of seriesKeys) {
    const inSeries = releasedChars.filter((c) => c.series === s);
    const collectedInSeries = inSeries.filter((c) => collected.has(c.slug)).length;
    if (inSeries.length > 0) {
      seriesCounts.push({ series: s, count: collectedInSeries, total: inSeries.length });
    }
  }

  if (collectedCount === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm text-pencil font-semibold mb-2">
        You've met {collectedCount} of {total}
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
  );
}
