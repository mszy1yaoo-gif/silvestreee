import React from 'react';

export const SiYingDeskAtmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Vintage Mahogany / Editorial Desk Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 28%, #241a13 0%, #17110c 45%, #0f0a07 100%)',
        }}
      />

      {/* 2. Warm Overhead Brass Banker's Lamp Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full opacity-40 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 230, 175, 0.45) 0%, rgba(200, 150, 85, 0.15) 55%, transparent 75%)',
        }}
      />

      {/* 3. Woodgrain & Fine Desk Noise */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(0,0,0,0.03) 2px, transparent 4px)',
        }}
      />

      {/* 4. Editorial Room Ambience: Subtle Background Stacked Papers Silhouettes */}
      <div className="absolute top-12 left-6 md:left-14 w-48 h-64 border border-[#3e3023]/40 rounded-[4px] -rotate-6 opacity-20 bg-[#f4ece0]/5" />
      <div className="absolute top-16 left-10 md:left-20 w-44 h-60 border border-[#3e3023]/30 rounded-[4px] -rotate-3 opacity-15 bg-[#f4ece0]/5" />

      <div className="absolute top-14 right-6 md:right-16 w-52 h-64 border border-[#3e3023]/40 rounded-[4px] rotate-6 opacity-20 bg-[#f4ece0]/5" />
      <div className="absolute top-20 right-10 md:right-22 w-48 h-56 border border-[#3e3023]/30 rounded-[4px] rotate-3 opacity-15 bg-[#f4ece0]/5" />

      {/* 5. Faint Ink Splatter & Editorial Desk Marks */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12%" cy="22%" r="2" fill="#d9be9b" />
        <circle cx="12.4%" cy="22.5%" r="1" fill="#d9be9b" />
        <circle cx="88%" cy="75%" r="2.5" fill="#d9be9b" />
        <circle cx="87.6%" cy="75.8%" r="1.2" fill="#d9be9b" />
        <circle cx="7%" cy="85%" r="35" stroke="#9e7b57" strokeWidth="1" strokeDasharray="18 10 35 12" />
        <circle cx="92%" cy="20%" r="45" stroke="#9e7b57" strokeWidth="0.8" strokeDasharray="30 15 40 8" />
      </svg>

      {/* 6. Soft Floating Ambient Dust Motes in the Lamplight */}
      <div className="absolute inset-0">
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#fde9bc]/35 blur-[0.8px] top-1/4 left-1/3 animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-[#fde9bc]/30 blur-[0.6px] top-1/3 right-1/4 animate-pulse"
          style={{ animationDuration: '8s', animationDelay: '2s' }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#fde9bc]/25 blur-[0.8px] bottom-1/3 left-1/2 animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '4s' }}
        />
      </div>

      {/* 7. Vignette Darkening around Edges */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 160px rgba(0, 0, 0, 0.85)',
        }}
      />
    </div>
  );
};
