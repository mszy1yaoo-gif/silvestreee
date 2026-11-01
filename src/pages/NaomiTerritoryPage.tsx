import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { NaomiPersonalLoadingScreen } from '../components/territory/naomi/NaomiPersonalLoadingScreen';
import { NaomiAnnouncementAndSocials } from '../components/territory/naomi/NaomiAnnouncementAndSocials';
import { NaomiAboutMeCard } from '../components/territory/naomi/NaomiAboutMeCard';
import { NaomiUtilities } from '../components/territory/naomi/NaomiUtilities';
import { NaomiCharacterArchive } from '../components/territory/naomi/NaomiCharacterArchive';

export const NaomiTerritoryPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [hasLoaded]);

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto selection:bg-[#f3cbd4]/70 selection:text-[#42222a]"
      style={{
        backgroundColor: '#faf3ec',
      }}
    >
      {/* 1. Naomi's Personal Loading Screen */}
      <AnimatePresence>
        {!hasLoaded && (
          <NaomiPersonalLoadingScreen onComplete={() => setHasLoaded(true)} />
        )}
      </AnimatePresence>

      {/* 2. Full-Screen Background Video + Vintage Pink Fairy-Tale Garden Atmosphere */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#f6ecdf]">
        <video
          ref={videoRef}
          src="/assets/aistudio/5cf2f8259850b019ffd979ec419da84c_e8fc54c4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter brightness-[1.07] contrast-[0.96] sepia-[0.16] hue-rotate-[-8deg] transition-transform duration-700 ease-out"
          style={{
            transform: `scale(1.04) translate(${coords.x * -5}px, ${coords.y * -5}px)`,
          }}
        />

        {/* Warm Pastel Pink & Cream Fairy-Tale Glow Veil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 78% at 50% 36%, rgba(255, 248, 244, 0.58) 0%, rgba(253, 240, 242, 0.48) 46%, rgba(246, 230, 235, 0.6) 82%, rgba(234, 214, 222, 0.72) 100%)',
          }}
        />

        {/* Soft Diagonal Blush Pink & Champagne Sunlight Rays */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              'linear-gradient(125deg, rgba(255, 235, 240, 0.5) 0%, transparent 35%, rgba(255, 243, 225, 0.35) 55%, transparent 80%)',
          }}
        />

        {/* Fine Antique Parchment Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(rgba(142, 102, 110, 0.18) 1px, transparent 0), radial-gradient(rgba(168, 128, 112, 0.14) 1px, transparent 0)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        {/* Soft Drifting Pink Petals & Golden Spores */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${(i * 8 + 5) % 92}vw`,
                y: `${(i * 11 + 8) % 88}vh`,
                opacity: 0.22,
                scale: 0.7,
              }}
              animate={{
                y: [
                  `${(i * 11 + 8) % 88}vh`,
                  `${((i * 11 + 8) % 88) - 16}vh`,
                  `${(i * 11 + 8) % 88}vh`,
                ],
                x: [
                  `${(i * 8 + 5) % 92}vw`,
                  `${((i * 8 + 5) % 92) + 3}vw`,
                  `${(i * 8 + 5) % 92}vw`,
                ],
                opacity: [0.2, 0.78, 0.2],
                scale: [0.7, 1.15, 0.7],
              }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.35,
              }}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  i % 3 === 0
                    ? 'rgba(242, 186, 198, 0.9)'
                    : i % 3 === 1
                      ? 'rgba(246, 218, 160, 0.88)'
                      : 'rgba(210, 178, 215, 0.85)',
                boxShadow: '0 0 8px rgba(245, 196, 208, 0.85)',
              }}
            />
          ))}
        </div>
      </div>

      {/* 3. Layered Renaissance Storybook Outer Viewport Frame (Blush Gold Accents) */}
      <div className="fixed inset-1 sm:inset-3.5 md:inset-5 pointer-events-none z-20">
        {/* Outer Antique-Gold & Blush Rule */}
        <div
          className="absolute inset-0"
          style={{
            border: '1px solid rgba(184, 142, 126, 0.55)',
            boxShadow: 'inset 0 0 40px rgba(255, 236, 240, 0.4)',
          }}
        />
        {/* Inner Engraved Double Line */}
        <div
          className="absolute inset-1 sm:inset-2"
          style={{
            border: '0.8px solid rgba(196, 154, 134, 0.4)',
          }}
        />

        {/* 4 Ornate Renaissance Corner Engravings with Pink Accents */}
        {[
          { pos: 'top-0 left-0', transform: 'none' },
          { pos: 'top-0 right-0', transform: 'scaleX(-1)' },
          { pos: 'bottom-0 left-0', transform: 'scaleY(-1)' },
          { pos: 'bottom-0 right-0', transform: 'scale(-1, -1)' },
        ].map((corner, idx) => (
          <svg
            key={idx}
            viewBox="0 0 90 90"
            className={`absolute ${corner.pos} w-10 h-10 sm:w-20 sm:h-20 text-[#b57c86] opacity-75 sm:opacity-85`}
            style={{ transform: corner.transform }}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 2 68 L 2 14 C 2 6, 6 2, 14 2 L 68 2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M 7 54 L 7 16 C 7 10, 10 7, 16 7 L 54 7"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            <path
              d="M 7 28 C 16 26, 26 16, 28 7"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M 12 36 C 22 34, 34 22, 36 12"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.7"
            />
            <circle cx="14" cy="14" r="3" fill="#e8b4be" fillOpacity="0.75" />
            <circle cx="14" cy="14" r="1.3" fill="#8f4956" />
            <path
              d="M 23 12 C 26 9, 31 10, 29 14 C 26 15, 23 12, 23 12 Z"
              fill="#94a88f"
              fillOpacity="0.6"
            />
            <path
              d="M 12 23 C 9 26, 10 31, 14 29 C 15 26, 12 23, 12 23 Z"
              fill="#94a88f"
              fillOpacity="0.6"
            />
            <circle cx="42" cy="5" r="1.4" fill="#d896a2" />
            <circle cx="5" cy="42" r="1.4" fill="#d896a2" />
          </svg>
        ))}
      </div>

      {/* 4. Utility Ornaments */}
      <NaomiUtilities />

      {/* 5. Fairytale Atmospheric Decorative Illustrations */}
      {/* 5A. Overgrown Classical Roman Column with Ivy & Wild Roses (Left Flank) */}
      <div className="fixed left-1 sm:left-3 md:left-6 lg:left-8 bottom-0 pointer-events-none select-none z-10 hidden sm:block">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.94, x: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-36 sm:w-44 md:w-52 lg:w-60 max-h-[70vh]"
        >
          <motion.img
            src="/assets/aistudio/image_5b502fbc.png"
            alt="Cột đá cổ phủ hoa hồng và dây leo trong rừng mộng"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-auto object-contain filter contrast-[1.03] brightness-[1.01]"
            style={{
              filter: 'drop-shadow(6px 12px 24px rgba(62, 38, 44, 0.18))',
            }}
          />
          <motion.span
            animate={{
              y: [0, -14, 0],
              opacity: [0.2, 0.75, 0.2],
              x: [0, 8, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 right-3 w-1.5 h-1.5 rounded-full bg-[#f4cad4] pointer-events-none"
            style={{ boxShadow: '0 0 6px #f4cad4' }}
          />
        </motion.div>
      </div>

      {/* 5B. Whimsical Hanging Silk Lantern with Cherry Blossoms (Top-Right Canopy) */}
      <div className="fixed right-3 sm:right-6 md:right-12 lg:right-16 top-0 pointer-events-none select-none z-10 hidden md:block">
        <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-[#c8929e] to-[#9a6572] mx-auto opacity-75" />

        <motion.div
          initial={{ opacity: 0, y: -20, rotate: 4 }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: [-2, 2, -2],
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.3 },
            y: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
            rotate: {
              duration: 5.8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{ transformOrigin: 'top center' }}
          className="relative w-28 sm:w-36 md:w-44 -mt-1"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-44 h-32 sm:h-44 rounded-full pointer-events-none blur-xl opacity-65"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 226, 232, 0.78) 0%, rgba(248, 198, 210, 0.35) 55%, transparent 80%)',
            }}
          />

          <img
            src="/assets/aistudio/image_d9d9a154.png"
            alt="Đèn lồng hoa đào treo giữa rừng mộng"
            className="w-full h-auto object-contain filter contrast-[1.04] brightness-[1.02]"
            style={{
              filter: 'drop-shadow(0 10px 22px rgba(72, 45, 52, 0.18))',
            }}
          />

          <motion.span
            animate={{
              y: [0, 16, 30],
              opacity: [0, 0.85, 0],
              scale: [0.6, 1.2, 0.4],
            }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#fde8aa] pointer-events-none"
            style={{ boxShadow: '0 0 8px #fde8aa' }}
          />
        </motion.div>
      </div>

      {/* 6. Continuous Illustrated Storybook Manuscript Container */}
      <div className="relative z-10 w-full min-h-screen py-4 sm:py-12 px-2.5 sm:px-8 md:px-14 flex flex-col items-center justify-between">
        {/* Top Manuscript Folio Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Điều hướng bản thảo Rừng Mộng"
          className="w-full max-w-6xl flex items-center justify-between pb-3 px-1 sm:px-2 pt-14 sm:pt-0 border-b border-[#c89e96]/35"
        >
          {/* Back to Central Clearing */}
          <button
            type="button"
            onClick={() => navigateTo('forest-map')}
            className="group inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-[0.8rem] text-[#54363d] hover:text-[#2d181e] tracking-[0.14em] lowercase transition-all cursor-pointer focus:outline-none"
            style={{
              fontFamily: 'var(--font-serif)',
              background: 'rgba(253, 244, 246, 0.8)',
              border: '1px solid rgba(202, 156, 164, 0.6)',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(72, 45, 52, 0.05)',
            }}
          >
            <span
              className="text-xs text-[#a06472] transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            >
              ⟵
            </span>
            <span className="italic">khoảng rừng trung tâm</span>
          </button>

          {/* Folio Running Header */}
          <div className="hidden sm:flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.26em] text-[#8c606a]">
            <span>✦</span>
            <span style={{ fontFamily: 'var(--font-serif)' }}>
              CODEX SILVESTRE · FOLIO RỪNG MỘNG
            </span>
            <span>✦</span>
          </div>

          {/* Discord Link Plaque */}
          <a
            href="https://discord.gg/silvestre"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-xs sm:text-[0.8rem] italic text-[#54363d] hover:text-[#2d181e] tracking-[0.14em] transition-all focus:outline-none"
            style={{
              fontFamily: 'var(--font-serif)',
              background: 'rgba(253, 244, 246, 0.8)',
              border: '1px solid rgba(202, 156, 164, 0.6)',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(72, 45, 52, 0.05)',
            }}
          >
            our discord ↗
          </a>
        </motion.nav>

        {/* Continuous Manuscript Sheet uniting Header, Notice, About Me, Character Archive */}
        <main className="relative w-full max-w-6xl my-4 sm:my-8 pt-2 sm:pt-4">
          {/* Outer Illuminated Manuscript Parchment Sheet */}
          <div
            className="relative w-full px-3 sm:px-8 md:px-12 py-6 sm:py-14 overflow-visible"
            style={{
              borderRadius: '5px 7px 5px 7px',
              background:
                'linear-gradient(180deg, #fefaf6 0%, #fbf3ec 45%, #f6ebdf 100%)',
              border: '1.5px solid rgba(192, 150, 134, 0.72)',
              boxShadow:
                '0 24px 64px rgba(62, 38, 44, 0.15), 0 0 0 5px rgba(254, 247, 242, 0.6), 0 0 48px rgba(248, 218, 224, 0.6) inset',
            }}
          >
            {/* Inner Double Antique-Gold & Blush Rule */}
            <div
              className="absolute inset-2 sm:inset-3 pointer-events-none"
              style={{
                border: '1px solid rgba(198, 156, 140, 0.48)',
              }}
            />
            <div
              className="absolute inset-3 sm:inset-4 pointer-events-none"
              style={{
                border: '0.6px dashed rgba(188, 146, 128, 0.42)',
              }}
            />

            {/* Subtle Aged Parchment Paper Fiber Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(152, 108, 116, 0.18) 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* =================================================================
                1 & 2. RỪNG MỘNG — TITLE + "by naomi" (NO OLD SUBTITLE)
               ================================================================= */}
            <motion.header
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center max-w-3xl mx-auto mb-8 sm:mb-10 pt-2"
            >
              {/* Small Decorative Ornament Above Title */}
              <div className="flex items-center justify-center gap-2.5 mb-2 opacity-85">
                <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d096a2] to-[#ab6574]" />
                <span className="text-[0.7rem] tracking-[0.28em] uppercase text-[#945664]" style={{ fontFamily: 'var(--font-serif)' }}>
                  ❧ CAPITULUM I · HERBARIUM ROSARUM ❧
                </span>
                <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#d096a2] to-[#ab6574]" />
              </div>

              {/* Main Chapter Title: RỪNG MỘNG */}
              <div className="relative inline-block px-4 py-1">
                <div
                  className="absolute inset-0 pointer-events-none blur-2xl opacity-75"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255, 215, 224, 0.8) 0%, rgba(242, 182, 196, 0.25) 65%, transparent 100%)',
                  }}
                />
                <h1
                  className="relative text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.22em] text-[#42222a] font-normal select-text"
                  style={{
                    fontFamily: 'var(--font-display)',
                    textShadow:
                      '0 1px 0 rgba(255, 250, 252, 0.95), 0 2px 14px rgba(206, 138, 152, 0.32)',
                  }}
                >
                  RỪNG MỘNG
                </h1>
              </div>

              {/* Exact Replacement: "by naomi" in distinctive elegant handwritten/signature font */}
              <div className="mt-2.5">
                <span
                  className="text-xl sm:text-2xl text-[#b0586b] italic tracking-[0.08em] font-normal select-none"
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    filter: 'drop-shadow(0 1px 4px rgba(176, 88, 107, 0.25))',
                  }}
                >
                  by naomi
                </span>
              </div>

              {/* Engraved Botanical Divider */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <svg
                  viewBox="0 0 320 22"
                  className="w-56 sm:w-72 h-5 text-[#b57c86]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 10 11 L 122 11 M 198 11 L 310 11"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeOpacity="0.65"
                  />
                  <path
                    d="M 40 11 C 55 5, 75 17, 95 11"
                    stroke="#879e82"
                    strokeWidth="0.85"
                    strokeOpacity="0.65"
                  />
                  <path
                    d="M 225 11 C 245 5, 265 17, 280 11"
                    stroke="#879e82"
                    strokeWidth="0.85"
                    strokeOpacity="0.65"
                  />
                  <circle cx="140" cy="11" r="2" fill="#e2b4be" />
                  <path
                    d="M 160 4 L 163 9 L 168 11 L 163 13 L 160 18 L 157 13 L 152 11 L 157 9 Z"
                    fill="#cc8594"
                  />
                  <circle cx="180" cy="11" r="2" fill="#e2b4be" />
                </svg>
              </div>
            </motion.header>

            {/* =================================================================
                3. MOVE "CHÂN DUNG CHỦ VƯỜN" / ABOUT ME TO THE TOP
               ================================================================= */}
            <div className="relative z-10 mb-10 sm:mb-12">
              <NaomiAboutMeCard />
            </div>

            {/* =================================================================
                4. PINNED RENAISSANCE NOTICE
               ================================================================= */}
            <div className="relative z-10 mb-8 sm:mb-10">
              <NaomiAnnouncementAndSocials />
            </div>

            {/* =================================================================
                5 & 6. "bộ sưu tập rừng mộng" + "pick chồng để măm măm (๑>◡<๑)"
                + CHARACTER ARCHIVE
               ================================================================= */}
            <div className="relative z-10 pt-4 border-t border-dashed border-[#d8b4bc]/60">
              {/* Collection Heading as Requested: Only pick chồng để măm măm (๑>◡<๑) */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#fdf4f6] border border-[#dca6b2] mb-2.5 shadow-2xs"
                  style={{ borderRadius: '3px' }}
                >
                  <span className="text-[0.68rem] text-[#b36778]">✿</span>
                  <span
                    className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8c525f]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    INDEX PERSONARUM · RỪNG MỘNG
                  </span>
                  <span className="text-[0.68rem] text-[#b36778]">✿</span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl text-[#3f2027] font-normal lowercase tracking-[0.1em]"
                  style={{ fontFamily: 'var(--font-whimsical)' }}
                >
                  pick chồng để măm măm (๑&gt;◡&lt;๑)
                </h2>
              </div>

              <NaomiCharacterArchive />
            </div>
          </div>
        </main>

        {/* Footer Colophon */}
        <footer className="w-full max-w-4xl pt-3 pb-4 text-center">
          <div className="inline-flex items-center gap-2.5 text-xs italic text-[#6e4650] tracking-[0.12em]" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="text-[#b57c86]">❦</span>
            <span>Mộ Sương Chi Ức Dao — bản thảo khu vườn mộng hồng ngà được gìn giữ qua năm tháng</span>
            <span className="text-[#b57c86]">❦</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
