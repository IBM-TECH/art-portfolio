"use client";
import Link from "next/link";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#101113]/85 text-white backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <a
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
<div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sm font-bold text-white">
  L
</div>


          <span className="text-sm font-bold tracking-[-0.01em]">
            Luqss Arts
          </span>
        </a>

        {/* Desktop navigation */}
<nav className="hidden items-center gap-8 md:flex">
  <Link
    href="/"
    className="text-sm text-white transition-colors"
  >
    Home
  </Link>

  <Link
    href="/#work"
    className="text-sm text-white/45 transition-colors hover:text-white"
  >
    Work
  </Link>

  <Link
    href="/#about"
    className="text-sm text-white/45 transition-colors hover:text-white"
  >
    About
  </Link>

  <Link
    href="/#contact"
    className="text-sm text-white/45 transition-colors hover:text-white"
  >
    Contact
  </Link>
</nav>



        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 md:hidden"
        >
          {menuOpen ? (
            <X size={21} strokeWidth={1.8} />
          ) : (
            <Menu size={21} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-white/[0.06] bg-[#f7f7f5] px-6 py-5 md:hidden">
          <div className="flex flex-col">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/[0.06] py-4 text-lg font-medium last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
