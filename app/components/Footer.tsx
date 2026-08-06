import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
          TIMUR<span className="text-[#FF4D7D]">.</span>WORLD
        </p>
        <p className="text-white/40 text-sm mt-2">
          A small universe with very big ideas.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <Link href="/#characters" className="text-sm text-white/50 hover:text-white transition-colors">Characters</Link>
          <Link href="/worlds" className="text-sm text-white/50 hover:text-white transition-colors">Worlds</Link>
          <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">About Timur</Link>
          <Link href="/about#parents" className="text-sm text-white/50 hover:text-white transition-colors">Parents</Link>
        </div>

        <p className="text-white/20 text-xs mt-10">
          &copy; {new Date().getFullYear()} Timur.World · All characters are original creations.
        </p>
      </div>
    </footer>
  );
}
