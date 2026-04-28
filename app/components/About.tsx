"use client";

import { useReveal } from "../hooks/useReveal";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute top-[5%] left-[-5%] w-[45%] h-[55%] rounded-full bg-neon-blue/[0.06] blur-[140px]" />
        <div className="absolute bottom-[5%] right-[0%] w-[40%] h-[50%] rounded-full bg-neon-yellow/[0.05] blur-[120px]" />
      </div>
      <div className="absolute inset-0 grain" />
      <div className="absolute top-0 left-[5%] right-[5%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(191,90,242,0.15), transparent)" }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="reveal mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
            style={{ background: "rgba(255,226,61,0.1)", border: "1px solid rgba(255,226,61,0.2)" }}
          >
            <span className="text-lg">⚡</span>
            <span className="text-neon-yellow">About</span>
          </span>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          {/* Text — 3 cols */}
          <div className="md:col-span-3">
            <h2 className="reveal font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-8">
              Hockey player by day.
              <br />
              <span className="gradient-text">Game creator by night.</span>
            </h2>

            <div className="reveal space-y-5 text-white/50 text-lg leading-[1.8]">
              <p>
                Hi, I&apos;m Timur and I&apos;m 9 years old. I run a small design studio
                dedicated to making fun, imaginative visuals for kids. From unique
                game backgrounds to quirky character designs, every piece is crafted
                to spark wonder and joy.
              </p>
              <p>
                Creating is my passion — whether it&apos;s backgrounds,
                character designs, or interactive games. I love sharing what I
                make with other kids and bringing ideas to life with bold colors
                and playful energy.
              </p>
            </div>

            {/* Identity cards */}
            <div className="reveal grid grid-cols-2 gap-4 mt-10 stagger">
              <div className="reveal neon-card rounded-2xl p-6 group cursor-default"
                style={{ background: "var(--color-surface)", border: "1px solid rgba(0,212,255,0.15)" }}
              >
                <div className="text-3xl mb-3">🏒</div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-1">
                  Hockey Player
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Speed, teamwork, and clutch plays on the ice.
                </p>
              </div>
              <div className="reveal neon-card rounded-2xl p-6 group cursor-default"
                style={{ background: "var(--color-surface)", border: "1px solid rgba(191,90,242,0.15)" }}
              >
                <div className="text-3xl mb-3">🎮</div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-1">
                  Game Creator
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Clicker games, brainrot memes, and pixel art.
                </p>
              </div>
              <div className="reveal neon-card rounded-2xl p-6 group cursor-default"
                style={{ background: "var(--color-surface)", border: "1px solid rgba(255,45,120,0.15)" }}
              >
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-1">
                  Designer
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Characters, backgrounds, and game worlds.
                </p>
              </div>
              <div className="reveal neon-card rounded-2xl p-6 group cursor-default"
                style={{ background: "var(--color-surface)", border: "1px solid rgba(48,209,88,0.15)" }}
              >
                <div className="text-3xl mb-3">🧱</div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-1">
                  Lego Builder
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Complex 18+ builds. Big sets, big patience.
                </p>
              </div>
            </div>
          </div>

          {/* Visual — 2 cols */}
          <div className="reveal md:col-span-2 relative mt-4">
            <div className="relative rounded-3xl overflow-hidden aspect-square"
              style={{
                border: "2px solid rgba(0,212,255,0.2)",
                boxShadow: "0 0 40px rgba(0,212,255,0.1), 0 0 80px rgba(191,90,242,0.08)",
              }}
            >
              <img
                src="/timur_about.png"
                alt="Timur"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0f0825 0%, transparent 50%)" }} />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "🎯", label: "Goals", sub: "50+" },
                    { value: "🎮", label: "Games", sub: "3" },
                    { value: "🔥", label: "Streak", sub: "MAX" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center rounded-xl py-3 px-2"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-2xl mb-1">{stat.value}</div>
                      <div className="font-[family-name:var(--font-display)] text-sm font-bold text-neon-blue">
                        {stat.sub}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
