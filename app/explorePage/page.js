"use client";
import Navbar from "../components/Navbar";
import GridGuides from "../components/GridGuides";
import { province, categories } from "../components/ExploreData";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link"; // pastiin ini ada di atas

export default function explorePage() {
  const carouselRef = useRef();
  let index = 0;
  const boxes = new Array(6).fill(null);

  const handleScroll = (x) => {
    const cardWidth = 70;

    if (carouselRef.current) {
      index += x;
      if (index > 4) {
        index = 0;
      } else if (index < 0) {
        index = 4 - 1;
      }
      carouselRef.current.scrollTo({ left: 304 * index, behavior: "smooth" });
    }
  };

  setInterval(() => {
    handleScroll(1);
  }, 4000);

  return (
    <div className="grid grid-cols-12 gap-5 place-content-start bg-white min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* <GridGuides /> */}
      </div>
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent -top-0 opacity-50 z-0">
        <Image
          src="/Assets/patternFade.png"
          alt="Pattern Fade"
          fill
          className="opacity-50 rotate-180"
        />
      </div>

      <div className="relative flex justify-center items-center col-span-12 gap-10 font-semibold h-screen px-32 mt-2">
        <div className="grid grid-cols-12 gap-5 w-200">
          {categories.map((category, i) => (
            <Link
              key={i}
              href={`/explorePage/categories/${category.slug}`}
              className="col-span-4 h-60 bg-neutral-400 relative w-full group overflow-hidden cursor-pointer rounded-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover z-[0] transition-transform duration-300 ease-in-out group-hover:scale-105"
              />

              <div className="absolute font-bold text-white bottom-2 left-2 p-2 w-30 text-2xl z-1">
                {category.name}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[120px] opacity-80 bg-gradient-to-t from-black to-transparent z-0"></div>
            </Link>
          ))}
        </div>
        <div className=" flex flex-col items-start gap-3">
          <div className="text-7xl text-black font-bold z-2">Categories</div>

          <div className="text-4xl text-black font-normal z-2">
            to Discover...
          </div>
        </div>
      </div>

      <div className="col-span-12 h-screen grid grid-cols-12 relative">
        <div className="col-span-12 w-screen bg-red-600 h-96 mb-12 absolute z-1">
          <Image
            src="/images/tenun.png"
            alt="Image of a lady making batik"
            fill
            className="object-cover object-[0_40%]"
          />
        </div>

        <div className="col-span-12 px-32 grid grid-cols-12 gap-5 relative">
          <div className="col-span-5 flex flex-col justify-center h-full text-black mt-51">
            <div className="font-semibold text-5xl mb-6">This is _______</div>

            <div
              className="text-[16px] mb-13 font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              aliquet laoreet dolor, eget consectetur orci tempus vel.
            </div>

            <button className="bg-black text-white text-xl px-6 py-2 rounded-full w-66 mb-3">
              Learn more
            </button>
          </div>
        </div>

        <div className="absolute top left-170 z-[0]">
          <Image
            src="/Assets/BgSupergrapicFade.png"
            alt="Pattern Fade"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-202"
          />
        </div>
      </div>

      <div className="h-screen px-32 col-span-12 flex flex-col justify-center items-start gap-20 relative z-100 mt-[-100px]">
        <div className="text-black font-bold text-5xl">Check Out More!</div>

        <div className="grid grid-cols-12 gap-5 w-full ">
          {province.map((province, i) => (
            <Link
              key={i}
              href={`/explorePage/${province.slug}`}
              className="col-span-2"
            >
              <div
                key={i}
                className="col-span-2 h-46 bg-neutral-400 relative w-full group overflow-hidden cursor-pointer rounded-2xl"
              >
                <Image
                  src={province.image}
                  alt={province}
                  fill
                  className="object-cover z-[0]   transition-transform duration-300 ease-in-out group-hover:scale-105"
                />

                <div className="absolute font-bold text-white bottom-2 left-2 p-2 w-30 text-2xl z-1">
                  {province.name}
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[120px] opacity-80 bg-gradient-to-t from-black to-transparent z-0"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bg-gradient-to-r from-white to-transparent z-0 pointer-events-none right-0 bottom-0 w-400 h-200">
        <Image
          src="/Assets/patternFade.png"
          alt="Pattern Fade"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
    </div>
  );
}
