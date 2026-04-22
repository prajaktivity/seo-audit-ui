"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 text-white">
        
        <h1 className="font-bold text-xl">SEO Tool 🚀</h1>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/seo-audit">SEO Audit</Link>
          <Link href="/keyword-density">Keyword</Link>
          <Link href="/broken-links">Broken Links</Link>
        </div>

      </div>
    </nav>
  );
}