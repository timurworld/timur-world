"use client";

import { useAlbumContext } from "../context/AlbumContext";

export default function AlbumReward() {
  const { showReward, dismissReward } = useAlbumContext();

  if (!showReward) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm" onClick={dismissReward}>
      <div
        className="relative bg-white rounded-[24px] p-10 max-w-md mx-4 text-center card-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="holo rounded-[20px] p-[3px] inline-block mb-6">
          <div className="bg-white rounded-[18px] px-6 py-4">
            <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold holo-text">
              ALBUMHERO
            </span>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink mb-2">
          You met the whole crew!
        </h2>
        <p className="text-pencil text-sm mb-6">
          Use the code above in Brainrot Clicker for a special reward.
        </p>
        <button
          onClick={dismissReward}
          className="px-6 py-3 rounded-full bg-ink text-white font-[family-name:var(--font-display)] font-bold text-sm hover:bg-ink/90 transition-colors"
        >
          Nice!
        </button>
      </div>
    </div>
  );
}
