"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#101113]/85 text-white backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand */}
<Link href="/" className="flex items-center gap-3">
<Image
  src="/images/logo.png"
  alt="Luqqss temmy"
  width={36}
  height={36}
  className="h-9 w-9 rounded-lg object-contain"
  priority
/>
  <span className="text-sm font-semibold tracking-[-0.01em]">
    Peak Achievers Team
  </span>
</Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 md:hidden"
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
        <nav className="border-t border-white/[0.06] bg-[#101113] px-6 py-5 md:hidden">
          <div className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/[0.06] py-4 text-lg font-medium text-white/80 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}