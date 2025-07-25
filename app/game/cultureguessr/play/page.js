'use client';

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import TryAgainGoBack from "@/app/components/TryAgainGoBack.js";

const CulturalBuildings = [
  {
    id: 1,
    name: "Borobudur Temple",
    location: "Central Java",
    coordinates: { lat: -7.6079, lng: 110.2038 },
    hints: [
      "A massive 9th-century Mahayana Buddhist temple.",
      "Features thousands of stone relief panels and Buddha statues.",
      "Recognized as a UNESCO World Heritage Site."
    ]
  },
  {
    id: 2,
    name: "Prambanan Temple",
    location: "Yogyakarta",
    coordinates: { lat: -7.7520, lng: 110.4910 },
    hints: [
      "A 9th-century Hindu temple complex dedicated to Trimurti.",
      "Famous for its tall, pointed architecture.",
      "Associated with the legend of Roro Jonggrang."
    ]
  },
  {
    id: 3,
    name: "Taman Sari Water Castle",
    location: "Yogyakarta",
    coordinates: { lat: -7.8110, lng: 110.3631 },
    hints: [
      "Once a royal garden of the Sultanate of Yogyakarta.",
      "Used for bathing, meditation, and hiding.",
      "Contains underground tunnels and pools."
    ]
  },
  {
    id: 4,
    name: "Maimun Palace",
    location: "Medan, North Sumatra",
    coordinates: { lat: 3.5785, lng: 98.6832 },
    hints: [
      "A royal palace of the Sultanate of Deli.",
      "Built in the late 19th century by Sultan Ma'mun Al Rasyid.",
      "Combines Malay, Islamic, Spanish, and Indian architectural styles."
    ]
  }
];

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function CultureGuessr() {
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentBuildingIndex, setCurrentBuildingIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [elapsedTime, setElapsedTime] = useState(0);
  const panoramaRef = useRef(null);
  const router = useRouter();

  const currentBuilding = CulturalBuildings[currentBuildingIndex];

  useEffect(() => {
    const scriptId = "google-maps-script";

    function initPanorama() {
      if (window.google && panoramaRef.current) {
        new window.google.maps.StreetViewPanorama(panoramaRef.current, {
          position: currentBuilding.coordinates,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true,
          addressControl: false,
          linksControl: false,
          panControl: false,
          zoomControl: false,
          enableCloseButton: false
        });
      }
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDq7QPD1y02MkjNfGunkeLXEbGB4-SxlqM`;
      script.async = true;
      script.defer = true;
      script.onload = () => initPanorama();
      document.head.appendChild(script);
    } else {
      initPanorama();
    }

    return () => {
      if (panoramaRef.current) {
        panoramaRef.current.innerHTML = "";
      }
    };
  }, [currentBuildingIndex]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleGuessSubmit = (e) => {
    if (e.key === "Enter") {
      const normalizedGuess = userGuess.trim().toLowerCase();
      const normalizedAnswer = currentBuilding.location.toLowerCase();
      const guessIsCorrect = normalizedGuess === normalizedAnswer;

      setIsCorrect(guessIsCorrect);

      if (guessIsCorrect) {
        setCorrectCount(prev => prev + 1);
        setUserGuess("");
        setTimeout(() => {
          setIsCorrect(null);
          setCurrentBuildingIndex(prev => prev + 1);
          setTimeLeft(prev => prev + 15);
          setElapsedTime(0);
        }, 1000);
      }
    }
  };

  const visibleHints = currentBuilding.hints.filter((_, index) => {
    if (elapsedTime >= 15 && index === 2) return true;
    if (elapsedTime >= 30 && index === 1) return true;
    if (elapsedTime >= 45 && index === 0) return true;
    return false;
  });

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden grid grid-cols-12 px-32 gap-5">
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>

      {/* Street View Container */}
      <div className="flex flex-col gap-8 justify-center items-center min-h-screen col-start-1 col-span-8 bg-white -ml-32">
        <div className="text-2xl font-bold">Where is this?</div>
        <div className="w-[1230px] h-screen rounded-lg overflow-hidden shadow-lg border-4 border-orange-500">
          <div ref={panoramaRef} className="w-full h-full" />
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-8 justify-center items-center h-200 col-start-10 col-span-3">
        {timeLeft > 0 ? (
          <div className="flex flex-col h-120 w-full">
            <div className="flex justify-between w-full items-center mt-8">
              <div className="font-bold text-5xl">{formatTime(timeLeft)}</div>
              <div className="text-xl">Correct: {correctCount}</div>
            </div>

            <div className="flex flex-col gap-5 items-start w-full h-100">
              <div className="font-bold text-3xl">Hints</div>
              <div className="flex flex-col gap-3">
                {visibleHints.map((hint, i) => (
                  <div key={i} className="bg-[#EDEDED] py-4 px-8 rounded-full">
                    {hint}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-120 w-full gap-4">
            <div className="flex justify-center w-full items-center mt-8">
              <TryAgainGoBack links={['/game/cultureguessr', '/game']} />
            </div>
            <div className="font-bold text-5xl text-center">TIME IS UP!</div>
            <div className="text-xl text-center">You got {correctCount} correct!</div>
            <div className="text-bold text-3xl font-bold text-center">It's from</div>
            <div className="font-bold text-6xl text-center">{currentBuilding.location}</div>
          </div>
        )}

        <div className="flex flex-col w-full gap-2">
          <div className="font-semibold text-xl">Which Province is it From?</div>
          <input
            type="text"
            placeholder="Your guess"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyDown={handleGuessSubmit}
            className={`
              w-full bg-[#EDEDED] py-3 px-5 rounded-full outline-none border
              ${isCorrect === null ? 'border-transparent' : isCorrect ? 'border-green-500' : 'border-red-500'}
            `}
          />
        </div>
      </div>
    </div>
  );
}
