import Image from "next/image";

const CONFETTI = [
  { top: "10%", left: "3%",  size: 12, color: "#FF4D7D", rot: "15deg",  shape: "rect" },
  { top: "65%", left: "7%",  size: 9,  color: "#2F7CFF", rot: "-20deg", shape: "circle" },
  { top: "18%", left: "22%", size: 10, color: "#8B5CF6", rot: "30deg",  shape: "rect" },
  { top: "74%", left: "30%", size: 12, color: "#FFFFFF", rot: "-10deg", shape: "circle" },
  { top: "10%", left: "45%", size: 9,  color: "#FF4D7D", rot: "45deg",  shape: "rect" },
  { top: "70%", left: "55%", size: 11, color: "#2F7CFF", rot: "-30deg", shape: "rect" },
  { top: "12%", left: "68%", size: 10, color: "#FFFFFF", rot: "20deg",  shape: "circle" },
  { top: "66%", left: "80%", size: 12, color: "#8B5CF6", rot: "-15deg", shape: "rect" },
  { top: "16%", left: "92%", size: 9,  color: "#FF4D7D", rot: "25deg",  shape: "circle" },
  { top: "78%", left: "95%", size: 10, color: "#2F7CFF", rot: "-25deg", shape: "rect" },
];

const PILLS = [
  { emoji: "🎨", label: "Kid-created",        bg: "#FF4D7D", rot: "-2deg" },
  { emoji: "🚫", label: "No ads",             bg: "#2F7CFF", rot: "2deg" },
  { emoji: "💬", label: "No chat",            bg: "#8B5CF6", rot: "-1.5deg" },
  { emoji: "💙", label: "No pressure to buy", bg: "#1C1B22", rot: "1.5deg" },
];

export default function TrustBanner() {
  return (
    <section
      className="relative py-12 overflow-hidden"
      style={{ background: "linear-gradient(105deg, #FFB01F 0%, #FF9F3D 100%)" }}
    >
      {/* Confetti sprinkle */}
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.shape === "rect" ? c.size * 1.7 : c.size,
            background: c.color,
            borderRadius: c.shape === "circle" ? "999px" : "2px",
            transform: `rotate(${c.rot})`,
            opacity: 0.8,
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Heading */}
        <div className="shrink-0 text-center md:text-left">
          <span className="font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
            A Note for Grown-Ups
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-ink leading-tight mt-1">
            Made for <span className="text-white drop-shadow-[0_3px_0_rgba(28,27,34,0.3)]">fun.</span>
            <br />
            Built with <span className="text-[#FF4D7D] drop-shadow-[0_3px_0_rgba(255,255,255,0.5)]">care.</span>
          </h3>
        </div>

        {/* Colorful trust pills */}
        <div className="flex-1 flex flex-wrap items-center justify-center md:justify-end gap-3 md:pr-24">
          {PILLS.map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-[0_4px_0_rgba(28,27,34,0.25)]"
              style={{ background: pill.bg, transform: `rotate(${pill.rot})` }}
            >
              <span>{pill.emoji}</span>
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      {/* Heartini peeking in from the corner */}
      <div className="hidden md:block absolute -right-4 -bottom-6 w-32 h-36 rotate-[-8deg]">
        <Image
          src="/characters/08_heartini_smilekur.png"
          alt=""
          fill
          sizes="128px"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
