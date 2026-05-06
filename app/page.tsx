import Navbar from "./component/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-5xl font-bold mb-6">
          SEO Audit Platform 🚀
        </h1>

        <p className="text-gray-300 mb-6">
          Analyze SEO & Keyword performance in seconds
        </p>

        <div className="flex gap-4">
          <a href="/seo-audit" className="bg-indigo-500 px-6 py-3 rounded-xl">
            SEO Audit
          </a>

          <a href="/keywords" className="bg-purple-500 px-6 py-3 rounded-xl">
            Keyword Tool
          </a>
        </div>
      </div>
    </main>
  );
}