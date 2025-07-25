'use client';

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import '../cooking.css';
import ChoiceGrid from "@/app/components/choiceGrid.js";
import TryAgainGoBack from "@/app/components/TryAgainGoBack.js";
import { useState, useEffect } from "react";

const dishes = [
  "Rendang", "Nasi Goreng", "Sate Ayam", "Bakso", "Soto Ayam",
  "Gado-Gado", "Pempek", "Ayam Penyet", "Gudeg", "Tahu Gejrot"
];

const links = ["/game/cooking", "/game"];

export default function CookingQnA() {
  const [ingredients, setIngredients] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState("Hmm...");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dish, setDish] = useState("");
  const storageKey = "cooking_recipe";

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchIngredients = async () => {
      let selectedDish = "";
      // Try to get from localStorage first
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          try {
            const data = JSON.parse(stored);
            if (data.dish) {
              selectedDish = data.dish;
            }
          } catch (e) {
            localStorage.removeItem(storageKey);
          }
        }
      }
      // If not in localStorage, use query param or random
      if (!selectedDish) {
        const paramDish = searchParams.get('dish');
        selectedDish = paramDish || dishes[Math.floor(Math.random() * dishes.length)];
      }
      setDish(selectedDish);

      try {
        const res = await fetch(`http://localhost:5000/ingredients?dish=${encodeURIComponent(selectedDish)}`);
        const data = await res.json();

        if (!Array.isArray(data.ingredients) || data.ingredients.length < 4) {
          throw new Error("Insufficient or invalid ingredients.");
        }

        // Fetch false ingredients from backend
        const falseRes = await fetch(`http://localhost:5000/false_ingredients?dish=${encodeURIComponent(selectedDish)}&n=3`);
        const falseData = await falseRes.json();
        console.log('False ingredients from backend:', falseData);
        const falseIngredients = Array.isArray(falseData.false_ingredients) ? falseData.false_ingredients : [];

        setIngredients(data.ingredients);
        generateQuestions(data.ingredients, falseIngredients);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err);
      }
    };

    const generateQuestions = (ingredientList, falseIngredients) => {
      const used = new Set();
      const questions = [];

      for (let i = 0; i < 3; i++) {
        let correct = null;
        for (let attempt = 0; attempt < 10; attempt++) {
          const candidate = ingredientList[Math.floor(Math.random() * ingredientList.length)];
          if (!used.has(candidate)) {
            correct = candidate;
            used.add(candidate);
            break;
          }
        }

        if (!correct) continue;

        // Ensure false ingredients are unique and not the correct answer
        const filteredFalse = falseIngredients.filter(item => item !== correct && !ingredientList.includes(item));
        // If not enough, fill with generic lowercase distractors
        let distractors = filteredFalse.slice(0, 3);
        while (distractors.length < 3) {
          const filler = `ingredient ${distractors.length + 1}`;
          if (!distractors.includes(filler) && filler !== correct) {
            distractors.push(filler);
          }
        }

        // Combine and shuffle
        const allChoices = [...distractors, correct].sort(() => 0.5 - Math.random());

        questions.push({
          question: `Which of the following is an ingredient in ${dish}?`,
          choices: allChoices,
          correctIndex: allChoices.indexOf(correct)
        });
      }

      setQuestions(questions);
    };

    fetchIngredients();
  }, []);

  const current = questions[questionIndex];

  const handleChoiceClick = (choice, index) => {
    if (isLocked || !current) return;

    setSelectedIndex(index);
    setIsLocked(true);

    const isCorrect = index === current.correctIndex;

    if (isCorrect) {
      setFeedback("Correct!");
      const nextCorrectCount = correctCount + 1;
      setCorrectCount(nextCorrectCount);

      setTimeout(() => {
        if (nextCorrectCount >= 3) {
          router.push("/game/cooking/win");
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

  return (
    <div className="relative h-screen w-full bg-white text-black grid grid-cols-12 px-32 gap-5">
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>

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
        <div className="col-span-12 z-10 text-4xl font-black py-20">
          {feedback === "Wrong!" && (
            <div className="absolute inset-0 flex top-32 justify-center z-50">
              <TryAgainGoBack links={links} />
            </div>
          )}

          {loading || !current ? (
            <div className="flex flex-col items-center justify-center mt-32 text-3xl font-medium">
              Loading quiz...
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-12 justify-center w-full items-center mt-12 animate-fade-in">
                <div className="font-bold text-7xl fade-in delay-1">{feedback}</div>
                <div
                  className="font-medium text-4xl h-6 fade-in delay-2 mb-12"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {current.question}
                </div>
              </div>

              <ChoiceGrid
                choices={current.choices}
                onChoiceClick={handleChoiceClick}
                selectedIndex={selectedIndex}
                correctIndex={current.correctIndex}
                isLocked={isLocked}
              />
            </>
          )}
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
