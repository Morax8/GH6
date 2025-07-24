// components/ChoiceGrid.js
'use client';
import React from 'react';

export default function ChoiceGrid({ 
  choices = [], 
  onChoiceClick = () => {}, 
  selectedIndex = null, 
  correctIndex = null, 
  isLocked = false 
}) {
  return (
    <div className="grid grid-cols-12 gap-5">
      {choices.map((choice, index) => {
        let bgColor = 'bg-[#EDEDED] hover:bg-neutral-300';
        if (selectedIndex !== null) {
          if (index === selectedIndex) {
            bgColor = index === correctIndex ? 'bg-green-300' : 'bg-red-400';
          } else if (index === correctIndex) {
            bgColor = 'bg-green-400'; // optional: highlight correct answer
          } else {
            bgColor = 'bg-[#EDEDED] opacity-60'; // dim other buttons
          }
        }

        return (
          <div
            key={index}
            className={`col-span-3 h-12 rounded-full flex items-center justify-start px-7 font-medium text-base cursor-pointer transition ${bgColor}`}
            style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            onClick={() => !isLocked && onChoiceClick(choice, index)}
          >
            {choice}
          </div>
        );
      })}
    </div>
  );
}
