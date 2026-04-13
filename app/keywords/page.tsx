"use client";

import { useState } from "react";
import Navbar from "../component/navbar";

export default function KeywordPage() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/keyword-density?url=${url}&keyword=${keyword}`
    );
    const data = await res.json();
    setResult(data.data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-24">
      
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <input
          className="w-full p-4 rounded-xl bg-white/20 mb-4"
          placeholder="Enter URL"
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-xl bg-white/20"
          placeholder="Enter Keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          onClick={analyze}
          className="mt-4 bg-purple-500 px-6 py-3 rounded-xl"
        >
          Analyze Keyword
        </button>

        {result && (
          <div className="mt-6">
            <p>Total Words: {result.total_words}</p>
            <p>Keyword Count: {result.keyword_count}</p>
            <p>Density: {result.keyword_density}</p>
          </div>
        )}
      </div>
    </main>
  );
}