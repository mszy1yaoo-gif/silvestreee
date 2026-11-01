import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

export interface AnnouncementItem {
  text: string;
}

const announcements: AnnouncementItem[] = [
  {
    text: "sylvester vance hiện tại chưa phải là bản chính thức, mọi người test rồi feedback lại giúp sop nhéeee",
  },
];

export const NaomiAnnouncementAndSocials: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Automatically cycle announcements if multiple exist
  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, []);

  const activeAnnouncement = announcements[currentIdx] || announcements[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* 1. RENAISSANCE NOTICE PINNED ONTO THE STORYBOOK PAGE */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label="Xem thông báo chi tiết từ rừng mộng"
        className="group relative w-full px-5 sm:px-7 py-3.5 cursor-pointer transition-all duration-500 hover:-translate-y-0.5"
        style={{
          borderRadius: '4px 6px 4px 6px',
          background:
            'linear-gradient(160deg, #fbf6ea 0%, #f4ebd8 52%, #ede0c8 100%)',
          border: '1px solid rgba(176, 144, 98, 0.72)',
          boxShadow:
            '0 8px 22px rgba(58, 42, 24, 0.09), 2px 3px 0px rgba(218, 198, 168, 0.65), inset 0 0 18px rgba(255, 248, 232, 0.8)',
        }}
      >
        {/* Inner Engraved Botanical Hairline Border */}
        <div
          className="absolute inset-1 pointer-events-none"
          style={{
            border: '0.7px dashed rgba(174, 142, 98, 0.55)',
          }}
        />

        {/* Folded Corner Ear (Top Right) */}
        <div
          className="absolute top-0 right-0 w-4 h-4 pointer-events-none"
          style={{
            background: 'linear-gradient(225deg, rgba(215, 195, 165, 0.65) 50%, rgba(235, 218, 192, 0.95) 50%)',
            borderBottom: '1px solid rgba(176, 144, 98, 0.55)',
            borderLeft: '1px solid rgba(176, 144, 98, 0.55)',
          }}
        />

        {/* Tiny Dusty-Rose Wax Seal Emblem Pinned at Top Center */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-[#5e383c]"
          style={{
            fontFamily: 'var(--font-serif)',
            background: 'linear-gradient(145deg, #f3dee0 0%, #e4c3c7 100%)',
            border: '1px solid rgba(178, 128, 136, 0.8)',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(68, 42, 46, 0.14)',
          }}
        >
          <span className="text-[#9e4f5a]">❦</span>
          <span>NOTA HERBARII</span>
          <span className="text-[#9e4f5a]">❦</span>
        </div>

        {/* Notice Content: Wax Seal Rosette + Handwritten/Editorial Text + Folio Action */}
        <div className="relative z-10 flex items-center gap-3 pt-1">
          {/* Tiny Wax Seal / Pressed Flower Medallion */}
          <div
            className="w-6 h-6 shrink-0 flex items-center justify-center text-xs text-[#8f4c56]"
            style={{
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ebd0d4 0%, #d8aeb5 100%)',
              border: '1px solid rgba(164, 108, 118, 0.75)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), 0 1px 4px rgba(80,45,50,0.15)',
            }}
            aria-hidden="true"
          >
            ✿
          </div>

          <div className="relative flex-1 overflow-hidden">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-xs sm:text-[0.84rem] text-[#3f3021] italic tracking-[0.03em] leading-snug"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              &ldquo;{activeAnnouncement.text}&rdquo;
            </motion.div>
          </div>

          <span
            className="px-2 py-0.5 text-[0.65rem] text-[#6e553b] shrink-0 tracking-[0.12em] uppercase transition-colors group-hover:text-[#2e2013]"
            style={{
              fontFamily: 'var(--font-serif)',
              background: 'rgba(245, 234, 214, 0.8)',
              border: '0.8px solid rgba(176, 144, 100, 0.55)',
              borderRadius: '2px',
            }}
          >
            đọc thư ↗
          </span>
        </div>
      </motion.div>

      {/* 2. ILLUMINATED MANUSCRIPT NOTICE MODAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
                style={{
                  backgroundColor: 'rgba(42, 30, 18, 0.42)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Thông báo từ rừng mộng"
                  className="relative w-full max-w-md p-6 sm:p-8 overflow-hidden select-none text-center"
                  style={{
                    borderRadius: '4px 6px 4px 6px',
                    background:
                      'linear-gradient(160deg, #fcf8ef 0%, #f5ecdc 55%, #ece0ca 100%)',
                    border: '1.5px solid rgba(176, 144, 98, 0.85)',
                    boxShadow:
                      '0 24px 60px rgba(46, 32, 18, 0.28), 0 0 0 4px rgba(248, 239, 222, 0.4), inset 0 0 32px rgba(246, 228, 192, 0.75)',
                  }}
                >
                  {/* Subtle Parchment Paper Grain */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                      backgroundImage:
                        'radial-gradient(rgba(145, 118, 86, 0.18) 1px, transparent 0)',
                      backgroundSize: '14px 14px',
                    }}
                  />

                  {/* Inner Botanical Double Frame */}
                  <div
                    className="absolute inset-2.5 pointer-events-none"
                    style={{
                      border: '1px solid rgba(182, 150, 106, 0.5)',
                    }}
                  />
                  <div
                    className="absolute inset-3.5 pointer-events-none"
                    style={{
                      border: '0.7px dashed rgba(176, 144, 102, 0.45)',
                    }}
                  />

                  {/* Close Plaque */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Đóng bảng thông báo"
                    className="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center text-xs text-[#6e563d] hover:text-[#2b1e12] bg-[#f8f0e0] hover:bg-[#efe2ca] border border-[#c8ac84] transition-all cursor-pointer"
                    style={{ borderRadius: '2px' }}
                  >
                    ✕
                  </button>

                  {/* Top Wax Seal Medallion */}
                  <div
                    className="relative z-10 w-9 h-9 mx-auto mb-2.5 flex items-center justify-center text-sm text-[#8f4c56]"
                    style={{
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #f0d7db 0%, #dbb2b9 100%)',
                      border: '1px solid rgba(164, 108, 118, 0.8)',
                      boxShadow: '0 2px 8px rgba(80, 45, 50, 0.15)',
                    }}
                  >
                    ❦
                  </div>

                  <span
                    className="relative z-10 block text-[0.64rem] uppercase tracking-[0.24em] text-[#84694a] mb-1"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    EPISTOLA EX HORTO · THƯ TỪ VƯỜN CỔ
                  </span>

                  {/* Modal Header */}
                  <h3
                    className="relative z-10 text-lg sm:text-xl text-[#362718] font-normal lowercase tracking-[0.08em] mb-3.5"
                    style={{ fontFamily: 'var(--font-whimsical)' }}
                  >
                    thì thầm từ rừng mộng
                  </h3>

                  {/* Full Announcement Text */}
                  <div
                    className="relative z-10 px-4 py-4 bg-[#fdfaf2]/90 border border-[#d6be9c] text-sm text-[#423122] italic leading-relaxed tracking-[0.03em] mb-5"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                      boxShadow: 'inset 0 0 14px rgba(236, 218, 188, 0.45)',
                    }}
                  >
                    &ldquo;{activeAnnouncement.text}&rdquo;
                  </div>

                  {/* Footer Action Plaque */}
                  <div className="relative z-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-1.5 text-xs font-medium lowercase tracking-[0.12em] text-[#3b2a1a] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                        background: 'linear-gradient(145deg, #f3e5ce 0%, #e5d0b1 100%)',
                        border: '1px solid rgba(172, 138, 94, 0.85)',
                        boxShadow: '0 3px 10px rgba(64, 46, 28, 0.1)',
                      }}
                    >
                      ❦ đã rõ rồi ♡
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
