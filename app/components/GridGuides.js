"use client";

import React from "react";

const GridGuides = () => {
  const columns = 12;
  const gutter = 16; // px
  const columnWidth = `calc((100% - ${(columns - 1) * gutter}px) / ${columns})`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:flex"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="w-full flex px-4 gap-[16px]">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="bg-white/10 h-full"
            style={{ width: columnWidth }}
          />
        ))}
      </div>
    </div>
  );
};

export default GridGuides;
