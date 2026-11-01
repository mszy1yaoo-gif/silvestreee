import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreatorEntry } from '../../data/creators';

interface NoiTrienDongCreatorCardProps {
  creator: CreatorEntry;
  onSelect: () => void;
}

export const NoiTrienDongCreatorCard: React.FC<NoiTrienDongCreatorCardProps> = ({
  creator,
  onSelect,
}) => {
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
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between p-5 sm:p-5.5 text-left cursor-pointer transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6b77] hover:-translate-y-2 w-full overflow-hidden"
      style={{
        // Arched Antique Memorial Plaque & Old Gothic Storybook Shape
        borderRadius: '34px 34px 16px 16px',
        background:
          'linear-gradient(170deg, rgba(247, 241, 232, 0.97) 0%, rgba(235, 226, 224, 0.95) 52%, rgba(224, 214, 215, 0.96) 100%)',
        border: '1.5px solid rgba(138, 114, 122, 0.72)',
        boxShadow: isHovered
          ? '0 16px 38px rgba(52, 42, 46, 0.2), 0 4px 0px rgba(145, 125, 130, 0.6), 0 0 26px rgba(212, 182, 140, 0.38) inset'
          : '0 10px 28px rgba(56, 45, 49, 0.14), 0 3px 0px rgba(156, 138, 142, 0.5), 0 0 18px rgba(206, 190, 182, 0.32) inset',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* 1. Weathered Stone & Aged Parchment Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(rgba(82, 68, 72, 0.16) 1px, transparent 0), radial-gradient(rgba(128, 108, 96, 0.14) 1px, transparent 0)',
          backgroundSize: '15px 15px',
          backgroundPosition: '0 0, 7.5px 7.5px',
        }}
      />

      {/* Wrought-Iron Frame, Thorny Vines, Cracked Stone Lines, Antique Key & Dried Roses SVG */}
      <svg
        viewBox="0 0 300 460"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Engraved Inner Cemetery Plaque Arch Border */}
        <path
          d="M 9 38 C 9 18, 26 8, 52 8 L 248 8 C 274 8, 291 18, 291 38 L 291 446 C 291 450, 287 452, 282 452 L 18 452 C 13 452, 9 450, 9 446 Z"
          stroke="#7d6870"
          strokeWidth="1"
          strokeOpacity="0.52"
        />

        {/* Subtle Weathered Stone Hairline Cracks */}
        <path
          d="M 9 148 L 21 154 L 16 163 L 26 169"
          stroke="#6b5a60"
          strokeWidth="0.7"
          strokeOpacity="0.45"
        />
        <path
          d="M 291 278 L 278 284 L 283 292"
          stroke="#6b5a60"
          strokeWidth="0.7"
          strokeOpacity="0.42"
        />

        {/* Wrapping Thorny Vine along Left & Top Arch */}
        <path
          d="M 6 340 C 14 275, 4 210, 12 140 C 16 90, 8 42, 42 14 C 66 4, 98 12, 130 8"
          stroke="#594a4f"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeOpacity="0.68"
        />
        {/* Tiny Thorns along Left Vine */}
        <path d="M 11 220 L 5 216 L 11 214" fill="#594a4f" fillOpacity="0.68" />
        <path d="M 10 175 L 16 171 L 10 169" fill="#594a4f" fillOpacity="0.68" />
        <path d="M 14 115 L 7 110 L 14 108" fill="#594a4f" fillOpacity="0.68" />
        <path d="M 24 28 L 19 22 L 26 23" fill="#594a4f" fillOpacity="0.68" />

        {/* Faded Sage Leaves & Muted Burgundy Dried Roses on Vine */}
        <path d="M 14 195 C 22 189, 25 196, 16 201 Z" fill="#7d8a78" fillOpacity="0.58" />
        <path d="M 16 88 C 24 82, 26 90, 17 94 Z" fill="#7d8a78" fillOpacity="0.58" />
        {/* Dried Burgundy Rose at Top-Left Arch */}
        <circle cx="24" cy="24" r="4.8" fill="#7d3c4c" fillOpacity="0.82" />
        <circle cx="22.5" cy="23" r="2.6" fill="#9e5b6b" fillOpacity="0.88" />
        <circle cx="24" cy="24" r="1.2" fill="#c7a670" />

        {/* Wrapping Thorny Vine along Bottom-Right */}
        <path
          d="M 294 330 C 286 385, 294 428, 264 448 C 242 456, 210 450, 180 452"
          stroke="#594a4f"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />
        <path d="M 289 375 L 295 371 L 289 369" fill="#594a4f" fillOpacity="0.65" />
        <path d="M 288 412 C 280 406, 278 414, 286 418 Z" fill="#7d8a78" fillOpacity="0.55" />
        {/* Dried Mauve Rose at Bottom-Right */}
        <circle cx="276" cy="440" r="4.4" fill="#824656" fillOpacity="0.82" />
        <circle cx="276" cy="440" r="2" fill="#b07b8a" />

        {/* Antique Brass Skeleton Key Hanging at Top Right */}
        <g transform="translate(268, 16)" opacity="0.82">
          <circle cx="6" cy="5" r="4" stroke="#b39259" strokeWidth="1.3" fill="none" />
          <circle cx="6" cy="5" r="1.5" fill="#b39259" />
          <line x1="6" y1="9" x2="6" y2="22" stroke="#b39259" strokeWidth="1.3" />
          <line x1="6" y1="18" x2="10" y2="18" stroke="#b39259" strokeWidth="1.2" />
          <line x1="6" y1="21" x2="9.5" y2="21" stroke="#b39259" strokeWidth="1.2" />
        </g>
      </svg>

      {/* Hover Effect: Tiny Nocturnal Moth + Drifting Dried Leaves & Wilted Petals */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          >
            {/* Fluttering Fairy-Tale Moth */}
            <motion.div
              initial={{ x: 20, y: 80, opacity: 0, rotate: -12 }}
              animate={{
                x: [20, 48, 34],
                y: [80, 46, 28],
                opacity: [0, 0.92, 0.75],
                rotate: [-12, 8, -6],
                scale: [0.85, 1.05, 0.9],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 right-8"
            >
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
                <path
                  d="M 11 9 C 6 2, 1 3, 2 9 C 3 13, 8 12, 11 9 Z"
                  fill="#c8b098"
                  stroke="#59464c"
                  strokeWidth="0.8"
                />
                <path
                  d="M 11 9 C 16 2, 21 3, 20 9 C 19 13, 14 12, 11 9 Z"
                  fill="#c8b098"
                  stroke="#59464c"
                  strokeWidth="0.8"
                />
                <line x1="11" y1="5" x2="11" y2="14" stroke="#3d2e33" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Drifting Dried Winter Leaves & Burgundy Rose Petals */}
            {[
              { left: '16%', top: '20%', color: '#824252', delay: 0.05 },
              { left: '78%', top: '38%', color: '#8b9482', delay: 0.2 },
              { left: '24%', top: '64%', color: '#a88468', delay: 0.32 },
              { left: '72%', top: '74%', color: '#7a3b4b', delay: 0.15 },
            ].map((leaf, idx) => (
              <motion.span
                key={`dried-leaf-${idx}`}
                initial={{ opacity: 0, y: -6, rotate: 0 }}
                animate={{
                  opacity: [0, 0.85, 0],
                  y: [-4, 22, 40],
                  x: [0, idx % 2 === 0 ? -10 : 10, idx % 2 === 0 ? -14 : 14],
                  rotate: [0, 65, 140],
                }}
                transition={{
                  duration: 2.8,
                  delay: leaf.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-2.5 h-1.5 rounded-[50%_0_50%_0]"
                style={{
                  left: leaf.left,
                  top: leaf.top,
                  backgroundColor: leaf.color,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Transition Overlay: Moth & Falling Dried Rose Leaves */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden"
            style={{
              background:
                'radial-gradient(circle, rgba(242, 232, 222, 0.92) 0%, rgba(216, 198, 204, 0.88) 65%, rgba(190, 172, 178, 0.92) 100%)',
            }}
          >
            {[...Array(10)].map((_, idx) => {
              const angle = (idx * 36 * Math.PI) / 180;
              const dist = 42 + (idx % 3) * 20;
              return (
                <motion.span
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist + 10,
                    scale: [0.5, 1.2, 0.6],
                    opacity: [1, 0.9, 0],
                  }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                  className="absolute text-sm"
                >
                  {idx % 3 === 0 ? '🥀' : idx % 3 === 1 ? '🍂' : '🕯️'}
                </motion.span>
              );
            })}
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              className="text-xs italic tracking-[0.16em] text-[#3b2c32] font-medium px-3.5 py-1 rounded-full bg-[#f8f2ea]/95 border border-[#8f727d]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              bước qua cổng sắt cổ...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Engraved Cemetery Plaque Crest & Wrought-Iron Motif */}
      <div className="relative z-10 w-full flex items-center justify-between pb-1.5 mb-2.5 border-b border-[#8c757e]/40 text-[0.62rem] text-[#59484f]">
        <span className="uppercase tracking-[0.16em]" style={{ fontFamily: 'var(--font-serif)' }}>
          † bia đá mùa đông
        </span>
        <span className="inline-flex items-center gap-1 text-[#7d5c48]" style={{ fontFamily: 'var(--font-serif)' }}>
          <span>🕯️</span>
          <span className="italic">cổ tích lãng quên</span>
        </span>
      </div>

      {/* 1. Arched Gothic Storybook Plaque Image Frame */}
      <div
        className="relative z-10 w-full aspect-[4/3] overflow-hidden p-1.5 mb-3 bg-gradient-to-b from-[#ebe2dc] via-[#dfd2d4] to-[#d4c4c8] border border-[#8e767f] shadow-[0_4px_16px_rgba(48,36,42,0.16)]"
        style={{
          borderRadius: '26px 26px 10px 10px',
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden border border-[#5e4c53]/45"
          style={{ borderRadius: '21px 21px 6px 6px' }}
        >
          <img
            src={creator.mediaSrc}
            alt="Nơi triền đông đượm yên — Forgotten fairy-tale winter cemetery"
            className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.05] sepia-[0.1] group-hover:brightness-[1.04] group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Melancholic Winter Mist & Aged Vignette */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_18px_rgba(38,28,32,0.28)]" />

          {/* Mascot Plaque Tag (🦊 Xích Hồ) */}
          <div
            className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-[4px] flex items-center gap-1 border border-[#8c737c]/75 text-[0.66rem] text-[#382a30] shadow-2xs"
            style={{ background: 'rgba(247, 241, 234, 0.92)' }}
          >
            <span>{creator.mascot}</span>
            <span className="italic" style={{ fontFamily: 'var(--font-serif)' }}>
              {creator.mascotLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Small Cemetery Sign & Dried Rose Whisper */}
      <div className="relative z-10 w-full flex items-center justify-between px-1 mb-1 text-[0.65rem] text-[#66525a] opacity-85">
        <span className="italic" style={{ fontFamily: 'var(--font-serif)' }}>
          🥀 lối sương phủ qua hàng bia cổ
        </span>
        <span className="text-[#9e7d52]">☾</span>
      </div>

      {/* 2. Engraved Storybook Title: NƠI TRIỀN ĐÔNG ĐƯỢM YÊN. */}
      <h3
        className="relative z-10 w-full text-center text-base sm:text-[1.15rem] font-semibold text-[#33252b] tracking-[0.05em] group-hover:text-[#1f1519] transition-colors leading-snug"
        style={{
          fontFamily: 'Georgia, "Times New Roman", Cambria, serif',
          textShadow: '0 1px 0px rgba(255, 250, 245, 0.9), 0 -1px 0px rgba(60, 45, 50, 0.15)',
        }}
      >
        {creator.name}
      </h3>

      {/* 3. Wrought-Iron & Thorny Rose Divider */}
      <div className="relative z-10 my-1.5 w-full flex items-center justify-center gap-2 opacity-85">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#7a626b]" />
        <span className="text-[0.6rem] text-[#7a3e4d]">🥀</span>
        <span className="text-[0.68rem] text-[#59464e]">⚜</span>
        <span className="text-[0.6rem] text-[#7a3e4d]">🥀</span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#7a626b]" />
      </div>

      {/* 4. Creator Name Engraved Subtitle */}
      <p
        className="relative z-10 text-center text-xs sm:text-[0.78rem] text-[#5e4b53] tracking-[0.14em] lowercase italic mb-2"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {creator.creatorTag || 'creator name: chấm'}
      </p>

      {/* 5. Aged Stone & Parchment Epitaph Plaque for the Fairy-Tale Fragment */}
      <div
        className="relative z-10 w-full p-3 rounded-[8px] border border-[#a8929a] my-auto text-center shadow-[inset_0_1px_6px_rgba(65,50,56,0.09)]"
        style={{
          background:
            'linear-gradient(155deg, rgba(248, 243, 236, 0.9) 0%, rgba(236, 226, 225, 0.88) 100%)',
        }}
      >
        {/* Tiny Corner Iron Rivets */}
        <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#7a646c]" />
        <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#7a646c]" />
        <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#7a646c]" />
        <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#7a646c]" />

        <p
          className="text-[0.86rem] sm:text-[0.9rem] text-[#38292f] leading-relaxed italic px-1"
          style={{
            fontFamily: 'var(--font-serif)',
          }}
        >
          &ldquo;{creator.introduction}&rdquo;
        </p>
      </div>

      {/* 6. Bottom Cemetery Path Navigation */}
      <div className="relative z-10 w-full mt-3.5 pt-2.5 border-t border-[#8c757e]/45 flex items-center justify-between text-xs text-[#4a3940] group-hover:text-[#261b20] transition-colors">
        <span className="inline-flex items-center gap-1 text-[0.68rem] italic text-[#6b565f]" style={{ fontFamily: 'var(--font-serif)' }}>
          <span>🗝️</span>
          <span>cổng sắt mùa đông</span>
        </span>

        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] bg-[#dfd3d5]/90 group-hover:bg-[#d2c2c6] border border-[#8e757f]/75 text-[0.74rem] font-medium text-[#33242a] tracking-[0.08em] transition-all shadow-2xs"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span>nghĩa địa cổ tích</span>
          <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.button>
  );
};
