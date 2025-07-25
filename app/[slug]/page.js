"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { homepage, categories, province } from "../components/ExploreData";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function DetailPage(props) {
  const router = useRouter();
  const { slug } = use(props.params);

  const data =
    homepage.find((item) => item.slug === slug) ||
    categories.find((item) => item.slug === slug) ||
    province.find((item) => item.slug === slug);

  if (!data) return <div>Not found</div>; // fallback manual karena ga bisa notFound()

  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto p-6 sm:p-8 leading-relaxed text-gray-800 mt-20">
        <h1 className="text-8xl font-bold mb-10 text-center text-gray-900">
          {data.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="w-full h-[500px] relative rounded-xl shadow-md overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-lg text-justify text-gray-700 whitespace-pre-line">
              {data.description}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="w-60 inline-block mb-6 px-4 py-2 bg-black rounded-full hover:bg-gray-700 transition text-white text-center cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}
