import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SiYingDeskAtmosphere } from '../components/territory/siying/SiYingDeskAtmosphere';
import { SiYingMasthead } from '../components/territory/siying/SiYingMasthead';
import { SiYingMagazineSpread } from '../components/territory/siying/SiYingMagazineSpread';
import { SiYingFolioNavigation } from '../components/territory/siying/SiYingFolioNavigation';
import { SiYingColophonModal } from '../components/territory/siying/SiYingColophonModal';
import { playPaperRustle } from '../utils/paperAudio';

const TOTAL_SPREADS = 7; // Cover (0), 5 Character Spreads (1-5), Colophon (6)

export const SiYingTerritoryPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [currentSpread, setCurrentSpread] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [isColophonOpen, setIsColophonOpen] = useState(false);

  // Keyboard arrow navigation for flipping magazine pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isColophonOpen) {
        if (e.key === 'Escape') {
          setIsColophonOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentSpread((prev) => {
          if (prev < TOTAL_SPREADS - 1) {
            playPaperRustle(soundEnabled);
            return prev + 1;
          }
          return prev;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSpread((prev) => {
          if (prev > 0) {
            playPaperRustle(soundEnabled);
            return prev - 1;
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isColophonOpen, soundEnabled]);

  const handleNextSpread = () => {
    setCurrentSpread((prev) => Math.min(prev + 1, TOTAL_SPREADS - 1));
  };

  const handlePrevSpread = () => {
    setCurrentSpread((prev) => Math.max(prev - 1, 0));
  };

  const handleGoToSpread = (index: number) => {
    setCurrentSpread(Math.max(0, Math.min(index, TOTAL_SPREADS - 1)));
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden text-[#f7f0e2] flex flex-col justify-between">
      {/* 1. Vintage Editorial Desk Background Ambiance */}
      <SiYingDeskAtmosphere />

      {/* Hidden YouTube Background Audio Player for Si Ying (loops continuously) */}
      {musicPlaying && (
        <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
          <iframe
            src="https://www.youtube.com/embed/osPq9Yb8xm8?autoplay=1&loop=1&playlist=osPq9Yb8xm8"
            allow="autoplay"
            title="Si Ying Background Music"
          />
        </div>
      )}

      {/* 2. Top Masthead & Navigation Header */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <SiYingMasthead
          onBackToClearing={() => navigateTo('forest-map')}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          onOpenColophon={() => setIsColophonOpen(true)}
          musicPlaying={musicPlaying}
          onToggleMusic={() => setMusicPlaying((prev) => !prev)}
        />

        {/* 3. Main Magazine Open Spread */}
        <main className="w-full px-3 sm:px-6">
          <SiYingMagazineSpread
            currentSpread={currentSpread}
            totalSpreads={TOTAL_SPREADS}
            onNextSpread={handleNextSpread}
            onPrevSpread={handlePrevSpread}
            onGoToSpread={handleGoToSpread}
            soundEnabled={soundEnabled}
          />
        </main>

        {/* 4. Bottom Page & Spread Selector */}
        <SiYingFolioNavigation
          currentSpread={currentSpread}
          totalSpreads={TOTAL_SPREADS}
          onNextSpread={handleNextSpread}
          onPrevSpread={handlePrevSpread}
          onGoToSpread={handleGoToSpread}
          soundEnabled={soundEnabled}
        />
      </div>

      {/* 5. Editorial Desk Footer */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-[#443222]/40 text-[0.66rem] font-mono text-[#8a7258] uppercase tracking-[0.16em]">
        <span>THE MAGAZINE ARCHIVE · SI YING · SILVESTRE EDITORIAL DESK</span>
      </footer>

      {/* 6. Editorial Colophon / Press Info Modal */}
      <SiYingColophonModal
        isOpen={isColophonOpen}
        onClose={() => setIsColophonOpen(false)}
      />
    </div>
  );
};
