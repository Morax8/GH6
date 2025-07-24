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


const links =[
    "/game/cooking",
    "/game"
]

export default function win() {
  



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

      <div className="flex flex-col col-span-12">

        {/* Top Section (content height only) */}
        <div className="col-span-12 z-10 text-4xl font-black py-20">
            <div className="absolute top-33 flex flex-col gap-1">

    
            </div>

       
            <div className="absolute inset-0 flex top-32 justify-center z-50 fade-in delay-5">
                <TryAgainGoBack
                    links = {links}
                />
            </div>
        

            <div className="flex flex-col gap-1 justify-center w-full items-center mt-12 animate-fade-in mt-20">
                <div className="font-bold text-7xl fade-in delay-1">
                CONGRATULATIONS!
                </div>
          
                <div className="font-medium text-4xl fade-in delay-2">
                Your
                </div>

                <div className="font-bold text-7xl fade-in delay-3">
                DISH NAME
                </div>

                <div className="font-medium text-4xl fade-in delay-4">
                is done!
                </div>
            </div>

        </div>
      </div>
      
        <div className="col-span-8 col-start-3 bg-red-200 h-70 -mt-10 fade-in delay-5">
                GAMBAR MAKANANANNY
        </div>
    </div>
  );
}
