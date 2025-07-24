'use client'

import Navbar from "../../components/Navbar.js";
import GridGuides from "../../components/GridGuides.js";
import Image from "next/image";
import { useRouter } from 'next/navigation';  

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

      <div className="flex flex-col gap-8 justify-center items-center min-h-screen col-span-12">

        <div className="flex flex-col items-center gap-2">
          <div className="text-6xl font-bold">
            Think You Know Indonesian Culture?
          </div>

          <div className="text-3xl font-medium">
            Discover it. Guess it. Celebrate it!
          </div>
        </div>

          <button className="bg-black text-white text-2xl px-6 py-3 rounded-full w-60 pointer-auto cursor-pointer"
            onClick={()=>{router.push('/game/cooking/recipe')}}
          >
              Let's test!
          </button>


      </div>
    </div>
  );
}
