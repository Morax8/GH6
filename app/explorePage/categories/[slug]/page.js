"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { categories } from "../../../components/ExploreData";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage(props) {
  const router = useRouter();
  const { slug } = use(props.params);

  const data = categories.find((item) => item.slug === slug);

  if (!data) return <div>Not found</div>; // fallback manual karena ga bisa notFound()

  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 mx-32 relative mt-18">
        <div className="flex flex-col justify-center p-8">
          <div className="ml-18">
            <h1
              className="text-5xl font-medium mb-2"
              style={{
                fontFamily: "var(--montserrat.variable)",
              }}
            >
              Uncover:
            </h1>
            <h1
              className="text-9xl font-bold mb-4"
              style={{
                fontFamily: "var(--montserrat.variable)",
              }}
            >
              {data.name}
            </h1>
            <Link href="/borobudur-temple">
              <button
                className="bg-black text-white mt-6 text-2xl px-6 py-3 rounded-full w-40 cursor-pointer z-30"
                onClick={() => router.back()}
              >
                ← Back
              </button>
            </Link>
          </div>
        </div>
        {/* Kiri: grid image placeholder */}
        <div className="grid grid-cols-3 grid-rows-8 gap-5 bg-white z-20">
          {/* Kolom 1 */}
          <div className="relative col-start-1 col-end-2 row-start-1 row-end-2">
            <img
              src="/images/BorobudurPotrait1.jpg"
              alt="Image 1"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>
          <div className="relative col-start-1 col-end-2 row-start-2 row-end-6">
            <img
              src="/images/BorobudurPotrait2.jpg"
              alt="Image 2"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>
          <div className="relative col-start-1 col-end-2 row-start-6 row-end-8">
            <img
              src="/images/BorobudurPotrait3.jpg"
              alt="Image 3"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>

          {/* Kolom 2 */}
          <div className="relative col-start-2 col-end-3 row-start-1 row-end-5">
            <img
              src="/images/BorobudurPotrait4.jpg"
              alt="Image 4"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>
          <div className="relative col-start-2 col-end-3 row-start-5 row-end-9">
            <img
              src="/images/BorobudurPotrait5.jpg"
              alt="Image 5"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>

          {/* Kolom 3 */}
          <div className="relative col-start-3 col-end-4 row-start-1 row-end-3">
            <img
              src="/images/BorobudurPotrait6.jpg"
              alt="Image 6"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>
          <div className="relative col-start-3 col-end-4 row-start-3 row-end-7">
            <img
              src="/images/BorobudurSquare1.jpg"
              alt="Image 7"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
