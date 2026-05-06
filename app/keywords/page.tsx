"use client";

import { useState } from "react";
import Navbar from "../component/navbar";

export default function KeywordPage() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!url || !keyword) {
      alert("Enter URL and keyword");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://seo-audit-tool-jifd.onrender.com/keyword-density?url=${url}&keyword=${keyword}`
      );

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getDensityColor = (density: number) => {
    if (density < 1) return "text-red-400";
    if (density <= 2) return "text-green-400";
    return "text-yellow-400";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white pt-24 px-4">

      <Navbar />

      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Keyword Analyzer 🔍
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Measure keyword usage and optimize for better ranking
        </p>

        {/* INPUT */}
        <div className="space-y-4">

          <input
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none placeholder:text-gray-400"
            placeholder="https://yourwebsite.com"
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none placeholder:text-gray-400"
            placeholder="Enter target keyword..."
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button
            onClick={analyze}
            className="w-full bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            {loading ? "Analyzing..." : "Analyze Keyword"}
          </button>

        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-indigo-400 mt-6 animate-pulse">
            Checking keyword density...
          </p>
        )}

        {/* EMPTY */}
        {!result && !loading && (
          <p className="text-center text-gray-500 mt-6">
            Enter a URL and keyword to get insights 🚀
          </p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-6">

            <div className="grid md:grid-cols-2 gap-4">

              {/* COUNT */}
              <div className="bg-white/5 p-6 rounded-xl">
                <p className="text-gray-400">Keyword Count</p>
                <h2 className="text-3xl font-bold mt-2">
                  {result.keyword}
                </h2>
              </div>

              {/* DENSITY */}
              <div className="bg-white/5 p-6 rounded-xl">
                <p className="text-gray-400">Keyword Density</p>

                <h2 className={`text-3xl font-bold mt-2 ${getDensityColor(result.density)}`}>
                  {result.density}%
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {result.density < 1
                    ? "Too low — add keyword naturally"
                    : result.density <= 2
                    ? "Good optimization"
                    : "Overused — reduce repetition"}
                </p>
              </div>

            </div>

            {/* INSIGHT BOX */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
              <p className="text-indigo-300 font-semibold mb-2">
                Insight
              </p>

              <p className="text-gray-300 text-sm">
                {result.density < 1 &&
                  "Your keyword usage is too low. Try adding it in headings, meta description, and first 100 words."}
                {result.density >= 1 && result.density <= 2 &&
                  "Great! Your keyword density is well balanced for SEO."}
                {result.density > 2 &&
                  "Your keyword is overused. This may hurt SEO. Reduce repetition and keep content natural."}
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
