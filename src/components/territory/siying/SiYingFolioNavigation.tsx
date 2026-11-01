import React from 'react';
import { playPaperRustle } from '../../../utils/paperAudio';

interface SiYingFolioNavigationProps {
  currentSpread: number;
  totalSpreads: number;
  onNextSpread: () => void;
  onPrevSpread: () => void;
  onGoToSpread: (index: number) => void;
  soundEnabled: boolean;
}

const SPREAD_LABELS = [
  { title: 'Bìa & Tuyên Ngôn', pageHint: 'P. 00 — 01' },
  { title: 'Đặc San 01 (Đức & Kính)', pageHint: 'P. 02 — 03' },
  { title: 'Đặc San 02 (Tri Hành & Minh)', pageHint: 'P. 04 — 05' },
  { title: 'Đặc San 03 (Khải Minh & Shinya)', pageHint: 'P. 06 — 07' },
  { title: 'Đặc San 04 (Dmitri & Chartreuse)', pageHint: 'P. 08 — 09' },
  { title: 'Đặc San 05 (Rye & Vindoro)', pageHint: 'P. 10 — 11' },
  { title: 'Hậu Ký & Colophon', pageHint: 'P. 12 — 13' },
];

export const SiYingFolioNavigation: React.FC<SiYingFolioNavigationProps> = ({
  currentSpread,
  totalSpreads,
  onNextSpread,
  onPrevSpread,
  onGoToSpread,
  soundEnabled,
}) => {
  const handlePrev = () => {
    if (currentSpread > 0) {
      playPaperRustle(soundEnabled);
      onPrevSpread();
    }
  };

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1) {
      playPaperRustle(soundEnabled);
      onNextSpread();
    }
  };

  const handleSelectTab = (idx: number) => {
    if (idx !== currentSpread) {
      playPaperRustle(soundEnabled);
      onGoToSpread(idx);
    }
  };

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center gap-3 pt-2 pb-10 px-4">
      {/* 1. Main Pagination Bar */}
      <div className="w-full flex items-center justify-between gap-3 p-2 rounded-[6px] border border-[#52402d]/70 bg-[#1e150d]/90 shadow-xl backdrop-blur-md">
        {/* Previous Page Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentSpread === 0}
          className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[4px] border font-mono text-xs uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
            currentSpread === 0
              ? 'opacity-30 border-[#423223] text-[#705b45] cursor-not-allowed'
              : 'border-[#7a6147] bg-[#2d1f14] text-[#ebdcc6] hover:bg-[#3d2c1d] hover:border-[#a68664]'
          }`}
        >
          <span aria-hidden="true">⟵</span>
          <span className="hidden xs:inline">Trang trước</span>
        </button>

        {/* Center Folio Spreads Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {SPREAD_LABELS.map((item, idx) => {
            const isActive = idx === currentSpread;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTab(idx)}
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-[3px] font-mono text-[0.66rem] sm:text-xs transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                  isActive
                    ? 'bg-[#f7f0e1] text-[#1c140d] font-bold shadow-md'
                    : 'text-[#ab9477] hover:text-[#f2e6d3] hover:bg-[#2b1f14]'
                }`}
              >
                <span className="block">{item.title}</span>
                <span
                  className={`block text-[0.58rem] tracking-tight ${
                    isActive ? 'text-[#8a382b]' : 'opacity-60'
                  }`}
                >
                  {item.pageHint}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentSpread === totalSpreads - 1}
          className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[4px] border font-mono text-xs uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
            currentSpread === totalSpreads - 1
              ? 'opacity-30 border-[#423223] text-[#705b45] cursor-not-allowed'
              : 'border-[#7a6147] bg-[#2d1f14] text-[#ebdcc6] hover:bg-[#3d2c1d] hover:border-[#a68664]'
          }`}
        >
          <span className="hidden xs:inline">Trang kế</span>
          <span aria-hidden="true">⟶</span>
        </button>
      </div>

      {/* 2. Micro Keyboard & Touch Helper */}
      <div className="flex items-center justify-between w-full text-[0.68rem] text-[#8c7457] font-mono tracking-widest px-2">
        <span className="opacity-75">❖ 10 BẢN THẢO ĐẶC SAN</span>
        <span className="italic font-serif text-[0.74rem] text-[#bda688]">
          (bấm phím ← / → hoặc nhấp vào mép trang để lật tạp chí)
        </span>
        <span className="opacity-75">TÒA SOẠN CỔ THỤ</span>
      </div>
    </div>
  );
};
