import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreatorEntry } from '../../data/creators';

interface SiYingCreatorCardProps {
  creator: CreatorEntry;
  onSelect: () => void;
}

export const SiYingCreatorCard: React.FC<SiYingCreatorCardProps> = ({ creator, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCardClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsTransitioning(false);
      onSelect();
    }, 430);
  };

  return (
    <motion.button
      type="button"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between p-5 sm:p-5.5 rounded-[12px] text-left cursor-pointer transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b3226] hover:-translate-y-2 hover:rotate-[-0.4deg] w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(165deg, rgba(251, 248, 240, 0.98) 0%, rgba(244, 238, 226, 0.96) 52%, rgba(236, 229, 214, 0.96) 100%)',
        border: '1.5px solid rgba(92, 78, 58, 0.72)',
        boxShadow: isHovered
          ? '0 16px 36px rgba(38, 30, 22, 0.2), 4px 5px 0px rgba(62, 50, 36, 0.85), 0 0 22px rgba(218, 206, 184, 0.5) inset'
          : '0 10px 28px rgba(45, 36, 26, 0.14), 3px 3px 0px rgba(82, 68, 50, 0.45), 0 0 16px rgba(228, 218, 198, 0.4) inset',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Aged Newsprint Halftone Grain & Subtle Ink Marks */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(rgba(58, 46, 32, 0.16) 0.75px, transparent 0), radial-gradient(rgba(92, 74, 52, 0.12) 0.75px, transparent 0)',
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0, 6px 6px',
        }}
      />

      {/* Faint Coffee-Cup Ring & Ink Smudge on the Editorial Desk */}
      <svg
        viewBox="0 0 300 460"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-35"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Subtle Coffee Stain Ring near Bottom Left */}
        <circle
          cx="34"
          cy="395"
          r="26"
          stroke="#8c6d46"
          strokeWidth="1.4"
          strokeDasharray="42 10 18 6"
          strokeOpacity="0.45"
        />
        {/* Vertical Newspaper Column Hairline Guides */}
        <line x1="12" y1="36" x2="12" y2="425" stroke="#3b3226" strokeWidth="0.5" strokeOpacity="0.25" />
        <line x1="288" y1="36" x2="288" y2="425" stroke="#3b3226" strokeWidth="0.5" strokeOpacity="0.25" />
        {/* Tiny Ink Registration Crosshairs & Splatter Dots */}
        <circle cx="272" cy="312" r="1.6" fill="#2b2216" fillOpacity="0.55" />
        <circle cx="276" cy="315" r="0.9" fill="#2b2216" fillOpacity="0.45" />
        <circle cx="24" cy="248" r="1.2" fill="#2b2216" fillOpacity="0.5" />
      </svg>

      {/* Corner Print Registration Crop Marks */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#2e261b]/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#2e261b]/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#2e261b]/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#2e261b]/60 pointer-events-none" />

      {/* Newspaper Masthead Micro-Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-double border-[#2e261b]/45 text-[0.6rem] sm:text-[0.64rem] tracking-[0.13em] text-[#4a3e2e] font-mono">
        <span className="uppercase font-semibold">TÒA SOẠN CỔ THỤ</span>
        <span className="opacity-70">N° 01 · EXTRA</span>
        <span className="tracking-widest font-serif italic text-[#2b2216] font-semibold">Vol. VII</span>
      </div>

      {/* Editorial Red/Sepia Ink Stamp: [ PRESS PASS ] */}
      <div className="absolute top-10 right-6 z-20 pointer-events-none transform rotate-[7deg] opacity-85 group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-[4deg] transition-all duration-300">
        <span className="px-1.5 py-0.5 border-[1.5px] border-[#8a3b2e]/85 text-[#8a3b2e] text-[0.58rem] font-mono font-bold tracking-[0.12em] uppercase bg-[#faf3e6]/95 shadow-2xs rounded-[2px]">
          [ PRESS PASS ]
        </span>
      </div>

      {/* Hover Effect: Editorial Rubber Stamp & Typewriter Ink Strike */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.25, rotate: -14 }}
            animate={{ opacity: 0.92, scale: 1, rotate: -9 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute bottom-14 right-4 z-20 pointer-events-none"
          >
            <div className="px-2 py-0.5 border-2 border-double border-[#7d2e22]/80 text-[#7d2e22] bg-[#f9f1e2]/90 font-mono text-[0.56rem] uppercase tracking-[0.16em] font-bold shadow-xs">
              ✓ IN ẤN · BẢN ĐẶC BIỆT
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Transition Overlay: Newspaper Broadsheet Flash & Ink Stamp */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
            className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                'linear-gradient(160deg, rgba(247, 241, 227, 0.96) 0%, rgba(232, 222, 202, 0.94) 100%)',
            }}
          >
            <motion.div
              initial={{ scale: 1.5, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: -4, opacity: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="px-3.5 py-1.5 border-2 border-[#2b2216] bg-[#fdfaf2] shadow-md text-center"
            >
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#8a3b2e] font-bold">
                EXTRA EDITION · PRESS DESK
              </span>
              <span
                className="block text-xs font-bold tracking-[0.14em] uppercase text-[#1f1912] mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                MỞ CỬA TÒA SOẠN...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Creator Artwork: Vintage European Newspaper Halftone Frame */}
      <div className="relative z-10 w-full aspect-[4/3] rounded-[6px] overflow-hidden p-1 shadow-[0_4px_14px_rgba(38,30,20,0.16)] mb-3 bg-[#f5efe2] border-2 border-[#2b2216]">
        {/* Double Hairline Inner Newspaper Border */}
        <div className="relative w-full h-full rounded-[3px] overflow-hidden border border-[#4a3c2c]/55">
          <video
            ref={videoRef}
            src={creator.mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] sepia-[0.08] group-hover:brightness-[1.05] group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Aged Broadsheet Ink Scrim */}
          <div className="absolute inset-0 pointer-events-none border border-[#fffcf4]/40 shadow-[inset_0_0_16px_rgba(20,15,10,0.24)]" />

          {/* Newspaper Column Caption Tag (Mascot) */}
          <div
            className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-[2px] flex items-center gap-1.5 border border-[#2b2216]/45 text-[0.62rem] text-[#1f1810] shadow-2xs font-mono"
            style={{ background: 'rgba(252, 247, 236, 0.94)' }}
          >
            <span>{creator.mascot}</span>
            <span className="uppercase tracking-wider font-semibold">{creator.mascotLabel}</span>
          </div>
        </div>
      </div>

      {/* Micro Typewriter Dateline */}
      <div className="relative z-10 w-full flex items-center justify-between px-0.5 mb-1 font-mono text-[0.58rem] text-[#5e4f3d] uppercase tracking-[0.1em]">
        <span>⌨ BÀN BIÊN TẬP SỐ 03</span>
        <span>SILVESTRE PRESS</span>
      </div>

      {/* 2. Creator Name Area: Editorial badge masthead decoration + exact text 'Si Ying' */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-2">
        {/* Editorial decoration: attached 'HELLO my name is Si Ying' badge sticker */}
        <div className="relative flex justify-center items-center group-hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/aistudio/image_aa1c20d9.png"
            alt="Si Ying editorial masthead badge"
            className="w-28 sm:w-32 md:w-36 h-auto object-contain rounded-[4px] shadow-[0_3px_10px_rgba(35,25,15,0.18),0_1px_2px_rgba(0,0,0,0.12)] border border-[#3b2d1d]/25 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Creator Name text: exact text 'Si Ying' */}
        <h3
          className="relative text-center text-lg sm:text-[1.28rem] font-bold text-[#1c1610] tracking-[0.14em] group-hover:text-[#000000] transition-colors leading-tight mt-1.5"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 1px 0px rgba(255, 255, 255, 0.85)',
          }}
        >
          {creator.name}
        </h3>
      </div>

      {/* 3. Newspaper Oxford Double Hairline Rule Divider */}
      <div className="relative z-10 my-2 w-full flex flex-col items-center gap-[2px] opacity-85 group-hover:opacity-100 transition-opacity">
        <span className="w-11/12 h-[1.5px] bg-[#2b2216]" />
        <div className="flex items-center gap-2 text-[0.6rem] text-[#524332] font-mono">
          <span className="w-10 h-[0.5px] bg-[#6e5d48]" />
          <span>❖</span>
          <span className="w-10 h-[0.5px] bg-[#6e5d48]" />
        </div>
        <span className="w-11/12 h-[0.5px] bg-[#2b2216]" />
      </div>

      {/* 4. Creator Information: Byline in Editorial Serif */}
      <p
        className="relative z-10 text-[0.76rem] text-[#4f4130] tracking-[0.14em] lowercase italic mb-2.5 text-center"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        byline — {creator.creatorTag || 'creator name: si ying'}
      </p>

      {/* 5. Newspaper Clipping Cutout Quote */}
      <div
        className="relative z-10 w-full p-3 rounded-[4px] border-l-2 border-r-2 border-t border-b border-[#332a1e] my-auto text-center bg-[#fcf8ef] shadow-[2px_2px_0px_rgba(45,36,26,0.12)]"
      >
        <span className="block text-[0.56rem] font-mono uppercase tracking-[0.18em] text-[#735e46] mb-1 border-b border-dotted border-[#8c765c]/45 pb-0.5">
          — TRÍCH BÌNH LUẬN TOÀ SOẠN —
        </span>
        <p
          className="text-sm sm:text-[0.95rem] text-[#17120d] leading-snug font-bold tracking-wide pt-0.5"
          style={{
            fontFamily: 'var(--font-serif)',
          }}
        >
          &ldquo;{creator.introduction}&rdquo;
        </p>
      </div>

      {/* 6. Editorial Footer Navigation */}
      <div className="relative z-10 w-full mt-3.5 pt-2.5 border-t-2 border-double border-[#2e261b]/35 flex items-center justify-between text-xs text-[#3b3023] tracking-[0.1em] group-hover:text-[#0d0a06] transition-colors font-mono">
        <span className="italic text-[0.68rem] text-[#5e4e3b]" style={{ fontFamily: 'var(--font-serif)' }}>
          {creator.territoryName}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2b2216] text-[#faf5eb] rounded-[3px] font-mono text-[0.66rem] uppercase tracking-[0.12em] group-hover:bg-[#17120c] transition-colors">
          <span>vào tòa soạn</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.button>
  );
};
