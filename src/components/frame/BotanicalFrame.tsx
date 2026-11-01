import React from 'react';
import { motion } from 'motion/react';

interface BotanicalFrameProps {
  visible: boolean;
  dimmed?: boolean;
}

const CornerEnchantedOrnament: React.FC<{
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}> = ({ className = '', flipX = false, flipY = false }) => {
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return (
    <svg
      viewBox="0 0 380 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: `scale(${scaleX}, ${scaleY})`,
      }}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Delicate Curling Vines */}
        <path d="M 12 28 C 52 22, 94 30, 138 25 C 185 20, 228 28, 278 23 C 316 20, 348 24, 372 22" strokeWidth="1.35" stroke="#e6cca3" opacity="0.9" />
        <path d="M 20 18 C 65 34, 110 16, 162 30 C 206 41, 252 18, 304 28 C 335 34, 358 20, 370 26" strokeWidth="0.8" stroke="#f7ebd0" opacity="0.75" />
        <path d="M 28 12 C 22 52, 30 94, 25 138 C 20 185, 28 228, 23 278 C 20 316, 24 348, 22 372" strokeWidth="1.35" stroke="#e6cca3" opacity="0.9" />
        <path d="M 18 20 C 34 65, 16 110, 30 162 C 41 206, 18 252, 28 304 C 34 335, 20 358, 26 370" strokeWidth="0.8" stroke="#f7ebd0" opacity="0.75" />

        {/* Botanical Flourishes & Leaves */}
        <path d="M 26 126 C 38 88, 58 60, 90 42 C 114 29, 136 27, 160 26" strokeWidth="1.1" stroke="#dfbc8c" opacity="0.85" />
        <path d="M 48 72 C 68 66, 88 72, 106 90 C 118 101, 124 116, 121 130" strokeWidth="0.8" stroke="#e6cca3" opacity="0.7" />

        {/* Leaves */}
        <path d="M 94 25 C 101 13, 116 11, 125 19 C 116 26, 103 28, 94 25 Z" fill="#f7ebd0" fillOpacity="0.35" stroke="#e6cca3" strokeWidth="0.8" />
        <path d="M 132 27 C 141 37, 156 39, 165 31 C 154 23, 141 23, 132 27 Z" fill="#f2c8d5" fillOpacity="0.4" stroke="#e0a3b8" strokeWidth="0.8" />
        <path d="M 212 25 C 221 13, 236 12, 245 20 C 235 27, 222 28, 212 25 Z" fill="#d0e4f7" fillOpacity="0.4" stroke="#a3c5e8" strokeWidth="0.8" />
        <path d="M 288 24 C 297 34, 309 35, 318 27 C 307 21, 297 21, 288 24 Z" fill="#f7ebd0" fillOpacity="0.35" stroke="#e6cca3" strokeWidth="0.8" />

        <path d="M 25 94 C 13 101, 11 116, 19 125 C 26 116, 28 103, 25 94 Z" fill="#f7ebd0" fillOpacity="0.35" stroke="#e6cca3" strokeWidth="0.8" />
        <path d="M 27 132 C 37 141, 39 156, 31 165 C 23 154, 23 141, 27 132 Z" fill="#f2c8d5" fillOpacity="0.4" stroke="#e0a3b8" strokeWidth="0.8" />
        <path d="M 25 212 C 13 221, 12 236, 20 245 C 27 235, 28 222, 25 212 Z" fill="#d0e4f7" fillOpacity="0.4" stroke="#a3c5e8" strokeWidth="0.8" />

        {/* Tiny Flowers & Sparkles */}
        <g transform="translate(46, 46)" className="animate-blossom-glow">
          <path d="M 0 -4 C -6 -14, 6 -14, 0 -4 Z" fill="#f7c5d0" fillOpacity="0.65" stroke="#e094a8" strokeWidth="0.8" />
          <path d="M 4 -1 C 14 -6, 13 7, 4 2 Z" fill="#f7c5d0" fillOpacity="0.65" stroke="#e094a8" strokeWidth="0.8" />
          <path d="M 2 4 C 9 13, -3 15, -1 3 Z" fill="#f7c5d0" fillOpacity="0.65" stroke="#e094a8" strokeWidth="0.8" />
          <path d="M -3 2 C -13 8, -14 -5, -4 -1 Z" fill="#f7c5d0" fillOpacity="0.65" stroke="#e094a8" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="2.5" fill="#fef2c7" stroke="#e6cca3" strokeWidth="0.8" />
        </g>

        <g transform="translate(86, 82)">
          <path d="M 0 -3 C -5 -10, 5 -10, 0 -3 Z" fill="#d2e6fa" fillOpacity="0.7" stroke="#9bbfe8" strokeWidth="0.7" />
          <path d="M 3 0 C 10 -5, 10 5, 3 1 Z" fill="#d2e6fa" fillOpacity="0.7" stroke="#9bbfe8" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="1.8" fill="#fef2c7" />
        </g>

        {/* Little Floating Star/Celestial Motif */}
        <path d="M 120 70 L 122 75 L 127 77 L 122 79 L 120 84 L 118 79 L 113 77 L 118 75 Z" fill="#fef2c7" stroke="#e6cca3" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

const HorizontalEdgeVine: React.FC<{ className?: string; flipY?: boolean }> = ({
  className = '',
  flipY = false,
}) => (
  <svg
    viewBox="0 0 600 48"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ transform: flipY ? 'scaleY(-1)' : undefined }}
    aria-hidden="true"
  >
    <g stroke="#e6cca3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 23 C 80 18, 150 28, 230 22 C 300 16, 370 27, 445 21 C 515 16, 565 26, 600 23" strokeWidth="1.2" opacity="0.8" />
      <path d="M 15 25 C 90 30, 160 15, 245 26 C 320 33, 390 15, 465 25 C 535 31, 570 18, 595 24" strokeWidth="0.75" stroke="#f7ebd0" opacity="0.6" />
      <path d="M 292 22 C 298 14, 305 14, 308 20 C 303 24, 297 24, 292 22 Z" fill="#f7ebd0" fillOpacity="0.4" stroke="#e6cca3" strokeWidth="0.7" />
      <path d="M 324 22 C 318 14, 311 14, 308 20 C 313 24, 319 24, 324 22 Z" fill="#f7ebd0" fillOpacity="0.4" stroke="#e6cca3" strokeWidth="0.7" />
      <circle cx="308" cy="22" r="2.4" fill="#fef2c7" />
    </g>
  </svg>
);

const VerticalEdgeVine: React.FC<{ className?: string; flipX?: boolean }> = ({
  className = '',
  flipX = false,
}) => (
  <svg
    viewBox="0 0 48 600"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ transform: flipX ? 'scaleX(-1)' : undefined }}
    aria-hidden="true"
  >
    <g stroke="#e6cca3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 23 0 C 18 80, 28 150, 22 230 C 16 300, 27 370, 21 445 C 16 515, 26 565, 23 600" strokeWidth="1.2" opacity="0.8" />
      <path d="M 25 15 C 30 90, 15 160, 26 245 C 33 320, 15 390, 25 465 C 31 535, 18 570, 24 595" strokeWidth="0.75" stroke="#f7ebd0" opacity="0.6" />
      <path d="M 22 292 C 14 298, 14 305, 20 308 C 24 303, 24 297, 22 292 Z" fill="#f7ebd0" fillOpacity="0.4" stroke="#e6cca3" strokeWidth="0.7" />
      <path d="M 22 324 C 14 318, 14 311, 20 308 C 24 313, 24 319, 22 324 Z" fill="#f7ebd0" fillOpacity="0.4" stroke="#e6cca3" strokeWidth="0.7" />
      <circle cx="22" cy="308" r="2.4" fill="#fef2c7" />
    </g>
  </svg>
);

export const BotanicalFrame: React.FC<BotanicalFrameProps> = ({ visible, dimmed = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.992 }}
      animate={
        visible
          ? { opacity: dimmed ? 0.38 : 1, scale: 1 }
          : { opacity: 0, scale: 0.992 }
      }
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-20 pointer-events-none select-none p-3 sm:p-5 md:p-7"
      aria-hidden="true"
    >
      <div className="relative w-full h-full text-[#fcefd2] drop-shadow-[0_2px_12px_rgba(255,248,230,0.5)] animate-frame-shimmer">
        {/* Subtle inner antique storybook hairline */}
        <div className="absolute inset-[14px] sm:inset-[18px] md:inset-[22px] border border-[#f5ebd7]/35 rounded-[4px]" />

        {/* Four Ornate Botanical Corners */}
        <CornerEnchantedOrnament className="absolute top-0 left-0 w-38 h-38 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-80 lg:h-80" />
        <CornerEnchantedOrnament flipX className="absolute top-0 right-0 w-38 h-38 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-80 lg:h-80" />
        <CornerEnchantedOrnament flipY className="absolute bottom-0 left-0 w-38 h-38 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-80 lg:h-80" />
        <CornerEnchantedOrnament flipX flipY className="absolute bottom-0 right-0 w-38 h-38 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-80 lg:h-80" />

        {/* Edge Vines */}
        <HorizontalEdgeVine className="absolute top-0 left-32 right-32 sm:left-48 sm:right-48 md:left-60 md:right-60 h-8 sm:h-10 md:h-12" />
        <HorizontalEdgeVine flipY className="absolute bottom-0 left-32 right-32 sm:left-48 sm:right-48 md:left-60 md:right-60 h-8 sm:h-10 md:h-12" />
        <VerticalEdgeVine className="absolute left-0 top-32 bottom-32 sm:top-48 sm:bottom-48 md:top-60 md:bottom-60 w-8 sm:w-10 md:w-12" />
        <VerticalEdgeVine flipX className="absolute right-0 top-32 bottom-32 sm:top-48 sm:bottom-48 md:top-60 md:bottom-60 w-8 sm:w-10 md:w-12" />
      </div>
    </motion.div>
  );
};
