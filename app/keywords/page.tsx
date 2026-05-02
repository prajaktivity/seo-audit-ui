"use client";

import { useState } from "react";
import Navbar from "../component/navbar";

export default function KeywordPage() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    const res = await fetch(
      `https://seo-audit-tool-jifd.onrender.com/keyword-density?url=${url}&keyword=${keyword}`
    );
    const data = await res.json();
    console.log(data.data);
    setResult(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-24">
      
      <Navbar />

      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">

  <h1 className="text-4xl font-bold text-center mb-2">
    Keyword
  </h1>

  <p className="text-center text-gray-300 mb-6">
    Optimize keywords for better search visibility.
  </p>

  <div className="space-y-4">

    <input
      className="w-full p-4 rounded-xl bg-white/20"
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
      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-xl"
    >
      Analyze Keyword
    </button>

  </div>
</div>
    </main>
  );
}