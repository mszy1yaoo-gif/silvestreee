import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NaomiPersonalLoadingScreenProps {
  onComplete: () => void;
}

export const NaomiPersonalLoadingScreen: React.FC<NaomiPersonalLoadingScreenProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Smooth loading progression from 0% to 100% over ~3 seconds
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2900; // ~2.9s

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      // Smooth cubic ease-out
      const easedPct = Math.min(
        100,
        Math.floor(100 * (1 - Math.pow(1 - rawPct / 100, 2.4)))
      );
      setProgress(easedPct);

      if (rawPct >= 100) {
        window.clearInterval(interval);
        setIsDone(true);
        const timer = window.setTimeout(() => {
          onComplete();
        }, 550);
        return () => window.clearTimeout(timer);
      }
    }, 40);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDone ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none px-6 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(255, 250, 240, 0.98) 0%, rgba(249, 240, 230, 0.96) 45%, rgba(236, 224, 218, 0.94) 80%, rgba(220, 205, 208, 0.96) 100%)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Luminous Dream Mist & Pastel Glow Aura */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 46%, rgba(255, 235, 205, 0.45) 0%, rgba(240, 220, 250, 0.25) 50%, transparent 75%)',
          }}
        />

        {/* Ambient Floating Sparkles / Dream Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${15 + (i * 6.5) % 75}vw`,
                y: `${20 + (i * 7.2) % 65}vh`,
                opacity: 0.2,
                scale: 0.6,
              }}
              animate={{
                y: [`${20 + (i * 7.2) % 65}vh`, `${10 + (i * 7.2) % 65}vh`],
                opacity: [0.2, 0.85, 0.2],
                scale: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background:
                  i % 3 === 0
                    ? '#ffd6a5'
                    : i % 3 === 1
                      ? '#ffcbf2'
                      : '#cbf3f0',
                filter: 'blur(0.5px) drop-shadow(0 0 6px rgba(255,240,200,0.8))',
              }}
            />
          ))}
        </div>

        {/* Center Magical Rotating Artifact */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
          {/* 3D Floating Relic Container with Multi-Layered Rotating Rings */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center perspective-[1000px]">
            {/* Outer Ethereal Counter-Rotating Botanical / Star Orbit Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-[#c8a57b] opacity-60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <circle cx="100" cy="8" r="3" fill="#e9b872" />
                <circle cx="100" cy="192" r="3" fill="#e9b872" />
                <circle cx="8" cy="100" r="3" fill="#e9b872" />
                <circle cx="192" cy="100" r="3" fill="#e9b872" />
                {/* Diagonal Flower Petals */}
                <circle cx="35" cy="35" r="2" fill="#f4a261" />
                <circle cx="165" cy="35" r="2" fill="#f4a261" />
                <circle cx="35" cy="165" r="2" fill="#f4a261" />
                <circle cx="165" cy="165" r="2" fill="#f4a261" />
              </svg>
            </motion.div>

            {/* Inner Floating Artifact Frame with Continuous Slow 3D Rotation */}
            <motion.div
              animate={{
                rotateY: [0, 360],
                y: [0, -8, 0],
              }}
              transition={{
                rotateY: { duration: 16, repeat: Infinity, ease: 'linear' },
                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-[24px] p-1.5 shadow-[0_12px_36px_rgba(110,85,60,0.22),0_0_28px_rgba(255,220,160,0.6)]"
            >
              {/* Antique Gilded Ivory Border Frame */}
              <div
                className="w-full h-full rounded-[20px] overflow-hidden relative border-2 border-[#e6c89a]"
                style={{
                  background:
                    'linear-gradient(135deg, #fffcf5 0%, #faefe0 50%, #f4e4cf 100%)',
                }}
              >
                {/* The exact uploaded image asset for Naomi's loading screen */}
                <img
                  src="/assets/aistudio/image_3e41855b.png"
                  alt="Mộ Sương Chi Ức Dao — Naomi personal talisman"
                  className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
                />

                {/* Subtle Glass Shimmer Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[20px]"
                  style={{
                    background:
                      'linear-gradient(120deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 235, 190, 0.2) 100%)',
                    boxShadow: 'inset 0 0 14px rgba(255, 255, 255, 0.8)',
                  }}
                />

                {/* Tiny Corner Rosettes */}
                <div className="absolute top-1 left-1 text-[0.6rem] text-[#b89569] pointer-events-none">
                  ❦
                </div>
                <div className="absolute top-1 right-1 text-[0.6rem] text-[#b89569] pointer-events-none">
                  ❦
                </div>
              </div>
            </motion.div>
          </div>

          {/* Loading Text: "enter rừng mộng" (cute, dreamy, storybook-style serif font) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-7 flex flex-col items-center"
          >
            <h2
              className="text-2xl sm:text-3xl text-[#3a2c1e] font-normal lowercase tracking-[0.14em]"
              style={{
                fontFamily: 'var(--font-whimsical)',
                textShadow: '0 2px 14px rgba(255, 245, 220, 0.9)',
              }}
            >
              enter rừng mộng
            </h2>
            <p
              className="mt-1 text-xs sm:text-sm italic text-[#846f5a] tracking-[0.08em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              bước vào miền mộng riêng của naomi
            </p>
          </motion.div>

          {/* Delicate Loading Bar with Pastel Gradient & Tiny Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 sm:mt-7 w-60 sm:w-72 flex flex-col items-center"
          >
            {/* The Delicate Loading Bar */}
            <div className="relative w-full h-[5px] bg-[#eadecb]/80 rounded-full overflow-hidden p-[1px] shadow-[0_2px_8px_rgba(80,60,40,0.08)]">
              {/* Animated Pastel Gradient Bar (Pale Pink → Lavender → Pale Blue → Soft Gold) */}
              <div
                className="h-full rounded-full transition-all duration-100 ease-out relative"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, #fbcfe8 0%, #e9d5ff 32%, #bae6fd 68%, #fef08a 100%)',
                  boxShadow: '0 0 10px rgba(240, 200, 245, 0.75)',
                }}
              >
                {/* Tiny Sparkles moving along the completed section */}
                <motion.span
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.9, 1.3, 0.9],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#fff,0_0_12px_#ffd166] flex items-center justify-center text-[0.55rem] text-[#9333ea]"
                >
                  ✦
                </motion.span>
              </div>
            </div>

            {/* Subtle Percentage Readout */}
            <div className="mt-2.5 flex items-center justify-between w-full text-[0.76rem] text-[#7a6753] tracking-[0.12em]">
              <span className="italic" style={{ fontFamily: 'var(--font-serif)' }}>
                chờ một giấc mơ...
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
