"use client";

import { useState } from "react";
import Navbar from "../component/navbar";

interface SEOResult {
  seo_score: number;
  title_status: string;
  meta_description: string;
  h1_tags: string[];
  images_without_alt: number;
}

export default function SEOPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  const analyzeSEO = async () => {
    if (!url) {
      alert("Enter a valid URL");
      return;
    }

    try {
      setLoading(true);

      const [seoRes, recRes] = await Promise.all([
        fetch(`https://seo-audit-tool-jifd.onrender.com/seo-audit?url=${url}`),
        fetch(`https://seo-audit-tool-jifd.onrender.com/recommendations?url=${url}`)
      ]);

      const seoData = await seoRes.json();
      const recData = await recRes.json();

      setResult(seoData.data);
      setTips(recData.tips || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white pt-24 px-4">

      <Navbar />

      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-2">
          SEO Audit 🔍
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Get a complete SEO health report in seconds
        </p>

        {/* INPUT */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="https://yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-white/10 border border-white/10 outline-none placeholder:text-gray-400"
          />

          <button
            onClick={analyzeSEO}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-4 rounded-xl font-semibold transition hover:scale-105"
          >
            {loading ? "Analyzing..." : "Analyze SEO"}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-indigo-400 mt-6 animate-pulse">
            Scanning website...
          </p>
        )}

        {/* EMPTY */}
        {!result && !loading && (
          <p className="text-center text-gray-500 mt-6">
            Enter a URL to start analysis 🚀
          </p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-6">

            {/* SCORE */}
            <div className="bg-white/5 p-6 rounded-2xl text-center">
              <p className="text-gray-400">SEO Score</p>

              <h2 className={`text-6xl font-bold ${getScoreColor(result.seo_score)}`}>
                {result.seo_score}
              </h2>

              <p className="text-gray-400 mt-2">
                {result.seo_score >= 80
                  ? "Excellent Optimization"
                  : result.seo_score >= 50
                  ? "Needs Improvement"
                  : "Poor SEO"}
              </p>
            </div>

            {/* DETAILS */}
            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400">Title Status</p>
                <p className="text-xl font-semibold">{result.title_status}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400">Images Missing Alt</p>
                <p className="text-xl font-semibold">{result.images_without_alt}</p>
              </div>

            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-gray-400">Meta Description</p>
              <p>{result.meta_description}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-gray-400">H1 Tags</p>
              <p>{result.h1_tags.join(", ") || "None Found"}</p>
            </div>

            {/* RECOMMENDATIONS */}
            {tips.length > 0 && (
              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                <p className="text-indigo-300 mb-2 font-semibold">
                  Recommendations
                </p>

                <ul className="list-disc ml-5 space-y-1 text-gray-300">
                  {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
