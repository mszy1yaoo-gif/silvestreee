import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const NaomiAboutMeCard: React.FC = () => {
  const [copiedToast, setCopiedToast] = useState(false);
  const [clickSparkleKey, setClickSparkleKey] = useState(0);
  const [catPurr, setCatPurr] = useState(false);
  const [letterNote, setLetterNote] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDiscordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('@msz.y1yaoo').catch(() => {});
    setCopiedToast(true);
    setClickSparkleKey((prev) => prev + 1);
    window.setTimeout(() => setCopiedToast(false), 3000);
  };

  const handleCatClick = () => {
    setCatPurr(true);
    window.setTimeout(() => setCatPurr(false), 2400);
  };

  const handleLetterClick = () => {
    setLetterNote((prev) => !prev);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Trang bản thảo chân dung Naomi — Chân dung chủ vườn"
      className="group/page relative w-full max-w-4xl mx-auto my-4 sm:my-6 p-4 sm:p-10 md:p-12 select-none overflow-visible transition-all duration-700"
    >
      {/* Renaissance Pink Fairy-Tale Garden Portrait Plate / Manuscript Sheet */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          borderRadius: '5px 7px 5px 7px',
          background:
            'radial-gradient(ellipse 96% 92% at 50% 45%, #fef8f4 0%, #f9edf0 55%, #f1ded5 100%)',
          border: '1.5px solid rgba(198, 150, 140, 0.78)',
          boxShadow:
            '0 20px 50px rgba(62, 38, 44, 0.14), 4px 5px 0px rgba(228, 196, 202, 0.7), inset 0 0 38px rgba(255, 230, 235, 0.7)',
        }}
      >
        {/* Subtle Paper Fold Crease Lines */}
        <div
          className="absolute inset-y-0 left-1/2 w-[1px] pointer-events-none opacity-25"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(168, 112, 122, 0.55) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-1/2 h-[1px] pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(168, 112, 122, 0.55) 50%, transparent 100%)',
          }}
        />

        {/* Aged Parchment Grain Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(rgba(152, 108, 116, 0.22) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Delicate Hand-Drawn Antique-Gold & Blush Linework & Botanical Page Frame */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 800 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="10"
            y="10"
            width="780"
            height="420"
            rx="4"
            stroke="rgba(196, 148, 136, 0.62)"
            strokeWidth="1.1"
          />
          <rect
            x="16"
            y="16"
            width="768"
            height="408"
            rx="3"
            stroke="rgba(206, 162, 148, 0.5)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />

          {/* Corner Botanical Engravings - Top Left */}
          <g stroke="rgba(174, 122, 132, 0.78)" strokeWidth="1" fill="none">
            <path d="M 16 46 C 16 26, 26 16, 46 16" />
            <path d="M 22 34 C 30 24, 38 26, 44 22" />
            <circle cx="46" cy="16" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
            <circle cx="16" cy="46" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
          </g>

          {/* Corner Botanical Engravings - Top Right */}
          <g stroke="rgba(174, 122, 132, 0.78)" strokeWidth="1" fill="none">
            <path d="M 784 46 C 784 26, 774 16, 754 16" />
            <path d="M 778 34 C 770 24, 762 26, 756 22" />
            <circle cx="754" cy="16" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
            <circle cx="784" cy="46" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
          </g>

          {/* Corner Botanical Engravings - Bottom Left */}
          <g stroke="rgba(174, 122, 132, 0.78)" strokeWidth="1" fill="none">
            <path d="M 16 394 C 16 414, 26 424, 46 424" />
            <path d="M 22 406 C 30 416, 38 414, 44 418" />
            <circle cx="46" cy="424" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
            <circle cx="16" cy="394" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
          </g>

          {/* Corner Botanical Engravings - Bottom Right */}
          <g stroke="rgba(174, 122, 132, 0.78)" strokeWidth="1" fill="none">
            <path d="M 784 394 C 784 414, 774 424, 754 424" />
            <path d="M 778 406 C 770 416, 762 414, 756 418" />
            <circle cx="754" cy="424" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
            <circle cx="784" cy="394" r="1.8" fill="rgba(210, 150, 162, 0.85)" />
          </g>
        </svg>

        {/* Pressed Rose & Botanical Specimen Marginalia */}
        <div className="absolute top-4 left-6 pointer-events-none opacity-60 text-[#8a9e82] text-xs">
          🌿
        </div>
        <div className="absolute top-4 right-6 pointer-events-none opacity-65 text-[#b36778] text-xs">
          ✿
        </div>
        <div className="absolute bottom-4 left-6 pointer-events-none opacity-50 text-[#a06472] text-xs">
          ❦
        </div>
        <div className="absolute bottom-4 right-7 pointer-events-none opacity-60 text-[#8a9e82] text-xs">
          ☘
        </div>
      </div>

      {/* ======================================================== */}
      {/* DECORATIVE ASSET 1: POSTCARD ENVELOPE (Top-Left Edge)    */}
      {/* ======================================================== */}
      <motion.div
        onClick={handleLetterClick}
        whileHover={{ scale: 1.05, rotate: -8, y: -3 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: -16, rotate: -14 }}
        animate={{ opacity: 1, x: 0, rotate: -10 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute -top-4 -left-1 sm:-top-8 sm:-left-5 z-20 w-20 sm:w-36 md:w-40 cursor-pointer pointer-events-auto select-none"
        title="Bức thư gửi từ lâu đài mộng ảo (nhấp để xem lời nhắn ♡)"
      >
        <img
          src="/assets/aistudio/image_357635a7.png"
          alt="Bức thư và bưu thiếp lâu đài rừng mộng"
          className="w-full h-auto object-contain filter contrast-[1.04] brightness-[1.02]"
          style={{
            filter: 'drop-shadow(2px 8px 16px rgba(72, 42, 50, 0.22))',
          }}
        />
        <motion.span
          animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2 right-2 text-xs text-[#e8a3b0] pointer-events-none"
        >
          ✧
        </motion.span>
      </motion.div>

      {/* Letter Note Manuscript Slip */}
      <AnimatePresence>
        {letterNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-12 left-4 sm:left-10 z-30 max-w-[260px] sm:max-w-xs px-3 py-1.5 sm:px-3.5 sm:py-2 bg-[#fdf5f0] border border-[#d8adb6] shadow-md text-[0.72rem] sm:text-xs text-[#482830] italic"
            style={{
              fontFamily: 'var(--font-serif)',
              borderRadius: '3px',
            }}
          >
            <span>💌 &ldquo;chúc bạn một ngày êm ả giữa rừng mộng ♡&rdquo;</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* DECORATIVE ASSET 2: SLEEPING CAT (Bottom-Right Corner)   */}
      {/* ======================================================== */}
      <motion.div
        onClick={handleCatClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 15, rotate: -4 }}
        animate={{
          opacity: 1,
          y: [0, -2, 0],
          scale: [1, 1.018, 1],
          rotate: -3,
        }}
        transition={{
          y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.9, delay: 0.3 },
        }}
        className="absolute -bottom-4 right-0 sm:-bottom-8 sm:-right-5 z-20 w-24 sm:w-36 md:w-44 cursor-pointer pointer-events-auto select-none"
        title="Mèo nhỏ ngủ say bên trang sách (nhấp vào bé để xoa đầu ♡)"
      >
        <img
          src="/assets/aistudio/image_5a164195.png"
          alt="Chú mèo nhỏ ngủ say bên trang truyện"
          className="w-full h-auto object-contain filter contrast-[1.03] brightness-[1.01]"
          style={{
            filter: 'drop-shadow(0 8px 18px rgba(54, 32, 38, 0.24))',
          }}
        />

        {/* Floating Purr / Hearts on Click */}
        <AnimatePresence>
          {catPurr && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.7 }}
              animate={{ opacity: 1, y: -20, scale: 1.12 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2 }}
              className="absolute -top-4 left-6 text-xs text-[#b0586b] font-serif italic pointer-events-none flex items-center gap-1 bg-[#fef5f0] px-2.5 py-0.5 border border-[#e0b8c2] shadow-xs"
              style={{ borderRadius: '3px' }}
            >
              <span>♡</span>
              <span>purr... zzz</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          animate={{ opacity: [0.15, 0.65, 0.15], y: [0, -5, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1 left-4 text-[0.65rem] text-[#b07882] font-serif italic pointer-events-none"
        >
          zᶻ
        </motion.span>
      </motion.div>

      {/* ======================================================== */}
      {/* "CHÂN DUNG CHỦ VƯỜN" SECTION CONTENT (ASSEMBLY BY HAND)    */}
      {/* ======================================================== */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-8">
          <span
            className="block text-[0.6rem] sm:text-[0.64rem] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#a06472] mb-0.5 sm:mb-1"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            TABULA AUCTORIS · CHÂN DUNG CHỦ VƯỜN
          </span>
          <h2
            className="text-lg sm:text-2xl md:text-3xl text-[#3f2027] font-normal lowercase tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-whimsical)' }}
          >
            chân dung chủ vườn
          </h2>

          <div className="flex items-center justify-center gap-2 mt-1 sm:mt-1.5 opacity-80">
            <span className="w-10 sm:w-14 h-[0.8px] bg-gradient-to-r from-transparent to-[#d096a2]" />
            <span className="text-[0.64rem] sm:text-[0.68rem] text-[#b36778] select-none" aria-hidden="true">
              ❧ 𖤓 ❧
            </span>
            <span className="w-10 sm:w-14 h-[0.8px] bg-gradient-to-l from-transparent to-[#d096a2]" />
          </div>
        </div>

        {/* Composition: [ Attached Image ] + [ Inscribed Quote & Socials ] */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-8 md:gap-14 px-1 sm:px-4 mb-2 sm:mb-4">
          {/* 1. PORTRAIT IMAGE WITH ORIGINAL SHAPE PRESERVED & INTERACTIVE VIEWER */}
          <div className="relative group/portrait shrink-0">
            {/* Soft Warm Rose Halo */}
            <div
              className="absolute -inset-2.5 sm:-inset-3.5 rounded-[12px] opacity-45 group-hover/portrait:opacity-90 transition-opacity duration-700 pointer-events-none blur-md"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 215, 224, 0.9) 0%, rgba(226, 178, 192, 0.45) 65%, transparent 100%)',
              }}
            />

            {/* Vintage Renaissance Portrait Frame */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative p-2 sm:p-2.5 md:p-3 cursor-pointer transition-all duration-500 group-hover/portrait:scale-[1.02]"
              style={{
                borderRadius: '4px 6px 4px 6px',
                background: 'linear-gradient(145deg, #fdf6ec 0%, #f1decb 100%)',
                border: '1.6px solid rgba(196, 148, 132, 0.88)',
                boxShadow:
                  '0 10px 26px rgba(62, 38, 44, 0.14), inset 0 0 14px rgba(255, 240, 244, 0.85)',
              }}
              title="Nhấp để phóng to bức tranh chủ vườn ♡"
            >
              {/* Inner Double Dashed Rule */}
              <div
                className="absolute inset-1 sm:inset-1.5 pointer-events-none"
                style={{
                  border: '0.8px dashed rgba(188, 138, 122, 0.65)',
                }}
              />

              <div className="relative overflow-hidden" style={{ borderRadius: '2px' }}>
                <img
                  src="/assets/aistudio/image_6eae7962.png"
                  alt="Chân dung chủ vườn Naomi"
                  className="w-full max-w-[190px] xs:max-w-[220px] sm:max-w-[280px] md:max-w-[340px] h-auto object-contain filter contrast-[1.04] brightness-[1.02]"
                />

                {/* Subtle Magnify Badge on Hover */}
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-[#42222a]/80 text-[#fdf5f0] text-[0.58rem] uppercase tracking-[0.12em] opacity-0 group-hover/portrait:opacity-100 transition-opacity" style={{ borderRadius: '2px' }}>
                  phóng to 🔍
                </div>
              </div>
            </div>

            {/* Pressed Botanical Sprigs Hugging Frame */}
            <span
              className="absolute -top-2 -right-1 text-xs text-[#b36778] select-none pointer-events-none"
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className="absolute top-1/2 -left-3 -translate-y-1/2 text-xs text-[#8a9e82] select-none pointer-events-none"
              aria-hidden="true"
            >
              🌿
            </span>
            <span
              className="absolute -bottom-1 -right-1 text-xs text-[#c97d75] select-none pointer-events-none"
              aria-hidden="true"
            >
              ✿
            </span>
          </div>

          {/* 2. INSCRIBED MANUSCRIPT QUOTE & SOCIAL PLAQUES */}
          <div className="flex flex-col items-center md:items-start gap-4 sm:gap-6 max-w-sm w-full text-center md:text-left">
            {/* Inscribed Quote Box */}
            <div
              className="relative w-full px-4 py-3.5 sm:px-6 sm:py-5 bg-[#fdfaf5]/90 border border-[#d8b4bc] shadow-2xs"
              style={{
                borderRadius: '3px',
                boxShadow: 'inset 0 0 16px rgba(250, 226, 232, 0.55)',
              }}
            >
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-[0.56rem] sm:text-[0.6rem] uppercase tracking-[0.22em] text-[#a06472] opacity-85 mb-1.5 sm:mb-2 select-none">
                <span>❦</span>
                <span style={{ fontFamily: 'var(--font-serif)' }}>INSCRIPTIO CORDIS</span>
                <span className="w-5 sm:w-6 h-[0.7px] bg-[#d096a2]" />
              </div>

              <blockquote
                className="relative text-[0.84rem] sm:text-[0.98rem] italic text-[#482830] leading-snug sm:leading-relaxed tracking-[0.02em] font-light select-text"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <span className="text-[#b36778] font-serif text-sm sm:text-base mr-0.5 select-none opacity-80">
                  “
                </span>
                dear darling,
                <br />
                you will never be unloved by me
                <br />
                you are too well tangled in my soul.
                <span className="text-[#b36778] font-serif text-sm sm:text-base ml-0.5 select-none opacity-80">
                  ”
                </span>
              </blockquote>

              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 sm:mt-3 opacity-75 text-[0.64rem] sm:text-[0.68rem] text-[#8c525f] select-none">
                <span>𖤓</span>
                <span className="w-10 sm:w-12 h-[0.7px] bg-[#d096a2]" />
                <span className="italic text-[#b0586b]" style={{ fontFamily: 'var(--font-handwritten)' }}>
                  — naomi
                </span>
              </div>
            </div>

            {/* Social Manuscript Plaques (Facebook & Discord) */}
            <div className="relative flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-5 w-full">
              <a
                href="https://www.facebook.com/profile.php?id=61593294097593"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.08em] sm:tracking-[0.1em] text-[#482830] hover:text-[#211216] transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 focus:outline-none"
                style={{
                  fontFamily: 'var(--font-serif)',
                  background: 'linear-gradient(145deg, #fef5f0 0%, #f0d6dc 100%)',
                  borderRadius: '3px',
                  border: '1px solid rgba(198, 142, 154, 0.8)',
                  boxShadow: '0 2px 8px rgba(62, 38, 44, 0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
                }}
              >
                <span className="text-[#b36778] text-[0.72rem] transition-transform duration-300 group-hover/link:scale-125">
                  ♡
                </span>
                <span>facebook</span>
              </a>

              <button
                type="button"
                onClick={handleDiscordClick}
                className="group/link px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.08em] sm:tracking-[0.1em] text-[#482830] hover:text-[#211216] transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 focus:outline-none"
                style={{
                  fontFamily: 'var(--font-serif)',
                  background: 'linear-gradient(145deg, #fef5f0 0%, #f0d6dc 100%)',
                  borderRadius: '3px',
                  border: '1px solid rgba(198, 142, 154, 0.8)',
                  boxShadow: '0 2px 8px rgba(62, 38, 44, 0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
                }}
              >
                <span className="text-[#8c528c] text-[0.72rem] transition-transform duration-300 group-hover/link:scale-125">
                  ♡
                </span>
                <span>discord</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE PORTRAIT VIEWER MODAL (Gently enlarges into vintage portrait viewer on click) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#2b161b]/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl p-6 sm:p-8 text-center overflow-hidden"
              style={{
                borderRadius: '5px 7px 5px 7px',
                background:
                  'radial-gradient(ellipse 95% 90% at 50% 45%, #fef8f4 0%, #f9edf0 55%, #f1ded5 100%)',
                border: '1.8px solid rgba(198, 150, 140, 0.9)',
                boxShadow:
                  '0 28px 70px rgba(48, 24, 30, 0.35), 0 0 0 5px rgba(254, 245, 248, 0.6), inset 0 0 40px rgba(255, 226, 232, 0.8)',
              }}
            >
              {/* Close Plaque */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-[#7c4652] hover:text-[#211216] bg-[#fdf5f0] hover:bg-[#f0d6dc] border border-[#d8adb6] text-sm transition-all cursor-pointer"
                style={{ borderRadius: '2px' }}
                aria-label="Đóng"
              >
                ✕
              </button>

              <div className="mb-3">
                <span className="text-xs uppercase tracking-[0.26em] text-[#a06472]" style={{ fontFamily: 'var(--font-serif)' }}>
                  ❧ IMAGO CUSTODIS · VINTAGE PORTRAIT VIEWER ❧
                </span>
                <h3 className="text-lg sm:text-xl text-[#3f2027] font-normal lowercase tracking-[0.1em] mt-0.5" style={{ fontFamily: 'var(--font-whimsical)' }}>
                  chân dung chủ vườn naomi
                </h3>
              </div>

              {/* Uncropped Image displayed in elegant viewer frame */}
              <div
                className="relative p-2.5 sm:p-3.5 bg-[#fdfaf5] border border-[#d8adb6] shadow-md my-3 max-h-[70vh] overflow-hidden flex items-center justify-center"
                style={{ borderRadius: '4px' }}
              >
                <img
                  src="/assets/aistudio/image_6eae7962.png"
                  alt="Chân dung phóng to Naomi"
                  className="max-h-[62vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-[#ead0d6] hover:bg-[#dec0c8] border border-[#b87684] text-xs font-medium text-[#482830] tracking-[0.12em] lowercase transition-all cursor-pointer shadow-2xs"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '3px',
                  }}
                >
                  ❦ đóng lại ♡
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Copied Discord Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[140] px-4 py-2 text-xs text-[#482830] bg-[#fef5f0] border border-[#d8adb6] shadow-lg flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-serif)',
              borderRadius: '3px',
            }}
          >
            <span className="text-[#b36778]">❦</span>
            <span>đã sao chép tên discord: @msz.y1yaoo ♡</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
