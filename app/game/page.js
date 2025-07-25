'use client'
import Navbar from "../components/Navbar.js";
import GridGuides from "../components/GridGuides.js";
import "../game/page.css"; // Import CSS eksternal

import Image from "next/image.js";
import { useRouter } from 'next/navigation';  


export default function Game() {
  const router = useRouter();
  return (
    <div className="game-container relative min-h-screen w-full bg-white text-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-[999]">
                <Navbar />
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

      <main className="game-content ">
        <h1 className="play-title">PLAY!</h1>
          <div className="diamond-container">
            <div className="diamond"
              onClick={()=>(router.push('/game/cultureguessr'))}>
              <div className="diamond-content
              "><span>Where is it from?</span></div>
            </div>

            <div className="diamond"
             onClick={()=>(router.push('/game/cooking'))}>
              <div className="diamond-content"><span>What's the Dish?</span></div>
            </div>
            <div className="diamond"
              onClick={()=>(router.push('/game/quiz'))}>
              <div className="diamond-content"><span>What's the Answer?</span></div>
            </div>
          </div>
      </main>
    </div>
  );
}
