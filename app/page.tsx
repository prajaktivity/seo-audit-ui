"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  interface SEOResult {
    seo_score: number;
    title_status: string;
    meta_description: string;
    h1_tags: string[];
    images_without_alt: number;
  }

  const [result, setResult] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSEO = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:8002/seo-audit?url=${url}`
      );

      const data = await response.json();

      setResult(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-2xl text-white">
        
        <h1 className="text-4xl font-bold text-center mb-2">
          SEO Audit Tool 🚀
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Analyze your website SEO instantly with AI-like insights.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-white/20 border border-white/20 outline-none placeholder:text-gray-300"
          />

          <button
            onClick={analyzeSEO}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {result && (
          <div className="mt-10 space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300">SEO Score</p>
                <h2 className="text-2xl font-bold">{result.seo_score}</h2>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300">Title Status</p>
                <h2 className="text-2xl font-bold">{result.title_status}</h2>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-gray-300">Meta Description</p>
              <h2>{result.meta_description}</h2>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-gray-300">H1 Tags</p>
              <h2>{result.h1_tags.join(", ") || "None Found"}</h2>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-gray-300">Images Missing Alt</p>
              <h2>{result.images_without_alt}</h2>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}