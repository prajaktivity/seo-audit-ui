"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{
    seo_score: number;
    title: string;
    meta_description: string;
  } | null>(null);

  const analyzeSEO = async () => {
    const response = await fetch(
      `http://127.0.0.1:8002/seo-audit?url=${url}`
    );

    const data = await response.json();
    setResult(data.data);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6">SEO Audit Tool</h1>

        <input
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={analyzeSEO}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full"
        >
          Analyze SEO
        </button>

        {result && (
          <div className="mt-6">
            <p><strong>SEO Score:</strong> {result.seo_score}</p>
            <p><strong>Title:</strong> {result.title}</p>
            <p><strong>Meta:</strong> {result.meta_description}</p>
          </div>
        )}
      </div>
    </main>
  );
}