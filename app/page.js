"use client";
import Navbar from "./components/Navbar.js";
import GridGuides from "./components/GridGuides.js";
import MarqueeGallery from "./components/Marquee.js";
import { getDistanceFromLatLonInKm } from "./utils/getDistance.js";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function Home() {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;

          // Koordinat Candi Borobudur
          const borobudurLat = -7.6079;
          const borobudurLon = 110.2038;

          const dist = getDistanceFromLatLonInKm(
            userLat,
            userLon,
            borobudurLat,
            borobudurLon
          );

          setDistance(dist.toFixed(1)); // contoh 14.3 km
        },
        (err) => {
          console.error("Lokasi gagal diakses:", err);
        }
      );
    }
  }, []);
  return (
    <>
      <main className="relative min-h-screen w-full bg-white text-black overflow-hidden">
        {/* Grid Guides as Background Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* <GridGuides /> */}
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
              fill
              className="object-cover opacity-50 rotate-180"
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
                  fill
                  className="object-cover mask-b-from-20% mask-b-to-100%"
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
              <h3 className="text-lg font-semibold">Barong Sewu</h3>
              <p className="text-sm">
                5 Fakta Seru Tari 1000 Barong Kediri yang Bikin Kamu Kagum!
              </p>
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
              <h3 className="text-lg font-semibold">Busana dari Dayak</h3>
              <p className="text-sm">
                5 Hal Unik yang harus kamu tahu dari Pakaian Adat Kalimantan
                Barat Khas Suku Dayak
              </p>
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
              <h3 className="text-lg font-semibold">Galungan</h3>
              <p className="text-sm">
                Perayaan Kemenangan Kebenaran ala Bali & Tengger
              </p>
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
              <h3 className="text-lg font-semibold">Tenun Desa Sade</h3>
              <p className="text-sm">Surganya Kain Tenun Sasak di Lombok!</p>
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
              <h3 className="text-lg font-semibold">Peresean</h3>
              <p className="text-sm">
                Seni Tari Pertarungan Khas Sasak yang Seru!
              </p>
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
              BARONG SEWU. Pemerintah Kabupaten Kediri sukses menggelar pertunjukan megah tari kolosal 1000 Barong di Simpang Lima Gumul tahun 2017, sebagai puncak acara Pekan Budaya dan Pariwisata.
            </p>
          </div>
        </div>

        {/* fourth content */}
        <section className=" relative">
          {/* Pattern Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-50 z-10 px-32">
            <Image
              src="/Assets/patternFade.png"
              alt="Pattern Fade"
              fill
              className="object-cover opacity-50 rotate-180"
            />
          </div>

          <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 mx-32 relative">
            {/* Kiri: grid image placeholder */}
            <div className="grid grid-cols-3 grid-rows-8 gap-5 bg-white z-20">
              <div className="col-start-1 col-end-2 row-start-1 row-end-2 bg-gray-300"></div>
              <div className="col-start-1 col-end-2 row-start-2 row-end-6 bg-gray-300"></div>
              <div className="col-start-1 col-end-2 row-start-6 row-end-8 bg-gray-300"></div>
              <div className="col-start-2 col-end-3 row-start-1 row-end-5 bg-gray-300"></div>
              <div className="col-start-2 col-end-3 row-start-5 row-end-9 bg-gray-300"></div>
              <div className="col-start-3 col-end-4 row-start-1 row-end-3 bg-gray-300"></div>
              <div className="col-start-3 col-end-4 row-start-3 row-end-7 bg-gray-300"></div>
            </div>

            {/* Kanan: text */}
            <div className="flex flex-col justify-center p-8 bg-white">
              <div className="ml-18">
                <h1
                  className="text-5xl font-medium mb-4"
                  style={{
                    fontFamily: "var(--montserrat.variable)",
                  }}
                >
                  Did you know?
                </h1>
                <h1
                  className="text-9xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--montserrat.variable)",
                  }}
                >
                  Borobudur Temple
                </h1>
                <h1
                  className="text-5xl font-medium mb-8"
                  style={{
                    fontFamily: "var(--montserrat.variable)",
                  }}
                >
                  is{" "}
                  <span className="font-bold text-[#D24D50]">
                    {distance ? `${distance} Km ` : "Loading..."}
                  </span>
                  from where you are
                </h1>
                <p
                  className="mt-2 text-2xl leading-snug mb-10"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Candi Buddha terbesar ini sempat terkubur 10 abad sebelum
                  dipugar UNESCO, mahakarya abad ke-9 yang memukau dengan 504
                  stupa dan 2.672 relief Buddha terpanjang di dunia.
                </p>
                <button className="bg-black text-white mt-6 text-2xl px-6 py-3 rounded-full w-60">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* fifth content */}
        <div className="flex h-screen px-10 py-8 gap-10 mx-32">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center w-[600px]">
            <h1 className="text-4xl font-bold mb-2">Today’s Topic:</h1>
            <h1
              className="text-9xl font-bold leading-tight"
              style={{ fontFamily: "var(--montserrat.variable)" }}
            >
              North <br /> Sumatra
            </h1>
          </div>
          {/* RIGHT SIDE */}
          <div className="grid grid-cols-[2.5fr_2fr] grid-rows-7 gap-5 flex-1">
            {/* div1 */}
            <div className="col-start-1 col-end-2 row-start-1 row-end-5 relative overflow-hidden rounded-md">
              <Image
                src="/images/Tortor.jpg"
                alt="Tari Tortor"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="font-semibold text-lg">
                  Tortor & Gondang Sabangunan
                </h2>
                <p className="text-sm text-gray-200">
                  Kamu akan terpukau menyaksikan gerakan magis tari Tortor
                  diiringi alunan gondang. Setiap gerakan penuh makna ini bukan
                  sekadar tarian, melainkan doa yang hidup bagi masyarakat
                  Batak!
                </p>
              </div>
            </div>

            {/* div2 */}
            <div className="col-start-1 col-end-2 row-start-5 row-end-8 relative overflow-hidden rounded-md">
              <Image
                src="/images/RumahBolon.jpg"
                alt="Rumah Bolon"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="font-semibold text-lg">Rumah Bolon</h2>
                <p className="text-sm text-gray-200">
                  Mengenal Rumah adat Batak dengan arsitektur unik berbentuk
                  perahu, atap melengkung, dan ornamen warna-warni.
                </p>
              </div>
            </div>

            {/* div3 */}
            <div className="col-start-2 col-end-3 row-start-1 row-end-3 relative overflow-hidden rounded-md">
              <Image
                src="/images/MangokalHoli.jpg"
                alt="Mangokal Holi"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="font-semibold text-lg">Mangokal Holi</h2>
                <p className="text-sm text-gray-200">
                  Kamu mungkin tak percaya, tapi inilah bentuk penghormatan
                  tertinggi - menggali kembali tulang leluhur untuk diberikan
                  tempat lebih layak. Sebuah warisan budaya yang penuh makna!
                </p>
              </div>
            </div>

            {/* div4 */}
            <div className="col-start-2 col-end-3 row-start-3 row-end-8 relative overflow-hidden rounded-md">
              <Image
                src="/images/ulos.jpg"
                alt="Ulos"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="font-semibold text-lg">
                  Ulos: Kain dengan Seribu Makna
                </h2>
                <p className="text-sm text-gray-200">
                  Ketahui setiap helai ulos mengandung doa dan berkat.
                  Motif-motifnya yang indah ternyata adalah "bahasa rahasia"
                  warisan leluhur Batak.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full py-12">
          {/* Ini pastiin ada wrapper div buat z-index */}
          <div className="relative z-20 bg-transparent">
            <MarqueeGallery />
          </div>

          {/* Pattern Fade bawah */}
          <div className="absolute -bottom-[1px] left-0 w-full h-[1000px] z-10 pointer-events-none">
            <Image
              src="/Assets/patternFade.png"
              alt="Pattern Fade"
              fill
              className="opacity-50"
            />
          </div>
        </div>
      </main>
    </>
  );
}
