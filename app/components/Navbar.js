"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="w-full px-32 py-4 flex justify-between items-center bg-white shadow text-black">
      <div className="text-lg font-bold">
        <img src="/Assets/logo.svg" alt="Logo" className="w-20" />
      </div>
      <ul className="flex space-x-8 text-sm font-medium">
        <li
          className="font-bold font hover:text-gray-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Home
        </li>
        <li
          className="font-bold hover:text-gray-700 cursor-pointer"
          onClick={() => router.push("/explorePage")}
        >
          Explore
        </li>
        <li
          className="font-bold hover:text-gray-700 cursor-pointer"
          onClick={() => router.push("/game")}
        >
          Games
        </li>
      </ul>
    </nav>
  );
}
