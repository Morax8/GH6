"use client";

import React from "react";

export default function GridGuides() {
  const gridsGuide = new Array(12).fill(null);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="absolute grid grid-cols-12 px-16 py-4 w-full h-full gap-5">
        {gridsGuide.map((_, i) => (
          <div key={i} className="bg-red-200 w-full h-full opacity-10"></div>
        ))}
      </div>
    </div>
  );
}
