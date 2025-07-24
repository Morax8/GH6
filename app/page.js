import Navbar from "./components/Navbar.js";
import GridGuides from "./components/GridGuides.js";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen w-full bg-white text-black overflow-hidden">
        {/* Grid Guides as Background Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridGuides />
        </div>
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-[999]">
          <Navbar />
        </div>

        {/* Hero Section */}
        <div className="relative h-screen w-full">
          {/* Pattern Fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-50 z-10">
            <Image
              src="/Assets/patternFade.png"
              alt="Pattern Fade"
              layout="fill"
              objectFit="cover"
              className="opacity-50 rotate-180"
            />
          </div>

          {/* Main Content */}
          <div className="flex h-full w-full">
            {/* Left Side: Text */}
            <div className="w-1/2 flex flex-col justify-center pl-32 z-10 col-span gap">
              <h1 className="text-7xl font-bold mb-4">Lorem Ipsum</h1>
              <p
                className="mb-16 text-[24px] w-[500px]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                congue lectus eu lacus eleifend, et sodales augue ultrices.
                Aenean nec quam neque.
              </p>
              <button className="bg-black text-white text-2xl px-6 py-3 rounded-full w-60">
                Button
              </button>
            </div>

            {/* Right Side: Full Image */}
            <div className="w-1/2 h-full relative z-10">
              <div className="relative w-full h-full px-32">
                <Image
                  src="/images/homepage.png"
                  alt="Full Image"
                  layout="fill"
                  objectFit="cover"
                  className="mask-b-from-20% mask-b-to-100% "
                />
              </div>
            </div>
          </div>
        </div>

        {/* second content */}
        <div className="text-center mt-20 mb-10">
          <h1 className="text-6xl font-semibold mb-6">Today's Top Picks</h1>
        </div>
        <div className="grid grid-cols-7 grid-rows-5 gap-4 w-full max-w-screen-xl mx-auto">
          {/* div1: 2 kolom × 2 baris */}
          <div className="col-start-1 col-end-3 row-start-1 row-end-3 relative">
            <img
              src="/images/reog.png"
              className="w-full object-cover h-[350px]"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">Judul 1</h3>
              <p className="text-sm">Deskripsi 1</p>
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* div2: 3 kolom × 2 baris */}
          <div className="col-start-3 col-end-6 row-start-1 row-end-3 relative">
            <img
              src="/images/bajuAdat.png"
              className="w-full object-cover object-[center_25%] h-[350px]"
            />

            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">Judul 2</h3>
              <p className="text-sm">Deskripsi 2</p>
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* div3: 2 kolom × 4 baris (tinggi jadi 2x) */}
          <div className="col-start-6 col-end-8 row-start-1 row-end-5 relative">
            <img
              src="/images/bali.png"
              className="w-full object-cover h-[700px]"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">Judul 3</h3>
              <p className="text-sm">Deskripsi 3</p>
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* div4: 2 kolom × 2 baris */}
          <div className="col-start-4 col-end-6 row-start-3 row-end-5 relative">
            <img
              src="/images/tenun.png"
              className="w-full object-cover h-[350px]"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">Judul 4</h3>
              <p className="text-sm">Deskripsi 4</p>
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* div5: 3 kolom × 2 baris */}
          <div className="col-start-1 col-end-4 row-start-3 row-end-5 relative">
            <img
              src="/images/adat2.png"
              className="w-full object-cover h-[350px]"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">Judul 5</h3>
              <p className="text-sm">Deskripsi 5</p>
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* third content - Full Width Image with Overlay Text */}
        <div className="relative w-full h-[1000px] mt-20">
          {/* Image full bleed */}
          <img
            src="/images/reog.png"
            alt="Reog Icon"
            className="absolute inset-0 w-full h-full  object-cover z-0"
          />

          {/* Overlay Black Transparent */}
          <div className="absolute inset-0 bg-black/20 z-10" />

          {/* Text Overlay */}
          <div className="absolute bottom-20 left-15 text-white max-w-md">
            <h1 className="text-8xl font-bold leading-tight">
              Today’s <br /> Cultural <br /> Experience
            </h1>
            <p
              className="mt-2 text-2xl leading-snug"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              aliquet laoreet dolor, eget consectetur orci tempus vel. Quisque
              ut dui nec ipsum tristique convallis non sit amet sapien.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

