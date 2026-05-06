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
  const [error, setError] = useState("");

  const analyzeLinks = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch(
        `https://seo-audit-tool-jifd.onrender.com/broken-links?url=${url}`
      );

      const data = await res.json();
      setResult(data.data);

    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getHealthStatus = (count: number) => {
    if (count === 0) return "Excellent ✅";
    if (count <= 5) return "Needs Attention ⚠️";
    return "Poor ❌";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white pt-24 px-4">

      <Navbar />

      <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-semibold text-center mb-2">
          Broken Links Checker 🔗
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Identify and fix broken links to improve SEO and UX.
        </p>

        {/* INPUT */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={analyzeLinks}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? "Checking..." : "Check Links"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-center mt-4">{error}</p>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-center text-purple-300 mt-6 animate-pulse">
            Scanning links... 🚀
          </p>
        )}

        {/* EMPTY */}
        {!result && !loading && !error && (
          <p className="text-center text-gray-500 mt-6">
            Enter a URL to analyze broken links
          </p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-5">

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Total Links</p>
                <h2 className="text-2xl font-bold">{result.total_links}</h2>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Broken Links</p>
                <h2 className="text-2xl font-bold text-red-400">
                  {result.broken_count}
                </h2>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Health</p>
                <h2 className="text-lg font-semibold">
                  {getHealthStatus(result.broken_count)}
                </h2>
              </div>

            </div>

            {/* LIST */}
            <div className="bg-white/5 p-4 rounded-xl max-h-64 overflow-y-auto">
              <p className="text-gray-400 mb-2">Broken URLs</p>

              {result.broken_links.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {result.broken_links.map((link, i) => (
                    <li
                      key={i}
                      className="text-red-300 break-all border-b border-white/10 pb-1"
                    >
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
