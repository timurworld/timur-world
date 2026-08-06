"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-ink/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => {
            // Always land at the very top, even when already on the home page
            // or when the URL carries a #hash from a previous jump.
            if (window.location.pathname === "/") {
              history.replaceState(null, "", "/");
              window.scrollTo({ top: 0 });
            }
          }}
          className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-ink"
        >
          TIMUR<span className="text-lovini">.</span>WORLD
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <Link href="/#characters" className="text-sm font-semibold text-pencil hover:text-ink transition-colors duration-200">
            Characters
          </Link>
          <Link href="/worlds" className="text-sm font-semibold text-pencil hover:text-ink transition-colors duration-200">
            Worlds
          </Link>
          {/* Sketchbook hidden until sketch quality is fixed */}
          <Link href="/about" className="text-sm font-semibold text-pencil hover:text-ink transition-colors duration-200">
            About Timur
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-ink transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-transform duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-ink/[0.06] bg-paper px-6 py-4 flex flex-col gap-3">
          <Link href="/#characters" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-pencil hover:text-ink">
            Characters
          </Link>
          <Link href="/worlds" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-pencil hover:text-ink">
            Worlds
          </Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-pencil hover:text-ink">
            About Timur
          </Link>
        </div>
      )}
    </nav>
  );
}
