"use client";

import { useState } from "react";
import Navbar from "../component/navbar";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    try {
      setLoading(true);
      setData(null);

      const [seoRes, recRes, keywordRes, linkRes] = await Promise.all([
        fetch(`http://127.0.0.1:8000/seo-audit?url=${url}`),
        fetch(`http://127.0.0.1:8000/recommendations?url=${url}`),
        fetch(`http://127.0.0.1:8000/keyword-density?url=${url}&keyword=seo`),
        fetch(`http://127.0.0.1:8000/broken-links?url=${url}`)
      ]);

      const seo = await seoRes.json();
      const rec = await recRes.json();
      const keyword = await keywordRes.json();
      const links = await linkRes.json();

      setData({
        seo: seo.data,
        tips: rec.tips,
        keyword: keyword.data,
        links: links.data
      });

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
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-24 px-4">
      
      <Navbar />

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3">
            Website Health Analyzer 🚀
          </h1>
          <p className="text-gray-300">
            Get complete SEO insights in one click
          </p>
        </div>

        {/* INPUT */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Enter Website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-white/20 border border-white/20"
          />

          <button
            onClick={analyze}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-4 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Website"}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-300">Analyzing your website...</p>
        )}

        {/* RESULTS */}
        {data && (
          <div className="space-y-6">

            {/* SCORE */}
            <div className="bg-white/10 p-6 rounded-2xl text-center">
              <p className="text-gray-300">Overall SEO Score</p>
              <h2 className={`text-5xl font-bold ${getScoreColor(data.seo.seo_score)}`}>
                {data.seo.seo_score}
              </h2>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* SEO */}
              <div className="bg-white/10 p-5 rounded-xl">
                <h3 className="font-semibold mb-3">SEO Overview</h3>
                <p>Title: {data.seo.title_status}</p>
                <p>H1 Tags: {data.seo.h1_tags.length}</p>
                <p>Missing ALT: {data.seo.images_without_alt}</p>
              </div>

              {/* KEYWORD */}
              <div className="bg-white/10 p-5 rounded-xl">
                <h3 className="font-semibold mb-3">Keyword Insights</h3>
                <p>Keyword: {data.keyword.keyword}</p>
                <p>Density: {data.keyword.keyword_density}</p>
              </div>

              {/* LINKS */}
              <div className="bg-white/10 p-5 rounded-xl">
                <h3 className="font-semibold mb-3">Broken Links</h3>
                <p>Total: {data.links.total_links}</p>
                <p className="text-red-400">
                  Broken: {data.links.broken_count}
                </p>
              </div>

              {/* RECOMMENDATIONS */}
              <div className="bg-white/10 p-5 rounded-xl">
                <h3 className="font-semibold mb-3">Recommendations</h3>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {data.tips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}