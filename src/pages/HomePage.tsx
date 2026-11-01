import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useNavigation } from '../context/NavigationContext';

export const HomePage: React.FC = () => {
  const { startForestTransition, isTransitioning, isForestTransitioning } = useNavigation();

  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShowTitle(true);
      setShowSubtitle(true);
      setShowActions(true);
      return;
    }

    const t2 = window.setTimeout(() => setShowTitle(true), 900);
    const t3 = window.setTimeout(() => setShowSubtitle(true), 1800);
    const t4 = window.setTimeout(() => setShowActions(true), 2500);

    return () => {
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, []);

  const handleEnterClick = () => {
    startForestTransition();
  };

  return (
    <main className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6">
      <motion.div
        animate={
          isTransitioning || isForestTransitioning
            ? { opacity: 0, y: -8, filter: 'blur(4px)' }
            : { opacity: 1, y: 0, filter: 'blur(0px)' }
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full pointer-events-auto"
      >
        {/* 1. Main Title — SILVESTRE (Single Line, Bright Fairy-Tale Serif with Champagne Gold Glow) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12, filter: 'blur(6px)' }}
          animate={
            showTitle
              ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.95, y: 12, filter: 'blur(6px)' }
          }
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center w-full"
        >
          {/* Subtle magical sparkles around title */}
          <div className="absolute -top-6 left-1/4 text-amber-200/80 text-xs animate-pulse select-none pointer-events-none">✦</div>
          <div className="absolute -top-4 right-1/4 text-pink-200/80 text-xs animate-pulse select-none pointer-events-none" style={{ animationDelay: '1s' }}>✧</div>
          <div className="absolute -bottom-2 left-1/3 text-amber-100/70 text-[0.6rem] animate-pulse select-none pointer-events-none" style={{ animationDelay: '0.5s' }}>⋆</div>

          <h1
            className="font-normal uppercase text-[#fffdfa] select-none tracking-[0.24em] sm:tracking-[0.28em] pl-[0.24em] sm:pl-[0.28em] animate-magical-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 8vw, 6.8rem)',
              whiteSpace: 'nowrap',
              width: '100%',
              textAlign: 'center',
              textShadow:
                '0 0 25px rgba(255, 246, 220, 0.75), 0 0 50px rgba(245, 220, 180, 0.45), 0 2px 10px rgba(70, 50, 30, 0.35)',
            }}
          >
            {SITE_CONFIG.title}
          </h1>

          {/* Delicate fairytale filament divider with champagne gold jewel */}
          <div
            aria-hidden="true"
            className="mt-3.5 sm:mt-4.5 flex items-center gap-3 opacity-90"
          >
            <span className="w-14 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#f3dfbc] to-[#e6cca3]" />
            <span className="w-2 h-2 rotate-45 bg-[#fcefd2] border border-[#d4b081] shadow-[0_0_8px_rgba(255,235,190,0.9)] animate-blossom-glow" />
            <span className="w-14 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#f3dfbc] to-[#e6cca3]" />
          </div>
        </motion.div>

        {/* 2. Subtitle — "a little world hidden among the trees" */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={
            showSubtitle
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5 italic font-normal text-[#fffaf0] tracking-[0.1em] text-lg sm:text-xl md:text-[1.5rem]"
          style={{
            fontFamily: 'var(--font-serif)',
            textShadow:
              '0 2px 12px rgba(60, 45, 30, 0.65), 0 0 24px rgba(255, 240, 220, 0.45)',
          }}
        >
          {SITE_CONFIG.subtitle}
        </motion.p>

        {/* 3 & 4. Interactive Controls */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={
            showActions
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 sm:mt-11 flex flex-col items-center gap-4 sm:gap-5"
        >
          {/* 3. Primary Enter Button — "♡ wander with us" (Translucent Ivory Glass with Champagne Gold Border) */}
          <button
            type="button"
            onClick={handleEnterClick}
            disabled={isForestTransitioning}
            className="shimmer-effect group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-2.5 sm:px-10 sm:py-3 rounded-[8px] bg-white/28 hover:bg-white/42 backdrop-blur-[8px] border border-[#e6cca3]/70 hover:border-[#fff4dc] text-[#36271c] hover:text-[#1a120b] text-base sm:text-[1.12rem] lowercase font-normal tracking-[0.16em] hover:tracking-[0.2em] shadow-[0_6px_28px_rgba(215,190,150,0.35)] hover:shadow-[0_8px_38px_rgba(255,238,205,0.6)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#e6cca3] whitespace-nowrap shrink-0 disabled:opacity-50 disabled:pointer-events-none"
            style={{
              fontFamily: 'var(--font-serif)',
              textShadow: '0 1px 4px rgba(255, 255, 255, 0.6)',
            }}
          >
            <span
              className="text-[#b87333] text-sm group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(255,200,120,0.9)] transition-all duration-300"
              aria-hidden="true"
            >
              ♡
            </span>
            <span className="pl-[0.12em] group-hover:pl-[0.18em] font-medium transition-all duration-300">
              {SITE_CONFIG.enterPrompt}
            </span>
          </button>

          {/* 4. Secondary Community Link — "our discord" */}
          <a
            href={SITE_CONFIG.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-[6px] bg-white/16 hover:bg-white/28 backdrop-blur-[6px] border border-[#e6cca3]/40 hover:border-[#e6cca3]/85 text-[#4a3a2c] hover:text-[#21160e] text-xs sm:text-sm lowercase italic font-normal tracking-[0.14em] hover:tracking-[0.18em] transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[#e6cca3]/50 whitespace-nowrap shrink-0 shadow-xs"
            style={{
              fontFamily: 'var(--font-serif)',
            }}
          >
            <svg
              className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 group-hover:drop-shadow-[0_0_6px_rgba(184,115,51,0.7)] transition-all duration-300 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="pl-[0.1em] group-hover:pl-[0.16em] transition-all duration-300 font-medium">
              {SITE_CONFIG.discordLabel}
            </span>
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
};
