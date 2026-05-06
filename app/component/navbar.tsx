"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (path: string) =>
    `block py-2 ${
      pathname === path
        ? "text-purple-400 font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          RankLens 🚀
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/seo-audit" className={linkClass("/seo-audit")}>SEO Audit</Link>
          <Link href="/keywords" className={linkClass("/keywords")}>Keyword</Link>
          <Link href="/broken-links" className={linkClass("/broken-links")}>Links</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/90 px-6 pb-4 text-white space-y-2">
          <Link href="/" className={linkClass("/")} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/seo-audit" className={linkClass("/seo-audit")} onClick={() => setOpen(false)}>SEO Audit</Link>
          <Link href="/keywords" className={linkClass("/keywords")} onClick={() => setOpen(false)}>Keyword</Link>
          <Link href="/broken-links" className={linkClass("/broken-links")} onClick={() => setOpen(false)}>Links</Link>
        </div>
      )}
    </nav>
  );
}
