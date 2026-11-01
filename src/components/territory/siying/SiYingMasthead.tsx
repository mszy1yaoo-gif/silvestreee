import React from 'react';
import { motion } from 'motion/react';

interface SiYingMastheadProps {
  onBackToClearing: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenColophon: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export const SiYingMasthead: React.FC<SiYingMastheadProps> = ({
  onBackToClearing,
  soundEnabled,
  onToggleSound,
  onOpenColophon,
  musicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center pt-2 pb-6 px-3 sm:px-6">
      {/* 1. Top Utility Navigation Bar */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-[#5c4632]/35 text-xs text-[#c9b597] font-mono">
        {/* Back Link */}
        <button
          type="button"
          onClick={onBackToClearing}
          className="group inline-flex items-center gap-1.5 text-[#d6c4a8] hover:text-[#f8ecda] transition-colors cursor-pointer focus:outline-none"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
            ⟵
          </span>
          <span className="font-serif italic tracking-[0.08em] text-[0.8rem] sm:text-sm lowercase">
            khoảng rừng trung tâm
          </span>
        </button>

        {/* Center Office Code */}
        <div className="hidden sm:flex items-center gap-2 text-[0.66rem] tracking-[0.2em] text-[#9c8466] uppercase">
          <span>❖ BÀN BIÊN TẬP SỐ 03</span>
          <span className="opacity-40">/</span>
          <span>TÒA SOẠN CỔ THỤ</span>
        </div>

        {/* Right Tools: Music Toggle, Sound Toggle, Editorial Desk Info & Discord */}
        <div className="flex items-center gap-2 sm:gap-3 text-[0.7rem] sm:text-xs">
          {/* Music ON/OFF Button */}
          <button
            type="button"
            onClick={onToggleMusic}
            title={musicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] border transition-all cursor-pointer focus:outline-none font-mono text-xs ${
              musicPlaying
                ? 'border-[#8c6b4b] bg-[#3d2c1d] text-[#f8ecda] shadow-xs'
                : 'border-[#5a4430]/60 bg-[#2b2016]/80 text-[#9c8466] hover:text-[#c8b598]'
            }`}
          >
            <span className={musicPlaying ? 'animate-pulse text-amber-300' : ''}>♫</span>
            <span className="hidden xs:inline text-[0.65rem] tracking-wider">
              {musicPlaying ? 'nhạc: bật' : 'nhạc: tắt'}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt tiếng lật giấy' : 'Bật tiếng lật giấy'}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] border border-[#5a4430]/60 bg-[#2b2016]/80 text-[#c8b598] hover:text-[#fff1da] hover:border-[#8c6b4b] transition-all cursor-pointer focus:outline-none"
          >
            <span>{soundEnabled ? '📖' : '🔇'}</span>
            <span className="hidden xs:inline text-[0.65rem] tracking-wider font-mono">
              {soundEnabled ? 'tiếng: bật' : 'tiếng: tắt'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenColophon}
            className="inline-flex items-center gap-1 text-[#d8c5aa] hover:text-[#fff2dc] transition-colors cursor-pointer focus:outline-none font-serif italic text-xs tracking-wider"
          >
            <span>ℹ</span>
            <span className="hidden sm:inline">bản tin tòa soạn</span>
          </button>
        </div>
      </div>

      {/* 2. Vintage Newspaper / Magazine Oxford Rule Masthead Frame */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center text-center relative px-2"
      >
        {/* Registration Marks in Corners */}
        <div className="absolute top-0 left-0 text-[0.65rem] text-[#80674d]/50 font-mono select-none">
          + ⌖ ARCHIVE-001
        </div>
        <div className="absolute top-0 right-0 text-[0.65rem] text-[#80674d]/50 font-mono select-none">
          REG. 100% ⌖ +
        </div>

        {/* Top Oxford Double Rules */}
        <div className="w-full flex flex-col items-center gap-[2px] mb-2 opacity-75">
          <div className="w-full h-[1.5px] bg-[#6d543c]" />
          <div className="w-full flex items-center justify-between text-[0.58rem] sm:text-[0.64rem] text-[#bda687] font-mono tracking-[0.24em] uppercase py-0.5">
            <span>VOL. 01 · SPECIAL ARCHIVE</span>
            <span className="hidden sm:inline">LƯU TRỮ ĐẶC BIỆT DÀNH CHO CÁC NHÂN VẬT CHƯA XUẤT BẢN</span>
            <span>SILVESTRE PRESS · EST. 2024</span>
          </div>
          <div className="w-full h-[0.5px] bg-[#6d543c]" />
        </div>

        {/* Grand Literary Masthead Title: SI YING */}
        <div className="relative my-1">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.22em] text-[#faf3e3] uppercase select-none"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: '0 2px 18px rgba(0, 0, 0, 0.7), 0 0 35px rgba(230, 205, 160, 0.15)',
            }}
          >
            SI YING
          </h1>

          {/* Editorial Stamp angled over the title */}
          <div className="absolute -top-1 -right-4 sm:-right-12 rotate-[8deg] pointer-events-none opacity-85">
            <span className="inline-block px-2 py-0.5 border-[1.5px] border-[#9e3a2b] text-[#b34230] bg-[#1a120c]/90 text-[0.55rem] sm:text-[0.62rem] font-mono font-bold tracking-[0.16em] uppercase shadow-md">
              [ THE MAGAZINE ARCHIVE ]
            </span>
          </div>
        </div>

        {/* English & Vietnamese Subtitle */}
        <p
          className="text-sm sm:text-base md:text-lg text-[#ded0b6] tracking-[0.2em] uppercase font-light mt-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          THE ARCHIVE OF UNPUBLISHED STORIES
        </p>

        <p
          className="text-xs sm:text-sm italic text-[#a38c71] tracking-[0.1em] mt-1 max-w-xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          &ldquo;mỗi nhân vật là một trang đặc san độc bản đang chờ được ấn loát&rdquo;
        </p>

        {/* Bottom Oxford Double Rules */}
        <div className="w-full flex flex-col items-center gap-[2px] mt-2.5 opacity-75">
          <div className="w-full h-[0.5px] bg-[#6d543c]" />
          <div className="w-full flex items-center justify-between text-[0.58rem] sm:text-[0.62rem] text-[#9e8669] font-mono tracking-[0.18em] py-0.5 uppercase">
            <span>FOLIO EDITIONS</span>
            <span>❖ TÒA SOẠN CỔ THỤ · VĂN PHÒNG BIÊN TẬP ❖</span>
            <span>ISSUE NO. 001</span>
          </div>
          <div className="w-full h-[1.5px] bg-[#6d543c]" />
        </div>
      </motion.div>
    </header>
  );
};
