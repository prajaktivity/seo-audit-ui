"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `transition ${
      pathname === path
        ? "text-purple-400 font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-white">
          RankLens 🚀
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
          <Link href="/seo-audit" className={linkClass("/seo-audit")}>SEO Audit</Link>
          <Link href="/keyword-density" className={linkClass("/keyword-density")}>Keyword</Link>
          <Link href="/broken-links" className={linkClass("/broken-links")}>Links</Link>
        </div>

        {/* CTA BUTTON */}
        <Link
          href="/dashboard"
          className="hidden md:block bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition"
        >
          Try Now
        </Link>

      </div>
    </nav>
  );
}