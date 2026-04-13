"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Play", href: "#play" },
  { label: "See Creations", href: "#projects" },
  { label: "About Timur", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        background: scrolled
          ? "rgba(15, 8, 37, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-white/90 hover:text-white transition-colors duration-300"
        >
          <span className="gradient-text">TIMUR</span>
          <span className="text-white/40">.world</span>
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white/50
                transition-all duration-300 hover:text-white hover:bg-white/[0.06]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
