'use client';

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import Image from "next/image";
import { useRouter } from 'next/navigation';  
import '../cooking.css';
import TimerAngel from "@/app/components/TimerAngel.js";
import { useEffect, useState } from "react";

export default function Cooking() {
  const router = useRouter();

  const [dish, setDish] = useState("Loading...");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [startTimer, setStartTimer] = useState(false); // <-- NEW
  const [loading, setLoading] = useState(true);

  // Helper to store and load recipe from localStorage
  const storageKey = "cooking_recipe";

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setDish(data.dish);
        setIngredients(data.ingredients || []);
        setSteps(data.steps || []);
        setImageUrl(data.image_url);
        setStartTimer(true);
        setLoading(false);
        return;
      } catch (e) {
        // If parsing fails, clear and fetch new
        localStorage.removeItem(storageKey);
      }
    }
    // Fetch new recipe if not in storage
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/generate");
        const data = await res.json();
        setDish(data.dish);
        setIngredients(data.ingredients || []);
        setSteps(data.steps || []);
        setImageUrl(data.image_url);
        setStartTimer(true); // <-- Start timer AFTER fetch
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setDish("Error");
        setIngredients([]);
        setSteps([]);
      }
      setLoading(false);
    };
    fetchRecipe();
  }, []);

  // Restart handler
  const handleRestart = () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden grid grid-cols-12 px-32 gap-5">

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        <GridGuides />
        <div className="relative w-full h-full opacity-50">
          <Image
            src="/Assets/patternFade.png"
            alt="Pattern Fade"
            fill
            className="object-cover rotate-180 opacity-50"
          />
        </div>

      </div>

      <div className="flex flex-col min-h-screen col-span-12">
        {/* Top Section */}
        <div className="col-span-12 z-10 text-4xl font-black py-20">
          <div className="absolute top-33 flex flex-col gap-1">
            {startTimer && (
              <>
                <TimerAngel
                  duration={15}
                  onComplete={() => {
                    router.push(`/game/cooking/play?dish=${encodeURIComponent(dish)}`);
                  }}
                />
                <div
                  className="text-sm font-thin underline cursor-pointer"
                  onClick={() => router.push(`/game/cooking/play?dish=${encodeURIComponent(dish)}`)}
                >
                  I&apos;m ready!
                </div>
                <button
                  className="mt-2 text-xs underline text-red-500 cursor-pointer"
                  onClick={handleRestart}
                >
                  Restart Recipe
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col gap-1 justify-center w-full items-center mt-12 animate-fade-in">
            <div className="font-medium text-[28px] fade-in delay-1">
              Today we&apos;re gonna make...
            </div>
            <div className="font-bold text-7xl h-6 fade-in delay-2">
              {dish}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="col-span-12 z-10 text-4xl font-black grid grid-cols-12 gap-5 flex-1">
          <div className="col-span-6 bg-neutral-400 fade-in delay-3 relative">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={dish}
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>

          <div className="col-span-6">
            <div
              className="w-full h-102 text-[20px] font-medium fade-in delay-3 overflow-y-auto"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              <div className="mb-4">
                <div className="font-bold text-xl mb-2">Ingredients</div>
                <ul className="list-disc list-inside">
                  {ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-bold text-xl mb-2 mt-6">Steps</div>
                <ol className="list-decimal list-inside">
                  {steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
              ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
