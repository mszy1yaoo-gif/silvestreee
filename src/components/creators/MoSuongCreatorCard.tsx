import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreatorEntry } from '../../data/creators';

interface MoSuongCreatorCardProps {
  creator: CreatorEntry;
  onSelect: () => void;
}

export const MoSuongCreatorCard: React.FC<MoSuongCreatorCardProps> = ({ creator, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnteringGate, setIsEnteringGate] = useState(false);

  const handleGateClick = () => {
    if (isEnteringGate) return;
    setIsEnteringGate(true);
    window.setTimeout(() => {
      setIsEnteringGate(false);
      onSelect();
    }, 680);
  };

  return (
    <motion.button
      type="button"
      onClick={handleGateClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 18 }}
      animate={
        isEnteringGate
          ? { scale: 1.06, y: -6 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between text-left cursor-pointer transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7a9a70] hover:-translate-y-2 w-full overflow-visible pt-3 pb-2 px-1"
      style={{
        background: 'transparent',
      }}
    >
      {/* Subtle Warm Forest Portal Aura behind the Gate */}
      <div
        className="absolute -inset-2 pointer-events-none transition-all duration-700 rounded-[150px_150px_30px_30px] blur-xl"
        style={{
          opacity: isHovered || isEnteringGate ? 0.85 : 0.35,
          background:
            'radial-gradient(ellipse at 50% 38%, rgba(238, 222, 152, 0.42) 0%, rgba(102, 138, 94, 0.32) 48%, rgba(44, 66, 42, 0) 78%)',
        }}
      />

      {/* ===================================================================
          OUTER PROTRUDING BOTANICAL DETAILS (Extending outside the gate frame)
         =================================================================== */}
      <svg
        viewBox="0 0 320 520"
        className="absolute -inset-x-2.5 -inset-y-2 w-[calc(100%+20px)] h-[calc(100%+16px)] pointer-events-none z-30 overflow-visible"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Top-Left Protruding Branch & Winding Mossy Vine */}
        <motion.g
          animate={
            isEnteringGate
              ? { x: -12, rotate: -4 }
              : isHovered
                ? { rotate: [-0.8, 1.2, -0.8] }
                : { rotate: 0 }
          }
          transition={
            isEnteringGate
              ? { duration: 0.55, ease: 'easeOut' }
              : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ transformOrigin: '30px 90px' }}
        >
          <path
            d="M -4 118 C 4 74, 24 34, 68 12 C 96 -2, 128 2, 156 6"
            stroke="#3f593b"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 10 84 C -6 66, 4 42, 24 34"
            stroke="#5b7854"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Mossy Leaves Extending Outside Left Edge */}
          <path d="M -2 92 C -12 84, -8 72, 3 79 Z" fill="#587850" />
          <path d="M 14 52 C 2 44, 8 30, 20 38 Z" fill="#6f9167" />
          <path d="M 46 20 C 38 8, 48 0, 58 10 Z" fill="#4f6e48" />
          <path d="M 88 4 C 84 -6, 98 -8, 102 3 Z" fill="#6f9167" />

          {/* Hanging Pale-Lavender & Dusty-Rose Bellflowers on Left */}
          <line x1="22" y1="36" x2="22" y2="56" stroke="#6c8764" strokeWidth="1" />
          <path d="M 17 56 C 17 50, 27 50, 27 56 L 29 61 L 15 61 Z" fill="#cbb8e3" />
          <circle cx="22" cy="62" r="1.5" fill="#ffe896" />

          <line x1="56" y1="14" x2="56" y2="30" stroke="#6c8764" strokeWidth="0.9" />
          <path d="M 52 30 C 52 25, 60 25, 60 30 L 62 34 L 50 34 Z" fill="#dba2ae" />
          <circle cx="56" cy="35" r="1.3" fill="#ffe896" />

          {/* Ambient Detail: Tiny Butterfly Resting on Top-Left Leaf */}
          <g transform="translate(33, 6) rotate(-14)">
            <path d="M 6 6 C 1 0, -2 3, 2 8 C 4 10, 6 8, 6 6 Z" fill="#e6c88a" stroke="#4a3b28" strokeWidth="0.6" />
            <path d="M 6 6 C 11 0, 14 3, 10 8 C 8 10, 6 8, 6 6 Z" fill="#d9a7b2" stroke="#4a3b28" strokeWidth="0.6" />
            <line x1="6" y1="3" x2="6" y2="10" stroke="#3b2f20" strokeWidth="0.9" />
          </g>
        </motion.g>

        {/* Top-Right Overgrown Branch + Hanging Ribbon & Crescent Charm */}
        <motion.g
          animate={
            isEnteringGate
              ? { x: 12, rotate: 4 }
              : isHovered
                ? { rotate: [0.8, -1.2, 0.8] }
                : { rotate: 0 }
          }
          transition={
            isEnteringGate
              ? { duration: 0.55, ease: 'easeOut' }
              : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ transformOrigin: '290px 90px' }}
        >
          <path
            d="M 324 134 C 316 82, 294 36, 250 14 C 222 0, 192 2, 166 6"
            stroke="#3f593b"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path d="M 304 62 C 316 54, 312 40, 298 48 Z" fill="#587850" />
          <path d="M 272 24 C 282 14, 274 4, 263 14 Z" fill="#6f9167" />

          {/* Hanging Silk Ribbon & Tiny Brass Crescent Charm from Right Branch */}
          <path d="M 294 45 C 292 60, 297 72, 293 86" stroke="#d49aa6" strokeWidth="1.2" strokeOpacity="0.85" />
          <path d="M 294 45 C 298 58, 294 70, 299 82" stroke="#d49aa6" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="282" y1="32" x2="282" y2="64" stroke="#c8ab6e" strokeWidth="0.9" strokeDasharray="2 1" />
          <path
            d="M 285 64 C 280 64, 277 68, 277 73 C 277 78, 280 82, 285 82 C 282 79, 280 76, 280 73 C 280 70, 282 66, 285 64 Z"
            fill="#dfc079"
          />
          <circle cx="276" cy="73" r="1.2" fill="#fff0a8" />
        </motion.g>

        {/* Bottom-Left Moss, Glowing Flower & Spotted Forest Mushrooms */}
        <g transform="translate(2, 445)">
          {/* Moss Cushion */}
          <path d="M -4 56 Q 14 40, 38 52 Q 52 46, 66 58 L -4 58 Z" fill="#466341" fillOpacity="0.9" />
          {/* Tall Toadstool */}
          <path d="M 14 54 L 14 38 L 19 38 L 19 54 Z" fill="#f3e7d0" />
          <path d="M 6 40 C 6 29, 27 29, 27 40 Z" fill="#c97d78" />
          <circle cx="12" cy="35" r="1.3" fill="#fff8e8" />
          <circle cx="17" cy="33" r="1.1" fill="#fff8e8" />
          <circle cx="21" cy="36" r="1.2" fill="#fff8e8" />
          {/* Tiny Baby Mushroom */}
          <path d="M 28 55 L 28 46 L 31 46 L 31 55 Z" fill="#f3e7d0" />
          <path d="M 24 47 C 24 41, 35 41, 35 47 Z" fill="#d49b72" />
          <circle cx="29" cy="44" r="0.9" fill="#fff8e8" />
          {/* Bioluminescent Glowing Forest Flower */}
          <circle cx="44" cy="44" r="5" fill="#ffe88a" fillOpacity="0.35" />
          <circle cx="44" cy="44" r="2.6" fill="#fff6c2" />
        </g>

        {/* Bottom-Right Fern, Glowing Blossom & Little Mushroom */}
        <g transform="translate(254, 448)">
          <path d="M 0 55 Q 20 42, 44 50 Q 58 44, 68 56 L 0 56 Z" fill="#466341" fillOpacity="0.9" />
          <path d="M 46 53 L 46 41 L 50 41 L 50 53 Z" fill="#f3e7d0" />
          <path d="M 40 42 C 40 34, 56 34, 56 42 Z" fill="#b986a8" />
          <circle cx="46" cy="38" r="1.1" fill="#fff8e8" />
          <circle cx="51" cy="39" r="0.9" fill="#fff8e8" />
          {/* Glowing Flower on Right */}
          <circle cx="22" cy="44" r="4.8" fill="#ffe88a" fillOpacity="0.35" />
          <circle cx="22" cy="44" r="2.4" fill="#fff6c2" />
        </g>
      </svg>

      {/* ===================================================================
          MAIN ARCHED WOODEN & BOTANICAL GATEWAY STRUCTURE
         =================================================================== */}
      <div
        className="relative z-10 w-full flex-1 flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 overflow-hidden"
        style={{
          // Tall Enchanted Archway Silhouette (Not a rectangle!)
          borderRadius: '145px 145px 22px 26px / 155px 155px 20px 24px',
          background:
            'linear-gradient(175deg, rgba(46, 66, 43, 0.96) 0%, rgba(62, 84, 57, 0.94) 28%, rgba(242, 238, 224, 0.96) 62%, rgba(230, 236, 220, 0.97) 100%)',
          border: '2.5px solid #4c6646',
          boxShadow: isHovered
            ? '0 20px 42px rgba(28, 42, 24, 0.28), 0 0 0 2px rgba(186, 204, 172, 0.55), inset 0 2px 24px rgba(255, 238, 175, 0.35)'
            : '0 14px 32px rgba(32, 46, 28, 0.2), 0 0 0 1.5px rgba(154, 176, 142, 0.45), inset 0 2px 16px rgba(42, 58, 38, 0.22)',
        }}
      >
        {/* Subtle Carved Wood & Moss Grain Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(rgba(36, 52, 32, 0.24) 1px, transparent 0), radial-gradient(rgba(214, 190, 130, 0.2) 1px, transparent 0)',
            backgroundSize: '14px 14px',
            backgroundPosition: '0 0, 7px 7px',
          }}
        />

        {/* Carved Wooden Arch Inner Trim & Subtle Magical Symbols Carved into the Wood */}
        <svg
          viewBox="0 0 280 480"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Inner Wooden Arch Frame */}
          <path
            d="M 8 148 C 8 62, 62 10, 140 10 C 218 10, 272 62, 272 148 L 272 464 C 272 469, 268 472, 262 472 L 18 472 C 12 472, 8 469, 8 464 Z"
            stroke="#8da682"
            strokeWidth="1.2"
            strokeDasharray="6 3"
            strokeOpacity="0.6"
          />
          {/* Subtle Magical Symbols Carved into the Arch Keystone & Pillars */}
          <text x="135" y="21" fill="#e5ca83" fillOpacity="0.75" fontSize="9" fontFamily="serif">
            ☾✦☽
          </text>
          <text x="12" y="165" fill="#c7d6bc" fillOpacity="0.55" fontSize="8" fontFamily="serif">
            ⟡
          </text>
          <text x="261" y="165" fill="#c7d6bc" fillOpacity="0.55" fontSize="8" fontFamily="serif">
            ⟡
          </text>
          <text x="13" y="245" fill="#768f6d" fillOpacity="0.5" fontSize="7" fontFamily="serif">
            ✧
          </text>
          <text x="261" y="245" fill="#768f6d" fillOpacity="0.5" fontSize="7" fontFamily="serif">
            ✧
          </text>
        </svg>

        {/* Tiny Handwritten Words Hidden in the Vines (Rewards Looking Closely) */}
        <span
          className="absolute top-6 left-7 z-20 pointer-events-none text-[0.62rem] text-[#dce8d4]/80 -rotate-[24deg] select-none"
          style={{ fontFamily: 'var(--font-handwritten)' }}
          aria-hidden="true"
        >
          ~ lối mộng ~
        </span>
        <span
          className="absolute top-7 right-6 z-20 pointer-events-none text-[0.6rem] text-[#ebd9e0]/80 rotate-[22deg] select-none"
          style={{ fontFamily: 'var(--font-handwritten)' }}
          aria-hidden="true"
        >
          ✦ sương khuya
        </span>

        {/* ===================================================================
            2. THE VIEW THROUGH THE GATEWAY (Arched Portal Opening)
           =================================================================== */}
        <div className="relative z-10 w-full pt-2 mb-2.5 flex flex-col items-center">
          {/* Deep Wooden & Mossy Archway Threshold */}
          <div
            className="relative w-full aspect-[4/3.6] p-1.5 transition-all duration-700"
            style={{
              borderRadius: '125px 125px 14px 14px',
              background:
                'linear-gradient(180deg, #2b3d28 0%, #3d5438 45%, #5c7554 100%)',
              boxShadow:
                'inset 0 4px 14px rgba(12, 20, 10, 0.65), 0 6px 18px rgba(28, 42, 24, 0.22)',
              border: '2px solid rgba(168, 190, 154, 0.6)',
            }}
          >
            {/* Actual Portal Opening Looking Into Rừng Mộng */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: '118px 118px 10px 10px',
              }}
            >
              <video
                ref={videoRef}
                src={creator.mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                  isEnteringGate
                    ? 'scale-125 brightness-[1.22]'
                    : isHovered
                      ? 'scale-108 brightness-[1.12] contrast-[1.03]'
                      : 'scale-100 brightness-[0.98] contrast-[1.02]'
                }`}
              />

              {/* Portal Depth Shadow: Makes it look like peering through a real doorway */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  boxShadow: isHovered
                    ? 'inset 0 10px 26px rgba(18, 30, 16, 0.48), inset 0 0 18px rgba(255, 236, 168, 0.28)'
                    : 'inset 0 14px 32px rgba(14, 24, 12, 0.62), inset 0 -8px 20px rgba(20, 32, 18, 0.38)',
                }}
              />

              {/* Hanging Vine Curtain Inside Top of the Archway (Parts slightly on hover/click) */}
              <motion.svg
                viewBox="0 0 240 90"
                className="absolute top-0 inset-x-0 w-full h-16 pointer-events-none z-10"
                fill="none"
                preserveAspectRatio="none"
                animate={
                  isEnteringGate
                    ? { y: -14, scaleX: 1.12, opacity: 0.35 }
                    : isHovered
                      ? { y: -3, scaleX: 1.03 }
                      : { y: 0, scaleX: 1 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Left Draping Ivy Tendrils */}
                <path d="M 18 0 Q 22 28, 14 52" stroke="#2f472b" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M 38 0 Q 34 22, 40 38" stroke="#3f5e3a" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="14" cy="52" r="2.5" fill="#dba2ae" />
                <circle cx="40" cy="38" r="2" fill="#cbb8e3" />
                <path d="M 19 26 C 12 22, 14 15, 21 20 Z" fill="#5e8057" />
                <path d="M 36 18 C 43 14, 41 8, 35 12 Z" fill="#73966b" />

                {/* Right Draping Ivy Tendrils */}
                <path d="M 222 0 Q 218 30, 226 54" stroke="#2f472b" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M 200 0 Q 205 20, 198 36" stroke="#3f5e3a" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="226" cy="54" r="2.5" fill="#cbb8e3" />
                <circle cx="198" cy="36" r="2" fill="#ffe896" />
                <path d="M 220 26 C 228 22, 226 15, 219 20 Z" fill="#5e8057" />
              </motion.svg>

              {/* Ambient Floating Golden Pollen Inside the Gate */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                  { left: '22%', top: '65%', size: 3, delay: 0 },
                  { left: '48%', top: '42%', size: 2.5, delay: 0.6 },
                  { left: '74%', top: '58%', size: 3, delay: 1.2 },
                  { left: '36%', top: '28%', size: 2, delay: 1.8 },
                ].map((pollen, idx) => (
                  <motion.span
                    key={`pollen-${idx}`}
                    animate={{
                      y: [0, -14, 0],
                      x: [0, idx % 2 === 0 ? 5 : -5, 0],
                      opacity: isHovered ? [0.45, 0.95, 0.45] : [0.25, 0.6, 0.25],
                    }}
                    transition={{
                      duration: 3.2,
                      delay: pollen.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute rounded-full bg-[#fff1a8]"
                    style={{
                      left: pollen.left,
                      top: pollen.top,
                      width: pollen.size,
                      height: pollen.size,
                      boxShadow: '0 0 6px 2px rgba(255, 235, 145, 0.75)',
                    }}
                  />
                ))}
              </div>

              {/* Tiny Guardian Mascot Perched on the Threshold Ledge */}
              <div
                className="absolute bottom-1.5 right-2 px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#8da683]/70 text-[0.64rem] text-[#2c3b28] shadow-xs"
                style={{ background: 'rgba(248, 245, 234, 0.9)' }}
              >
                <span>{creator.mascot}</span>
                <span style={{ fontFamily: 'var(--font-handwritten)' }}>{creator.mascotLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            5. PLACE NAME BEHIND THE GATE: MỘ SƯƠNG CHI ỨC DAO
           =================================================================== */}
        <div className="relative z-10 w-full text-center px-1 mt-0.5">
          {/* Tiny Decorative Line Above */}
          <div className="flex items-center justify-center gap-1.5 opacity-85 mb-1">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#55704e]" />
            <span className="text-[0.58rem] text-[#b8964c]">☾</span>
            <span className="text-[0.55rem] uppercase tracking-[0.22em] text-[#496144]" style={{ fontFamily: 'var(--font-serif)' }}>
              cổng rừng mộng
            </span>
            <span className="text-[0.58rem] text-[#b8964c]">☽</span>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#55704e]" />
          </div>

          <h3
            className="w-full text-center text-[1.08rem] sm:text-[1.18rem] font-medium text-[#22301f] tracking-[0.06em] group-hover:text-[#152012] transition-colors leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: '0 1px 8px rgba(255, 252, 240, 0.95)',
            }}
          >
            {creator.name}
          </h3>

          {/* Tiny Decorative Botanical Line Below */}
          <div className="mt-1 flex items-center justify-center gap-1.5 opacity-85">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#6b8763]" />
            <span className="text-[0.6rem] text-[#587550]">🌿</span>
            <span className="text-[0.62rem] text-[#c78795]">❀</span>
            <span className="text-[0.58rem] text-[#b8964c]">✦</span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#6b8763]" />
          </div>
        </div>

        {/* ===================================================================
            6. CREATOR NAME: Handwritten Signature Tag Attached to the Gate
           =================================================================== */}
        <div className="relative z-10 flex justify-center my-1.5">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[4px_10px_6px_8px] border border-[#96ad8c]/75 shadow-[1px_2px_6px_rgba(45,60,40,0.08)] -rotate-2 group-hover:rotate-0 transition-transform duration-300"
            style={{
              background: 'linear-gradient(135deg, #fdfaf0 0%, #f1ebd8 100%)',
            }}
          >
            {/* Tiny Twine Pin Hole */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#6d8264] shadow-inner" />
            <span
              className="text-[0.88rem] text-[#4c3e2f] tracking-[0.04em]"
              style={{ fontFamily: 'var(--font-handwritten)' }}
            >
              {creator.creatorTag || 'creator name: naomi.'}
            </span>
          </div>
        </div>

        {/* ===================================================================
            7. INTRODUCTION: Handwritten Forest Note / Parchment Tag Left for Visitors
           =================================================================== */}
        <div className="relative z-10 w-full my-auto pt-1">
          {/* Twine String Holding the Note to the Gate */}
          <div className="w-full flex justify-center -mb-1.5 relative z-20 pointer-events-none">
            <span className="w-3 h-3 rounded-full bg-[#7c9473] border border-[#4a6143] flex items-center justify-center text-[0.5rem] text-[#fff8e6] shadow-2xs">
              ✦
            </span>
          </div>

          <div
            className="relative w-full px-3 py-2.5 rounded-[8px_16px_10px_14px] border border-[#a8bd9e] text-center shadow-[0_4px_12px_rgba(42,58,38,0.09)] rotate-[0.6deg] group-hover:rotate-0 transition-transform duration-500"
            style={{
              background:
                'linear-gradient(155deg, rgba(254, 251, 242, 0.95) 0%, rgba(244, 240, 225, 0.92) 100%)',
            }}
          >
            {/* Tiny Pressed Leaf & Wildflower on the Note Corner */}
            <span
              className="absolute -top-2 left-2.5 text-xs pointer-events-none -rotate-12"
              aria-hidden="true"
            >
              🍃
            </span>
            <span
              className="absolute -bottom-1.5 right-2 text-[0.68rem] text-[#c98a98] pointer-events-none"
              aria-hidden="true"
            >
              ✿
            </span>

            <p
              className="text-[0.94rem] sm:text-[0.98rem] text-[#3b3123] leading-[1.34]"
              style={{
                fontFamily: 'var(--font-handwritten)',
              }}
            >
              &ldquo;{creator.introduction}&rdquo;
            </p>
          </div>
        </div>

        {/* ===================================================================
            8. ENTRY BUTTON & MOSSY FOREST PATHWAY:
               Hanging Wooden Forest Sign + Stepping Stones Leading Into Rừng Mộng
           =================================================================== */}
        <div className="relative z-10 w-full mt-3 pt-1 flex flex-col items-center">
          {/* Tiny Hanging Chains / Twine Cords Connecting the Wooden Sign */}
          <div className="w-28 flex justify-between px-3 -mb-0.5 pointer-events-none">
            <span className="w-[1.5px] h-2 bg-[#6e563e]" />
            <span className="w-[1.5px] h-2 bg-[#6e563e]" />
          </div>

          {/* Engraved Wooden Forest Sign (`bước vào rừng mộng →`) */}
          <div
            className="relative w-full py-2 px-3 rounded-[8px_12px_9px_11px] flex items-center justify-center gap-2 transition-all duration-500 border"
            style={{
              background: isHovered
                ? 'linear-gradient(180deg, #5c4733 0%, #463525 100%)'
                : 'linear-gradient(180deg, #69523c 0%, #523e2c 100%)',
              borderColor: isHovered ? '#e2c478' : '#8c7255',
              boxShadow: isHovered
                ? '0 6px 18px rgba(42, 56, 36, 0.28), 0 0 16px rgba(255, 230, 140, 0.5), inset 0 1px 0 rgba(255, 240, 200, 0.35)'
                : '0 4px 10px rgba(38, 30, 20, 0.2), inset 0 1px 0 rgba(255, 245, 220, 0.2)',
            }}
          >
            {/* Tiny Moss Patches Growing on Top Corners of the Wooden Sign */}
            <span
              className="absolute -top-1 left-2.5 w-5 h-1.5 rounded-full bg-[#688760] opacity-90 pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute -top-1 right-3 w-3.5 h-1.5 rounded-full bg-[#78996f] opacity-85 pointer-events-none"
              aria-hidden="true"
            />

            {/* Engraved Brass Nail Heads */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b46a] opacity-80" />

            <span
              className="text-[0.78rem] sm:text-[0.82rem] font-medium tracking-[0.08em] text-[#fdf6e4] group-hover:text-[#fff6cc] transition-colors"
              style={{
                fontFamily: 'var(--font-serif)',
                textShadow: isHovered ? '0 0 8px rgba(255, 232, 145, 0.65)' : '0 1px 2px rgba(0, 0, 0, 0.4)',
              }}
            >
              Bước vào vườn mộng
            </span>

            <span className="text-xs text-[#f5da8a] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b46a] opacity-80" />
          </div>

          {/* Mossy Stepping-Stone Forest Path Leading Up to the Sign */}
          <div
            className={`mt-2 flex items-center justify-center gap-1.5 transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-65'
            }`}
            aria-hidden="true"
          >
            <span className="w-2.5 h-1 rounded-full bg-[#8fa686]" />
            <span className="w-4 h-1.5 rounded-full bg-[#78916f] border border-[#5c7554]/50" />
            <span className="w-5 h-1.5 rounded-full bg-[#68825f] border border-[#4f6948]/50" />
            <span className="w-3.5 h-1 rounded-full bg-[#78916f]" />
            <span className="w-2 h-1 rounded-full bg-[#8fa686]" />
          </div>
        </div>

        {/* ===================================================================
            9. HOVER INTERACTION: Fireflies & Drifting Particles Around the Gate
           =================================================================== */}
        <AnimatePresence>
          {isHovered && !isEnteringGate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
            >
              {[
                { top: '14%', left: '10%', delay: 0 },
                { top: '22%', right: '10%', delay: 0.12 },
                { top: '44%', left: '7%', delay: 0.25 },
                { top: '48%', right: '8%', delay: 0.18 },
                { bottom: '12%', left: '16%', delay: 0.08 },
                { bottom: '10%', right: '14%', delay: 0.22 },
              ].map((fly, idx) => (
                <motion.span
                  key={`gate-firefly-${idx}`}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    opacity: [0.25, 1, 0.35],
                    scale: [0.65, 1.35, 0.75],
                    y: [4, -10, -2],
                    x: [0, idx % 2 === 0 ? 7 : -7, 0],
                  }}
                  transition={{
                    duration: 2.1,
                    delay: fly.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    top: fly.top,
                    left: fly.left,
                    right: fly.right,
                    bottom: fly.bottom,
                    backgroundColor: '#ffe98a',
                    boxShadow: '0 0 12px 4px rgba(255, 232, 130, 0.9)',
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            9. CLICK INTERACTION: "Entering the Forest" Portal Transition
           =================================================================== */}
        <AnimatePresence>
          {isEnteringGate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
              style={{
                borderRadius: '145px 145px 22px 26px',
                background:
                  'radial-gradient(circle at 50% 36%, rgba(255, 250, 220, 0.95) 0%, rgba(188, 214, 178, 0.88) 52%, rgba(48, 70, 44, 0.92) 100%)',
              }}
            >
              {/* Fireflies Gathering Around the Doorway Center */}
              {[...Array(14)].map((_, idx) => {
                const angle = (idx * 25.7 * Math.PI) / 180;
                const startDist = 90 + (idx % 3) * 18;
                return (
                  <motion.span
                    key={`gather-fly-${idx}`}
                    initial={{
                      x: Math.cos(angle) * startDist,
                      y: Math.sin(angle) * startDist,
                      scale: 0.5,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.cos(angle) * 14,
                      y: Math.sin(angle) * 14 - 20,
                      scale: [0.6, 1.5, 0.8],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.62, ease: 'easeInOut' }}
                    className="absolute w-2.5 h-2.5 rounded-full bg-[#fff0a0]"
                    style={{
                      boxShadow: '0 0 14px 4px rgba(255, 236, 145, 0.95)',
                    }}
                  />
                );
              })}

              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 8 }}
                animate={{ scale: 1.08, opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="px-4 py-1.5 rounded-full bg-[#2b3d28]/90 border border-[#d8bc74] text-[#fef9e8] text-xs italic tracking-[0.16em] shadow-lg"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                ✦ đang bước qua cổng rừng mộng...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};
