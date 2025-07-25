'use client'

import Navbar from "../../../components/Navbar.js";
import GridGuides from "../../../components/GridGuides.js";
import Image from "next/image";
import { useRouter } from 'next/navigation';  
import '../cooking.css';
import TimerAngel from "@/app/components/TimerAngel.js";

export default function Cooking() {
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
                <TimerAngel
                duration={15} 
                onComplete={() => {
                    {router.push('/game/cooking/play')}
                }}
                />
                
                <div className="text-sm font-thin underline cursor-pointer"
                onClick={()=> {router.push('/game/cooking/play')}}
                >
                    I'm ready!
                </div>

            </div>


            <div className="flex flex-col gap-1 justify-center w-full items-center mt-12 animate-fade-in">
                <div className="font-medium text-[28px] fade-in delay-1">
                Today we're gonna make...
                </div>
                <div className="font-bold text-7xl h-6  fade-in delay-2">
                DISH NAME
                </div>
            </div>

        </div>

        {/* Bottom Section (takes remaining space) */}
        <div className="col-span-12 z-10 text-4xl font-black grid grid-cols-12 gap-5 flex-1">
          <div className="col-span-6 bg-neutral-400 fade-in delay-3">
            {/*IMAGE DI SINI*/}
          </div>
          <div className="col-span-6 ">
            <div className="w-full h-102 text-[20px] font-medium fade-in delay-3"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            > 
              <strong>Ingredients:</strong><br/>
              Based on original recipe of 2 servings<br/><br/>

              Canned black beans – 1/2 cup<br/>
              Salsa – 1/2 cup<br/>
              Tortillas – 2 medium tortillas<br/>
              Cottage cheese – 1 cup<br/><br/>

              <strong>How to Prepare:</strong><br/>
              1. Combine beans, cheese, and half the salsa in a medium bowl. Place tortillas on a work surface. Divide filling among half of each tortilla. Fold tortillas in half, pressing gently to flatten.<br/><br/>

              2. Microwave for approximately 45 seconds to 1 minute 15 seconds, or more depending on your microwave.<br/><br/>

              3. Serve the quesadillas with the remaining salsa.

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
