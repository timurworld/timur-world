"use client";

import Image from "next/image";

const GAME_URL = "https://game.timur.world";

const games = [
  { title: "Brainrot\nClicker", description: "Click. Collect. Unlock the whole universe.", url: GAME_URL, live: true, color: "#FF4D7D", cover: "/banner.jpg", num: "01" },
  { title: "TimurWorld\nHockey", description: "Hit the ice with the Hockey Bros.", url: "#", live: false, color: "#2F7CFF", cover: "/sportini_banner.png", num: "02" },
];

export default function Worlds() {
  return (
    <section id="worlds" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight">
            Where the crew comes alive.
          </h2>
          <p className="text-pencil mt-3 text-lg">Pick a world and start playing.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {games.map((game) => (
            <a
              key={game.num}
              href={game.live ? game.url : undefined}
              target={game.live ? "_blank" : undefined}
              rel={game.live ? "noopener noreferrer" : undefined}
              className={`group relative rounded-2xl overflow-hidden transition-transform duration-200
                ${game.live ? "hover:scale-[1.02] cursor-pointer" : "cursor-default"}`}
              style={{ border: `3px solid ${game.color}` }}
            >
              <div className="bg-white flex flex-col">
                {/* Cover art */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={game.cover}
                    alt={`${game.title.replace("\n", " ")} cover`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${game.live ? "" : "saturate-[0.6] opacity-90"}`}
                  />
                  {/* Status badge over the art */}
                  <div className="absolute top-3 left-3">
                    {game.live ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-ink">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-white/90 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-pencil">Coming Soon</span>
                    )}
                  </div>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 font-[family-name:var(--font-collector)] text-xs text-pencil">{game.num}</span>
                </div>

                {/* Bottom */}
                <div className="p-8 md:p-10 pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-ink leading-tight whitespace-pre-line">
                    {game.title}
                  </h3>
                  <p className="text-pencil text-sm mt-2">{game.description}</p>

                  <div className="mt-6">
                    {game.live ? (
                      <span className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-ink text-white font-[family-name:var(--font-collector)] text-xs font-bold uppercase tracking-wider group-hover:bg-ink/90 transition-colors">
                        Play Now
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-ink/[0.04] text-pencil font-[family-name:var(--font-collector)] text-xs font-bold uppercase tracking-wider">
                        Get Ready
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
