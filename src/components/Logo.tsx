import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current">
        {/* Outer Hexagon */}
        <path 
          d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
          strokeWidth="4" 
          className="text-[#141414]"
        />
        {/* Inner Pulse Line */}
        <path 
          d="M25 50 L40 50 L45 35 L55 65 L60 50 L75 50" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-[#141414]"
        />
        {/* Dynamic Dot */}
        <circle cx="50" cy="50" r="3" className="fill-red-500 animate-pulse" />
      </svg>
    </div>
  );
};
