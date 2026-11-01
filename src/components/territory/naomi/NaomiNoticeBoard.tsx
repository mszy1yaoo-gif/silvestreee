import React from 'react';
import { motion } from 'motion/react';

export const NaomiNoticeBoard: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Mộ Sương Chi Ức Dao Announcement Board"
      className="w-full max-w-2xl relative select-none"
    >
      {/* Parchment Base Card */}
      <div
        className="relative rounded-[26px] p-7 sm:p-10 md:p-12 text-[#2d2217] shadow-[0_20px_54px_rgba(50,38,30,0.18),0_2px_14px_rgba(255,255,255,0.7)_inset]"
        style={{
          background:
            'linear-gradient(150deg, rgba(255, 253, 248, 0.94) 0%, rgba(253, 248, 238, 0.9) 55%, rgba(248, 240, 230, 0.88) 100%)',
          border: '1.5px solid rgba(214, 192, 160, 0.65)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Delicate Botanical Corner Vines & Tiny Flowers */}
        <div className="absolute top-3.5 left-3.5 w-10 h-10 pointer-events-none opacity-50 border-t-2 border-l-2 border-[#a48e72] rounded-tl-md flex items-start justify-start p-1 text-[0.7rem] text-[#937b60]">
          ❀
        </div>
        <div className="absolute top-3.5 right-3.5 w-10 h-10 pointer-events-none opacity-50 border-t-2 border-r-2 border-[#a48e72] rounded-tr-md flex items-start justify-end p-1 text-[0.7rem] text-[#937b60]">
          ❀
        </div>
        <div className="absolute bottom-3.5 left-3.5 w-10 h-10 pointer-events-none opacity-50 border-b-2 border-l-2 border-[#a48e72] rounded-bl-md flex items-end justify-start p-1 text-[0.7rem] text-[#937b60]">
          ❀
        </div>
        <div className="absolute bottom-3.5 right-3.5 w-10 h-10 pointer-events-none opacity-50 border-b-2 border-r-2 border-[#a48e72] rounded-br-md flex items-end justify-end p-1 text-[0.7rem] text-[#937b60]">
          ❀
        </div>

        {/* Top Floating Parchment Crest: Dream Seed Seal */}
        <div className="flex justify-center -mt-10 sm:-mt-13 mb-3">
          <div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#c4ae90] shadow-[0_4px_14px_rgba(75,55,35,0.2)] flex items-center justify-center text-base sm:text-lg"
            style={{
              background: 'radial-gradient(circle, #fffdfa 0%, #f7eee2 100%)',
            }}
          >
            <span>🌸</span>
          </div>
        </div>

        {/* Board Main Title: mộ sương chi ức dao */}
        <div className="text-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lowercase tracking-[0.16em] font-normal text-[#2e2115]"
            style={{ fontFamily: 'var(--font-whimsical)' }}
          >
            mộ sương chi ức dao
          </h1>

          {/* Subtitle: welcome to rừng mộng. */}
          <p
            className="mt-1 text-sm sm:text-base italic text-[#7a644f] tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            welcome to rừng mộng.
          </p>
        </div>

        {/* Delicate Vine & Flower Garland Divider */}
        <div className="my-6 sm:my-7 flex items-center justify-center gap-3 opacity-65">
          <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#947c61]" />
          <span className="text-xs text-[#947c61]">𖥸</span>
          <span className="text-[0.65rem] text-[#b4987a]">✦</span>
          <span className="text-xs text-[#947c61]">𖥸</span>
          <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#947c61]" />
        </div>

        {/* Flexible Content Area: Beautiful Empty Parchment Prepared for Future Announcements */}
        <div
          className="relative rounded-[16px] p-6 sm:p-8 border border-[#e5d8c6] text-center shadow-[0_4px_18px_rgba(60,45,30,0.05)]"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 253, 0.9) 0%, rgba(253, 249, 243, 0.85) 100%)',
          }}
        >
          {/* Subtle Watermark Floral Motif */}
          <div className="text-3xl opacity-20 mb-2 select-none">𖥸</div>

          <p
            className="text-xs sm:text-sm text-[#87745f] italic tracking-[0.06em] leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            bảng tin rừng mộng đang chờ đón những lời thì thầm đầu tiên...
          </p>

          <div
            className="mt-4 flex items-center justify-center gap-2 text-[0.72rem] text-[#a4917b] italic tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <span>❀</span>
            <span>nơi lưu giữ tin tức, hành trình và câu chuyện của Naomi</span>
            <span>❀</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
