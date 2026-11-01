import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getRandomTerritoryLore, CreatorTerritoryLore } from '../../data/forestLore';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ForestTransitionScreenProps {
  onComplete: () => void;
}

/**
 * Antique Fairy-Tale Compass Emblem
 * Features a delicate circular brass/warm-gold frame, cardinal markings,
 * botanical edge accents, and a distinct elegant compass needle.
 */
const AntiqueCompassEmblem: React.FC<{ isBlooming: boolean }> = ({ isBlooming }) => {
  return (
    <div
      className={`relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-[#fef5d9] transition-transform duration-1000 ${
        isBlooming ? 'scale-110' : 'scale-100'
      }`}
      style={{
        filter: 'drop-shadow(0 0 22px rgba(255, 238, 180, 0.75))',
      }}
    >
      {/* Outer Rotating Compass Ring (Clockwise) */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full animate-sigil-spin"
        style={{ animationDuration: '32s' }}
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 2"
          opacity="0.85"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.6"
        />
        {/* Cardinal Points */}
        <polygon points="50,2 53,9 50,7 47,9" fill="currentColor" opacity="0.95" />
        <polygon points="50,98 53,91 50,93 47,91" fill="currentColor" opacity="0.8" />
        <polygon points="2,50 9,53 7,50 9,47" fill="currentColor" opacity="0.8" />
        <polygon points="98,50 91,53 93,50 91,47" fill="currentColor" opacity="0.8" />

        {/* Botanical leaf notches on ring */}
        <circle cx="21" cy="21" r="1.5" fill="currentColor" opacity="0.9" />
        <circle cx="79" cy="21" r="1.5" fill="currentColor" opacity="0.9" />
        <circle cx="21" cy="79" r="1.5" fill="currentColor" opacity="0.9" />
        <circle cx="79" cy="79" r="1.5" fill="currentColor" opacity="0.9" />
      </svg>

      {/* Inner Counter-Rotating Compass Rose & Needle */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 sm:w-20 sm:h-20 animate-sigil-counter"
        style={{ animationDuration: '22s' }}
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="28"
          stroke="currentColor"
          strokeWidth="0.85"
          opacity="0.75"
        />
        {/* Compass Star / Rose */}
        <path
          d="M 50 14 L 53.5 46.5 L 86 50 L 53.5 53.5 L 50 86 L 46.5 53.5 L 14 50 L 46.5 46.5 Z"
          stroke="#fffbe8"
          strokeWidth="0.8"
          fill="#fcefc9"
          fillOpacity="0.35"
          opacity="0.95"
        />
        {/* Elegant Compass Needle */}
        <path
          d="M 50 20 L 52 50 L 50 80 L 48 50 Z"
          fill="#ffd166"
          opacity="0.95"
        />
        <circle cx="50" cy="50" r="4.5" fill="#fffef0" />
        <circle cx="50" cy="50" r="2" fill="#8c5a23" />
      </svg>
    </div>
  );
};

export const ForestTransitionScreen: React.FC<ForestTransitionScreenProps> = ({ onComplete }) => {
  const lore: CreatorTerritoryLore = useMemo(() => getRandomTerritoryLore(), []);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [isBlooming, setIsBlooming] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  // Smooth 4-second loading progress simulation (0% → 100%)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      const easedPct = Math.floor(100 * (1 - Math.pow(1 - rawPct / 100, 2.2)));
      setProgress(easedPct);

      if (rawPct >= 100) {
        window.clearInterval(interval);
        setIsBlooming(true);
        const fadeTimer = window.setTimeout(() => {
          setIsFadingOut(true);
        }, 600);
        const completeTimer = window.setTimeout(() => {
          onComplete();
        }, 1250);
        return () => {
          window.clearTimeout(fadeTimer);
          window.clearTimeout(completeTimer);
        };
      }
    }, 45);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none select-none px-6 overflow-hidden"
      >
        {/* Full-Screen Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={SITE_CONFIG.loadingVideoBackgroundSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[1.14] contrast-[1.02]"
          />

          {/* Bright, Dreamy, Fairy-Tale Palette Lighting & Center Luminous Warm Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 65% 55% at 50% 48%, rgba(255, 253, 242, 0.52) 0%, rgba(246, 235, 212, 0.28) 50%, rgba(220, 230, 222, 0.24) 80%, rgba(210, 220, 235, 0.16) 100%),
                linear-gradient(to bottom, rgba(255, 250, 235, 0.25) 0%, rgba(242, 232, 210, 0.12) 50%, rgba(200, 220, 210, 0.3) 100%)
              `,
            }}
          />
        </div>

        {/* Center Content Assembly */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
          {/* Antique Compass Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: isBlooming ? 1.15 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-7"
          >
            <AntiqueCompassEmblem isBlooming={isBlooming} />
          </motion.div>

          {/* Exact English phrase: "once upon a time..." with soft luminous warm glow */}
          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="italic text-[#fffdf4] font-light tracking-[0.12em] text-2xl sm:text-3xl md:text-[2.2rem]"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow:
                '0 2px 18px rgba(45, 34, 18, 0.85), 0 0 32px rgba(255, 250, 225, 0.95), 0 0 10px rgba(255, 235, 180, 0.6)',
            }}
          >
            once upon a time...
          </motion.h2>

          {/* Random Vietnamese territory sentence with high readability */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.98, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3.5 sm:mt-4 italic text-[#fffbe8] font-normal tracking-[0.05em] text-base sm:text-lg md:text-[1.18rem] leading-relaxed max-w-lg"
            style={{
              fontFamily: 'var(--font-serif)',
              textShadow:
                '0 2px 14px rgba(40, 30, 15, 0.9), 0 0 24px rgba(255, 248, 220, 0.85)',
            }}
          >
            {lore.sentence}
          </motion.p>

          {/* Colorful Magical Fairy-Tale Progress Bar (Palette: pale gold → dusty pink → soft lavender → pale blue → sage green) */}
          <div className="mt-8 sm:mt-10 w-64 sm:w-80 flex flex-col items-center">
            <div className="relative w-full h-[3px] bg-[#f5eddc]/45 rounded-full overflow-hidden shadow-[0_0_12px_rgba(255,245,220,0.5)]">
              {/* Colorful gradient progress line */}
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#ffd166] via-[#f4a261] via-[#e0b1cb] via-[#b5e2fa] to-[#a3c4bc] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Glowing traveling point tip */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_16px_#ffebad]" />
              </div>
            </div>

            {/* Percentage Display & Subtitle */}
            <div
              className="mt-2.5 flex items-center justify-between w-full text-xs sm:text-sm tracking-[0.15em] text-[#fff8e3]"
              style={{
                fontFamily: 'var(--font-serif)',
                textShadow: '0 1px 8px rgba(40,30,15,0.85)',
              }}
            >
              <span className="italic text-[0.9em] opacity-95">wandering deeper...</span>
              <span className="font-medium">{progress}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
