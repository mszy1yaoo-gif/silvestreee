import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreatorEntry } from '../../data/creators';

interface MongDuVeMayCreatorCardProps {
  creator: CreatorEntry;
  onSelect: () => void;
}

export const MongDuVeMayCreatorCard: React.FC<MongDuVeMayCreatorCardProps> = ({
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
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between p-5 sm:p-5.5 text-left cursor-pointer transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b39cd8] hover:-translate-y-2 w-full overflow-hidden"
      style={{
        // Poetic letter-paper & anthology book proportions
        borderRadius: '18px 18px 28px 18px',
        background:
          'linear-gradient(155deg, rgba(250, 246, 255, 0.97) 0%, rgba(236, 226, 250, 0.95) 45%, rgba(242, 234, 252, 0.95) 85%, rgba(248, 238, 246, 0.96) 100%)',
        border: '1.5px solid rgba(185, 162, 225, 0.7)',
        boxShadow: isHovered
          ? '0 16px 36px rgba(88, 72, 118, 0.16), -4px 5px 0px rgba(225, 215, 245, 0.78), 0 0 28px rgba(228, 215, 255, 0.55) inset'
          : '0 10px 28px rgba(92, 76, 122, 0.1), -3px 4px 0px rgba(230, 220, 248, 0.72), 0 0 20px rgba(232, 220, 255, 0.4) inset',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* 1. Hand-Painted Watercolor Wash Blobs (Dreamy Pastel Purple, Lavender, Soft Rose) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-8 -left-8 w-36 h-36 rounded-full blur-2xl opacity-55"
          style={{ background: 'radial-gradient(circle, #dfd0f7 0%, transparent 72%)' }}
        />
        <div
          className="absolute top-1/3 -right-10 w-40 h-40 rounded-full blur-2xl opacity-50"
          style={{ background: 'radial-gradient(circle, #ccb5f0 0%, transparent 72%)' }}
        />
        <div
          className="absolute -bottom-8 left-1/4 w-36 h-28 rounded-full blur-2xl opacity-45"
          style={{ background: 'radial-gradient(circle, #f0c8e2 0%, transparent 72%)' }}
        />
      </div>

      {/* Watercolor Garden Trellis, Drifting Clouds, Silk Ribbon & Climbing Roses SVG */}
      <svg
        viewBox="0 0 300 460"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Delicate Inner Letter-Paper Border with Arched Top Corners */}
        <path
          d="M 10 24 Q 10 10, 24 10 L 276 10 Q 290 10, 290 24 L 290 436 Q 290 450, 276 450 L 24 450 Q 10 450, 10 436 Z"
          stroke="#9db8d9"
          strokeWidth="0.9"
          strokeDasharray="4 3"
          strokeOpacity="0.65"
        />

        {/* Soft Hand-Painted Clouds at Top Left & Right */}
        <path
          d="M 18 24 C 18 19, 24 17, 28 20 C 31 15, 40 16, 42 21 C 46 21, 48 26, 43 28 L 21 28 C 17 28, 17 25, 18 24 Z"
          fill="#ffffff"
          fillOpacity="0.88"
          stroke="#9bb8db"
          strokeWidth="0.8"
        />
        <path
          d="M 248 22 C 248 18, 253 16, 257 19 C 260 14, 268 15, 270 20 C 274 20, 276 24, 271 26 L 251 26 Z"
          fill="#ffffff"
          fillOpacity="0.85"
          stroke="#b3a4d4"
          strokeWidth="0.8"
        />

        {/* Climbing Rose Vine on Left Trellis */}
        <path
          d="M 10 130 C 16 95, 6 65, 15 36"
          stroke="#8eb09b"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <circle cx="13" cy="64" r="4" fill="#e8b3c4" fillOpacity="0.85" />
        <circle cx="13" cy="64" r="1.5" fill="#f7df94" />
        <circle cx="11" cy="98" r="3.2" fill="#cbbbe6" fillOpacity="0.85" />

        {/* Curled Book-Page Corner at Bottom Right */}
        <path
          d="M 272 456 L 296 432 L 274 434 Q 272 444, 272 456 Z"
          fill="#e3ecf7"
          stroke="#9bb6d6"
          strokeWidth="0.9"
        />
      </svg>

      {/* Hover Effect: Small Petals + Drifting Handwritten Poetry Fragments */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          >
            {/* Drifting Handwritten Paper / Poetry Scraps */}
            {[
              { text: '“mây trôi…”', top: '16%', left: '8%', rotate: -8, delay: 0 },
              { text: '“hương thơ…”', top: '48%', right: '6%', rotate: 7, delay: 0.18 },
              { text: '“hoa mộng…”', bottom: '18%', left: '10%', rotate: -5, delay: 0.3 },
            ].map((frag, idx) => (
              <motion.span
                key={`poem-frag-${idx}`}
                initial={{ opacity: 0, y: 8, rotate: frag.rotate }}
                animate={{
                  opacity: [0, 0.92, 0],
                  y: [6, -12, -22],
                  x: [0, idx % 2 === 0 ? 6 : -6, 0],
                }}
                transition={{
                  duration: 2.8,
                  delay: frag.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute px-1.5 py-0.5 rounded-[3px] bg-[#fffdf9]/90 border border-[#b8cce6]/70 text-[0.66rem] text-[#4f6485] shadow-2xs"
                style={{
                  top: frag.top,
                  left: frag.left,
                  right: frag.right,
                  bottom: frag.bottom,
                  fontFamily: 'var(--font-handwritten)',
                }}
              >
                {frag.text}
              </motion.span>
            ))}

            {/* Floating Watercolor Petals & Painted Stars */}
            {[
              { left: '78%', top: '14%', symbol: '🌸', delay: 0.05 },
              { left: '18%', top: '36%', symbol: '🦋', delay: 0.2 },
              { left: '82%', top: '68%', symbol: '✦', delay: 0.12 },
            ].map((item, idx) => (
              <motion.span
                key={`garden-petal-${idx}`}
                initial={{ opacity: 0, scale: 0.6, y: 4 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.7, 1.1, 0.8],
                  y: [4, -14, -24],
                }}
                transition={{
                  duration: 2.4,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute text-xs"
                style={{ left: item.left, top: item.top }}
              >
                {item.symbol}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Transition Overlay: Floating Flowers, Clouds & Drifting Poetry Pages */}
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
                'radial-gradient(circle, rgba(240, 247, 255, 0.9) 0%, rgba(232, 224, 248, 0.84) 60%, rgba(252, 238, 244, 0.88) 100%)',
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
                    y: Math.sin(angle) * dist - 8,
                    scale: [0.5, 1.25, 0.7],
                    opacity: [1, 0.95, 0],
                  }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                  className="absolute text-sm"
                >
                  {idx % 3 === 0 ? '☁️' : idx % 3 === 1 ? '🌸' : '📜'}
                </motion.span>
              );
            })}
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              className="text-xs italic tracking-[0.18em] text-[#3d5273] font-medium px-3.5 py-1 rounded-full bg-white/90 border border-[#a3bce0]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              lật trang thơ vào vườn mơ...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Poetry Collection Header & Margin Note */}
      <div className="relative z-10 w-full flex items-center justify-between pb-1.5 mb-2.5 border-b border-[#a8c0de]/45 text-[0.63rem] text-[#556b8a]">
        <span className="italic tracking-[0.14em]" style={{ fontFamily: 'var(--font-serif)' }}>
          tuyển tập thơ · chương I
        </span>
        <span
          className="text-[0.7rem] text-[#7a6894] rotate-2"
          style={{ fontFamily: 'var(--font-handwritten)' }}
        >
          ☁ mây & hoa
        </span>
      </div>

      {/* 1. Arched Watercolor Garden & Cloud Frame */}
      <div
        className="relative z-10 w-full aspect-[4/3] overflow-hidden p-1.5 mb-3 bg-gradient-to-b from-[#f4f8fd] via-[#eef2fb] to-[#f8eef4] border border-[#aac2e0] shadow-[0_4px_16px_rgba(72,92,126,0.1)]"
        style={{
          borderRadius: '38px 38px 14px 14px',
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden border border-white/80"
          style={{ borderRadius: '32px 32px 10px 10px' }}
        >
          <img
            src={creator.mediaSrc}
            alt="Mộng Du Vẽ Mây — Poet's private watercolor garden"
            className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.02] group-hover:brightness-[1.09] group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Soft Powder-Blue & Lavender Watercolor Vignette */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_16px_rgba(70,90,130,0.16)]" />

          {/* Mascot Ribbon Pill Badge */}
          <div
            className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-[6px] border border-[#c2d4ec] text-[0.68rem] text-[#384966] shadow-2xs"
            style={{ background: 'rgba(250, 253, 255, 0.92)' }}
          >
            <span>{creator.mascot}</span>
            <span className="italic" style={{ fontFamily: 'var(--font-serif)' }}>
              {creator.mascotLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Margin Poetry Fragment */}
      <div className="relative z-10 w-full flex items-center justify-between px-1 mb-1 text-[0.68rem] text-[#687c9c] opacity-85">
        <span className="italic" style={{ fontFamily: 'var(--font-serif)' }}>
          ✧ khúc ngẫu hứng bên đài phun nước
        </span>
        <span className="rotate-3" style={{ fontFamily: 'var(--font-handwritten)' }}>
          🦋
        </span>
      </div>

      {/* 2. Poetry Collection Title: MỘNG DU VẼ MÂY */}
      <h3
        className="relative z-10 w-full text-center text-lg sm:text-[1.24rem] italic font-normal text-[#2b3b54] tracking-[0.08em] group-hover:text-[#1a2638] transition-colors leading-tight"
        style={{
          fontFamily: 'var(--font-serif)',
          textShadow: '0 1px 8px rgba(255, 255, 255, 0.95)',
        }}
      >
        {creator.name}
      </h3>

      {/* 3. Delicate Silk Ribbon & Painted Star Divider */}
      <div className="relative z-10 my-1.5 w-full flex items-center justify-center gap-2 opacity-85">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#92b0d4]" />
        <span className="text-[0.62rem] text-[#92b0d4]">⋆</span>
        <span className="text-xs text-[#d69cb2]">🎀</span>
        <span className="text-[0.62rem] text-[#a594cc]">⋆</span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#92b0d4]" />
      </div>

      {/* 4. Creator Name in Poetic Italic Serif */}
      <p
        className="relative z-10 text-center text-xs sm:text-[0.8rem] text-[#5e6f8c] tracking-[0.14em] lowercase italic mb-2"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        — {creator.creatorTag || 'creator name: jun'} —
      </p>

      {/* 5. Handwritten Literary Quotation on Old Letter Paper */}
      <div
        className="relative z-10 w-full p-3 rounded-[12px] border border-[#bfd2ea] my-auto text-center shadow-[0_3px_12px_rgba(75,95,130,0.06)]"
        style={{
          background:
            'linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 246, 254, 0.82) 100%)',
        }}
      >
        {/* Tiny Pressed Rose Petal in Top-Left of Letter Paper */}
        <span
          className="absolute -top-2 left-2.5 text-xs pointer-events-none -rotate-12"
          aria-hidden="true"
        >
          🌸
        </span>

        <p
          className="text-[0.84rem] sm:text-[0.88rem] text-[#334460] leading-snug italic"
          style={{
            fontFamily: 'var(--font-serif)',
          }}
        >
          &ldquo;Tưới hoa bằng mộng, nuôi tâm hồn bằng thơ.&rdquo;
        </p>

        <p
          className="text-[0.95rem] text-[#665885] mt-1 tracking-wide"
          style={{
            fontFamily: 'var(--font-handwritten)',
          }}
        >
          Let every word become a flower.
        </p>
      </div>

      {/* 6. Bottom Poetry Page-Turn Navigation */}
      <div className="relative z-10 w-full mt-3.5 pt-2.5 border-t border-[#a8c0de]/45 flex items-center justify-between text-xs text-[#465a78] group-hover:text-[#23324a] transition-colors">
        <span
          className="text-[0.7rem] text-[#6b7f9e] -rotate-1"
          style={{ fontFamily: 'var(--font-handwritten)' }}
        >
          trang thơ mở ngỏ
        </span>

        <span
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e6f0fb]/90 group-hover:bg-[#d8e8fa] border border-[#9db8dc]/70 text-[0.72rem] italic font-medium text-[#2f4363] tracking-[0.05em] transition-all shadow-2xs"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span>vườn mộng vào vườn mơ</span>
          <span className="text-xs not-italic transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.button>
  );
};
