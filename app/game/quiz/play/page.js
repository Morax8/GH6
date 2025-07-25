"use client";

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../cooking/cooking.css";
import TimerAngel from "@/app/components/TimerAngel.js";
import ChoiceGrid from "@/app/components/choiceGrid.js";
import { useState } from "react";
import TryAgainGoBack from "@/app/components/TryAgainGoBack.js";
import { useMemo } from "react";

const QUESTIONS = [
  {
    question:
      "Which traditional Indonesian dance is recognized by UNESCO as an intangible cultural heritage?",
    choices: ["Jaipong", "Saman", "Barong", "Pendet"],
    correctIndex: 1, // Saman
  },
  {
    question:
      "Which island is the most populated in Indonesia and home to the capital city, Jakarta?",
    choices: ["Sumatra", "Bali", "Java", "Kalimantan"],
    correctIndex: 2, // Java
  },
  {
    question:
      "Which of the following is a traditional Indonesian food made from fermented soybeans?",
    choices: ["Tempeh", "Rendang", "Sate", "Bakso"],
    correctIndex: 0, // Tempeh
  },
  {
    question:
      "What is the name of the Indonesian traditional batik technique involving wax-resist dyeing?",
    choices: ["Tenun", "Ikat", "Songket", "Batik Tulis"],
    correctIndex: 3, // Batik Tulis
  },
  {
    question: "Which volcano is the highest in Indonesia?",
    choices: ["Mount Merapi", "Mount Semeru", "Mount Rinjani", "Mount Kerinci"],
    correctIndex: 3, // Mount Kerinci
  },
  {
    question: "What is the name of the traditional house of the Toraja people?",
    choices: ["Rumah Gadang", "Limas", "Tongkonan", "Joglo"],
    correctIndex: 2, // Tongkonan
  },
  {
    question: "Which national park is home to the endangered Komodo dragons?",
    choices: ["Ujung Kulon", "Gunung Leuser", "Komodo", "Bromo Tengger Semeru"],
    correctIndex: 2, // Komodo
  },
  {
    question:
      "What is the name of Indonesia's traditional shadow puppet performance?",
    choices: ["Reog", "Kuda Lumping", "Wayang Kulit", "Lenong"],
    correctIndex: 2, // Wayang Kulit
  },
  {
    question: "Which city is known as the 'City of Flowers' in Indonesia?",
    choices: ["Jakarta", "Bandung", "Malang", "Yogyakarta"],
    correctIndex: 1, // Bandung
  },
  {
    question:
      "Which lake is the largest volcanic lake in the world, located in North Sumatra?",
    choices: ["Lake Maninjau", "Lake Toba", "Lake Singkarak", "Lake Poso"],
    correctIndex: 1, // Lake Toba
  },
  {
    question:
      "What is the name of the traditional musical instrument made of bamboo and played by shaking?",
    choices: ["Sasando", "Angklung", "Gamelan", "Kecapi"],
    correctIndex: 1, // Angklung
  },
  {
    question:
      "Which Indonesian island is famous for its unique funeral rituals and hanging graves?",
    choices: ["Java", "Sulawesi", "Bali", "Sumatra"],
    correctIndex: 1, // Sulawesi (Toraja people)
  },
  {
    question:
      "Which Indonesian food is made from beef slowly cooked in coconut milk and spices?",
    choices: ["Soto", "Rendang", "Rawon", "Gudeg"],
    correctIndex: 1, // Rendang
  },
  {
    question:
      "Which province is known for its traditional dances such as Legong and Kecak?",
    choices: ["Aceh", "Bali", "Papua", "Riau"],
    correctIndex: 1, // Bali
  },
  {
    question: "Which Indonesian island is known for its pink sand beach?",
    choices: ["Bali", "Flores", "Lombok", "Komodo"],
    correctIndex: 3, // Komodo
  },
];

const links = ["/game/quiz", "/game"];

export default function QuizPlay() {
  const [feedback, setFeedback] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  const randomizedQuestions = useMemo(() => {
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const router = useRouter();

  const current = randomizedQuestions[questionIndex];

  const handleChoiceClick = (choice, index) => {
    if (isLocked || isFinished) return;

    setSelectedIndex(index);
    setIsLocked(true);

    const isCorrect = index === current.correctIndex;

    if (isCorrect) {
      setFeedback("Correct!");
      setCorrectCount((prev) => prev + 1);

      setTimeout(() => {
        const nextIndex = questionIndex + 1;

        if (nextIndex >= randomizedQuestions.length) {
          setIsFinished(true);
        } else {
          setQuestionIndex(nextIndex);
          setSelectedIndex(null);
          setIsLocked(false);
          setFeedback("");
        }
      }, 2000);
    } else {
      setFeedback("Wrong!");
    }
  };

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden grid grid-cols-12 px-32 gap-5 overflow-none">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>

      {/* Background */}
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

      <div className="flex flex-col min-h-screen col-span-12 grid grid-cols-12 gap-5">
        <div className="col-span-12 z-10 text-4xl font-black py-20 relative">
          <div className="absolute top-33 flex justify-between  w-full ">
            <TimerAngel
              duration={300}
              onComplete={() => {
                setFeedback("Time is Up!");
                setIsLocked(true);
                setIsFinished(true);
              }}
            />

            <div
              className="text-[20px] font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Questions right: {correctCount}
            </div>
          </div>

          <div className="absolute top-34 flex flex-col gap-1 items-center  w-full ">
            {["Wrong!", "Time is Up!"].includes(feedback) && (
              <TryAgainGoBack links={links} />
            )}

            <div className="font-bold text-7xl">{feedback}</div>

            {["Wrong!", "Time is Up!"].includes(feedback) && (
              <div
                className="text-[20px] font-medium"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                You got {correctCount} questions right!
              </div>
            )}
          </div>

          {/* Question UI */}
          <div className="flex flex-col gap-6 justify-center w-full items-center mt-12  mt-60 mb-40">
            <div className="font-bold text-6xl fade-in delay-1">
              QUESTION {questionIndex + 1} of {randomizedQuestions.length}
            </div>

            <div
              className="font-medium text-4xl h-6 fade-in delay-2 grid grid-cols-12 gap-5"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              <div className="col-span-6 col-start-4 text-center">
                {current.question}
              </div>
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
        </div>
      </div>
    </div>
  );
}
