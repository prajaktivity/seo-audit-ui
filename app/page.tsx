"use client";

import Link from "next/link";
import Navbar from "./component/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-20">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Analyze Your Website <br />
          <span className="text-indigo-400">Like a Pro 🚀</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          Get instant SEO insights, keyword analysis, and website health reports — all in one place.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/seo-audit"
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            Start Audit
          </Link>

          <Link
            href="/keywords"
            className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Keyword Tool
          </Link>
        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
          <h3 className="text-xl font-semibold mb-2">SEO Audit</h3>
          <p className="text-gray-400 text-sm">
            Analyze title, meta tags, headings, and overall SEO score.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
          <h3 className="text-xl font-semibold mb-2">Keyword Insights</h3>
          <p className="text-gray-400 text-sm">
            Measure keyword density and optimize for better ranking.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
          <h3 className="text-xl font-semibold mb-2">Broken Links</h3>
          <p className="text-gray-400 text-sm">
            Detect and fix broken links to improve site health.
          </p>
        </div>

      </section>

    </main>
  );
}