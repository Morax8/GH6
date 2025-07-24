'use client'

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import Image from "next/image";
import { useRouter } from 'next/navigation';  
import TimerAngel from "@/app/components/TimerAngel.js";
import { useState, useEffect } from "react";
import TryAgainGoBack from "@/app/components/TryAgainGoBack.js";


import TimeLeftTimer from "@/app/components/TImeLeftTimer.js";

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

const links = ['/game/cultureguessr','/game'];

const CulturalBuildings = [
  {
    id: 1,
    name: "Rumah Gadang",
    location: "West Sumatra",
    coordinates: { lat: -0.4562, lng: 100.4857 },
    hints: [
      "This house has sweeping curved rooflines like buffalo horns.",
      "It's a traditional house of the Minangkabau people.",
      "Often used for ceremonies and family gatherings."
    ]
  },
  {
    id: 2,
    name: "Joglo",
    location: "Central Java",
    coordinates: { lat: -7.8012, lng: 110.3644 },
    hints: [
      "This Javanese house features a high central roof supported by four main pillars.",
      "Symbol of status in traditional Javanese society.",
      "Commonly found in Yogyakarta and surrounding regions."
    ]
  },
  {
    id: 3,
    name: "Tongkonan",
    location: "South Sulawesi",
    coordinates: { lat: -2.9726, lng: 119.8963 },
    hints: [
      "It has a boat-shaped roof and is richly decorated with carvings.",
      "Belongs to the Torajan people.",
      "Used for rituals and ancestral worship."
    ]
  }
];

export default function cultureGuessr() {

const [userGuess, setUserGuess] = useState("");
const [isCorrect, setIsCorrect] = useState(null); 
const [correctCount, setCorrectCount] = useState(0);



const handleGuessSubmit = (e) => {
  if (e.key === "Enter") {
    const normalizedGuess = userGuess.trim().toLowerCase();
    const normalizedAnswer = currentBuilding.location.toLowerCase();

    const guessIsCorrect = normalizedGuess === normalizedAnswer;
    setIsCorrect(guessIsCorrect);

    if (guessIsCorrect) {
      setCorrectCount((prev) => prev + 1);
      setUserGuess(""); // optional: clear input
      setTimeout(() => {
        setIsCorrect(null);
        setCurrentBuildingIndex((prev) => prev + 1); // next question
        setTimeLeft((prev) => prev+15); 
        setElapsedTime(0);
      }, 1000);
    }
  }
};

    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [currentBuildingIndex, setCurrentBuildingIndex] = useState(0);
  
  const currentBuilding = CulturalBuildings[currentBuildingIndex];

    useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
    }, [timeLeft]);

  const visibleHints = currentBuilding.hints.filter((_, index) => {
    if (elapsedTime >= 15 && index === 2) return true;
    if (elapsedTime >= 30 && index === 1) return true;
    if (elapsedTime >= 45 && index === 0) return true;
    return false;
  });


  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden grid grid-cols-12 px-32 gap-5 overflow-hidden overflow-none">

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* <GridGuides /> */}
        
          <div className="relative w-full h-full opacity-50">
            <Image
              src="/Assets/patternFade.png"
              alt="Pattern Fade"
              fill
              className="object-cover rotate-180 opacity-50"
            />
          </div>
        
      </div>

        <div className="flex flex-col gap-8 justify-center items-center min-h-screen col-start-1 col-span-8 bg-red-300 -ml-32">
            google api streetview placeholder semgttt amoguusss
      </div>

      <div className="flex flex-col gap-8 justify-center items-center h-200 col-start-10 col-span-3">
        {timeLeft > 0 ? 
        <div className="flex flex-col h-120 w-full">
            <div className="flex justify-between w-full items-center mt-8">
                <div className="font-bold text-5xl">
                {formatTime(timeLeft)}
                    </div>

                    <div className="text-xl"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                Correct : {correctCount}
                </div>
            </div>

            <div className="flex flex-col gap-5 items-start w-full h-100 ">
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
        :
        <div className="flex flex-col  h-120 w-full gap-4">
            <div className="flex justify-center w-full items-center mt-8">
                <TryAgainGoBack
                    links={links}
                />
            </div>

            <div className="flex flex-col gap-2 items-center w-full ">
                <div className="font-bold text-5xl">TIME IS UP!</div>
                
                <div className="text-xl"
                 style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                    You got {correctCount} correct!
                </div>
            </div>
            
            <div className="flex flex-col gap-2 h-full items-center justify-center w-full -mt-10">
                <div className="text-bold text-3xl font-bold">
                    It's from
                </div>

                <div className="font-bold text-6xl text-center">
                    {currentBuilding.location}
                </div>
            </div>
        </div>  
        } 



    

        <div className="flex flex-col w-full gap-2">
            <div className="font-semibold text-xl"
             style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
                Which Province is it From?
            </div>
            <input
            type="text"
            placeholder="Your guess"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyDown={handleGuessSubmit}
            className={`
                w-full bg-[#EDEDED] py-3 px-5 rounded-full outline-none border
                transition-all duration-200
                ${isCorrect === null ? 'border-transparent' : isCorrect ? 'border-green-500' : 'border-red-500'}
            `}
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            />
        </div>

    </div>
            
        
      </div>

  );
}
