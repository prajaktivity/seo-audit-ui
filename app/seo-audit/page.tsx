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
    try {
      setLoading(true);
      if (!url) {
        alert("Please enter a valid URL");
        return;
      }
  
      const [seoRes, recRes] = await Promise.all([
        fetch(`http://127.0.0.1:8000/seo-audit?url=${url}`),
        fetch(`http://127.0.0.1:8000/recommendations?url=${url}`)
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-24 px-4">

      {/* ✅ Navbar */}
      <Navbar />

      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          SEO Audit Tool 🚀
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Analyze your website SEO instantly with AI-like insights.
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

{loading && (
  <p className="text-center text-purple-300 mt-6 animate-pulse">
    Analyzing website... 🚀
  </p>
)}
        </div>

        {/* EMPTY STATE */}
        {!result && !loading && (
          <p className="text-center text-gray-400 mt-6">
          Paste any website URL to get SEO insights, issues, and recommendations 🚀
        </p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300">SEO Score</p>

                <h2 className={`text-5xl font-bold ${getScoreColor(result.seo_score)}`}>
  {result.seo_score}
</h2>

                <p className="text-sm text-gray-300">
                  {result.seo_score >= 80
                    ? "Good SEO"
                    : result.seo_score >= 50
                    ? "Average SEO"
                    : "Poor SEO"}
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300">Title Status</p>
                <h2 className="text-2xl font-bold">
                  {result.title_status}
                </h2>
              </div>

            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-gray-300">Meta Description</p>
              <p>{result.meta_description}</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-gray-300">H1 Tags</p>
              <p>{result.h1_tags.join(", ") || "None Found"}</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-gray-300">Images Missing Alt</p>
              <p>{result.images_without_alt}</p>
            </div>

            {/* RECOMMENDATIONS */}
            {tips.length > 0 && (
            <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-gray-300 mb-2">Recommendations</p>

                <ul className="list-disc ml-5 space-y-1">
                {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                ))}
                </ul>
            </div>
            )}
          </div>
        )
        
        }

      </div>
    </main>
  );
}