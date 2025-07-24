//JANGAN SPAM REFRESH, TOKENNYA BERKURANG BANYAK

"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar.js";
import GridGuides from "../../components/GridGuides.js";
import "../../game/page.css"; // Import CSS eksternal

import Image from "next/image.js";
import Link from "next/link";

export default function Game() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/generate"); // your Flask API endpoint
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  return (
    <div className="game-container relative min-h-screen w-full bg-white text-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
        <h1 className="text-3xl font-bold text-center mt-8">Cooking Game</h1>
        {!data && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Random Recipe"}
            </button>
          </div>
        )}
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridGuides />
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-50 z-10 px-32">
          <Image
            src="/Assets/patternFade.png"
            alt="Pattern Fade"
            layout="fill"
            objectFit="cover"
            className="opacity-50 rotate-180"
          />
        </div>
      </div>

      {/* Render Recipe Result */}
      {data && (
        <div className="relative z-20 mt-48 px-6">
          <h2 className="text-2xl font-semibold text-center mb-6">{data.dish}</h2>
          <div className="flex flex-col md:flex-row items-start justify-center gap-8">
            <img
              src={data.image_url}
              alt={data.dish}
              className="w-64 h-64 object-cover rounded-xl shadow-md"
            />
            <pre className="text-left whitespace-pre-wrap bg-gray-100 p-4 rounded-lg max-w-xl">
              {data.recipe}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
