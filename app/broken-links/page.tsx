"use client";

import { useState } from "react";
import Navbar from "../component/navbar";

interface BrokenLinksResult {
  total_links: number;
  broken_links: string[];
  broken_count: number;
}

export default function BrokenLinksPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<BrokenLinksResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeLinks = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://seo-audit-tool-jifd.onrender.com/broken-links?url=${url}`
      );
      const data = await res.json();

      setResult(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-24">
      
      {/* Navbar */}
      <Navbar />

      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Broken Links Checker 🔗
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Find broken links on your website instantly.
        </p>

        {/* INPUT */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-white/20 border border-white/20 outline-none placeholder:text-gray-300"
          />

          <button
            onClick={analyzeLinks}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            {loading ? "Checking..." : "Check Links"}
          </button>
        </div>

        {/* EMPTY STATE */}
        {!result && !loading && (
          <p className="text-center text-gray-400 mt-6">
            Enter a URL and click Check Links 🔍
          </p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-4">

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300">Total Links</p>
                <h2 className="text-3xl font-bold">
                  {result.total_links}
                </h2>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300">Broken Links</p>
                <h2 className="text-3xl font-bold text-red-400">
                  {result.broken_count}
                </h2>
              </div>

            </div>

            {/* LIST */}
            <div className="bg-white/10 p-4 rounded-xl max-h-60 overflow-y-auto">
              <p className="text-gray-300 mb-2">Broken URLs</p>

              {result.broken_links.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {result.broken_links.map((link, i) => (
                    <li key={i} className="break-all text-red-300">
                      {link}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-400">
                  No broken links found 🎉
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}