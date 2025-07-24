'use client'

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import Image from "next/image";
import { useRouter } from 'next/navigation';  
import '../cooking.css';
import TimerAngel from "@/app/components/TimerAngel.js";
import ChoiceGrid from "@/app/components/choiceGrid.js";
import { useState } from "react";
import TryAgainGoBack from "@/app/components/TryAgainGoBack.js";

const QUESTIONS = [
{
    question: "What should we add next after _____?",
    choices: ["Sugar", "Salt", "Water", "Ice"],
    correctIndex: 2
},
{
    question: "Which ingredient makes it sweet?",
    choices: ["Vinegar", "Lime", "Sugar", "Soy Sauce"],
    correctIndex: 2
},
{
    question: "Which ingredient makes it sweet?",
    choices: ["Vinegar", "Lime", "Sugar", "Soy Sauce"],
    correctIndex: 2
}
];

const links =[
    "/game/cooking",
    "/game"
]

export default function Cooking() {
    const [feedback, setFeedback] = useState("Hmm...");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

  
  const current = QUESTIONS[questionIndex];

    const handleChoiceClick = (choice, index) => {
        if (isLocked) return;

        setSelectedIndex(index);
        setIsLocked(true);

        const isCorrect = index === current.correctIndex;

        if (isCorrect) {
            setFeedback("Correct!");
            const nextCorrectCount = correctCount + 1;
            setCorrectCount(nextCorrectCount);

            setTimeout(() => {
            if (nextCorrectCount >= 3) {
                router.push("/game/cooking/win"); // Change this path to your actual win screen
            } else {
                setQuestionIndex(prev => prev + 1);
                setSelectedIndex(null);
                setIsLocked(false);
                setFeedback("Hmm...");
            }
            }, 2000);
        } else {
            setFeedback("Wrong!");
            
        }
    };


    const router = useRouter();

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden grid grid-cols-12 px-32 gap-5 overflow-hidden overflow-none">

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

        {/* Top Section (content height only) */}
        <div className="col-span-12 z-10 text-4xl font-black py-20">
            <div className="absolute top-33 flex flex-col gap-1">

    
            </div>

            {feedback === "Wrong!" ?
            <div className="absolute inset-0 flex top-32 justify-center z-50">
                <TryAgainGoBack
                    links = {links}
                />
            </div>
            
            : <></>}

            <div className="flex flex-col gap-12 justify-center w-full items-center mt-12 animate-fade-in mt-20">
                <div className="font-bold text-7xl fade-in delay-1">
                 {feedback}
                </div>

                <div className="font-medium text-4xl h-6  fade-in delay-2 mb-12"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                {current.question}
                </div> 
            </div>

            <div className="fade-in delay-3">
            <ChoiceGrid
            choices={current.choices}
            onChoiceClick={handleChoiceClick}
            selectedIndex={selectedIndex}
            correctIndex={current.correctIndex}
            isLocked={isLocked}
            />    
            </div>
            <div>

            </div>
        </div>
      </div>
      
        <Image
        src={
            feedback === "Wrong!"
            ? "/Assets/answerWrongCooking.png"
            : "/Assets/answerCorrectDefaultCooking.png"
        }
        alt={feedback === "Wrong!" ? "Answer Wrong" : "Answer Correct"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-[560px] h-auto absolute left-1/2 bottom-0 translate-x-[-50%]"
        style={{ objectFit: "contain" }}
        />
    </div>
  );
}
