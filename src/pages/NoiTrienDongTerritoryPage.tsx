import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';

const BG_VIDEO = '/public/assets/aistudio/9cd7b8d600c489d74b27e20a7a838e2c_28a0453d.mp4';
const ASSET_TOP_PORTRAIT = '/assets/aistudio/image_4a726bdc.png';
const ASSET_NEW_DECOR = '/assets/aistudio/image_73115e17.png';

export const NoiTrienDongTerritoryPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative w-full min-h-screen text-[#e8e2dc] flex flex-col items-center overflow-y-auto overflow-x-hidden selection:bg-[#4a3942] selection:text-[#fff]">
      {/* 1. Full-Screen Video Background (Video 1) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src={BG_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark tint overlay so text remains readable without changing original video appearance */}
        <div className="absolute inset-0 bg-[#0b0b0e]/35 pointer-events-none" />
      </div>

      {/* 2. Top Header Bar */}
      <div className="relative z-20 w-full bg-[#161618]/90 backdrop-blur-md border-b border-[#242426] py-2 px-4 flex items-center justify-between text-[0.66rem] font-mono text-[#8a8480] tracking-[0.2em] uppercase">
        <button
          type="button"
          onClick={() => navigateTo('forest-map')}
          className="hover:text-[#e0dad2] transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
        >
          <span>⟵</span>
          <span>SILVESTRE · TRUNG TÂM</span>
        </button>

        <span className="opacity-80">CHẤM · NƠI TRIỀN ĐÔNG ĐƯỢM YÊN</span>

        <span>VOL. 01</span>
      </div>

      {/* 3. Main Composition Area */}
      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center pt-6 sm:pt-10 pb-12 px-3 sm:px-6">
        {/* A. Top Portrait Decorative Asset */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[480px] flex flex-col items-center select-none"
        >
          <img
            src={ASSET_TOP_PORTRAIT}
            alt="Winter - Nơi triền đông đượm yên decorative portrait"
            className="w-full h-auto object-contain block shadow-2xl rounded-none"
            style={{ borderRadius: 0 }}
          />
        </motion.div>

        {/* B. Creator Title (Real HTML Text) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mt-3 mb-6 sm:mb-8 px-4"
        >
          <div
            className="px-6 sm:px-8 py-2 sm:py-2.5 border border-[#6b645f] bg-[#141416]/95 text-center shadow-md rounded-none"
            style={{ borderRadius: 0 }}
          >
            <h1
              className="text-lg sm:text-2xl text-[#f3ede6] tracking-[0.06em] font-normal leading-normal"
              style={{
                fontFamily: '"Cormorant Infant", "Noto Serif", Georgia, serif',
                fontStyle: 'italic',
              }}
            >
              nơi triền đông đượm yên
            </h1>
          </div>

          <p
            className="mt-3 text-xs sm:text-[0.82rem] text-[#9c938d] tracking-[0.04em] italic text-center max-w-lg leading-relaxed"
            style={{ fontFamily: '"Noto Serif", "Source Serif 4", serif' }}
          >
            viễn cách trùng dương, gửi đến tiết đông diệu vợi, này đây một tấm chân tình đượm yên.
          </p>
        </motion.div>

        {/* C. Replaced Decorative Asset (New Image 2 replacing old Image 3) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[660px] mb-8 select-none"
        >
          <img
            src={ASSET_NEW_DECOR}
            alt="Nơi triền đông đượm yên - New decorative asset"
            className="w-full h-auto object-contain block shadow-2xl rounded-none"
            style={{ borderRadius: 0 }}
          />
        </motion.div>

        {/* D. Navigation / Divider Bar */}
        <div className="w-full border-y border-[#383335] bg-[#151518]/90 backdrop-blur-sm my-4">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between text-[0.68rem] sm:text-[0.74rem] font-mono tracking-[0.16em] uppercase text-[#a39c96]">
            <button
              type="button"
              onClick={() => navigateTo('forest-map')}
              className="flex items-center gap-2 text-[#99928c] hover:text-[#f2ede6] transition-colors cursor-pointer focus:outline-none"
            >
              <span className="w-4 h-4 rounded-full border border-[#6b645f] flex items-center justify-center text-[0.55rem] text-[#b0a8a0]">
                ◂
              </span>
              <span>KHU RỪNG CỔ TÍCH</span>
            </button>

            <span className="text-[#c2bab2] font-semibold tracking-[0.2em] hidden xs:inline">
              NGHĨA TRANG CỔ RỪNG ĐÁ XÁM
            </span>

            <button
              type="button"
              onClick={() => navigateTo('creator-territory', { creatorId: 'si-ying' })}
              className="flex items-center gap-2 text-[#99928c] hover:text-[#f2ede6] transition-colors cursor-pointer focus:outline-none"
            >
              <span>NHÀ THỜ MÙA ĐÔNG</span>
              <span className="w-4 h-4 rounded-full border border-[#6b645f] flex items-center justify-center text-[0.55rem] text-[#b0a8a0]">
                ▸
              </span>
            </button>
          </div>
        </div>

        {/* E. Empty Archive Environment */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="text-center max-w-xl space-y-3 mt-6 p-6 rounded-none bg-[#141416]/85 border border-[#3b3236] backdrop-blur-md shadow-xl select-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#4a3942] bg-[#1a1217] text-[0.62rem] font-mono tracking-[0.24em] text-[#d4b2be] uppercase rounded-none">
            <span>VOLUME 01</span>
            <span>·</span>
            <span>WINTER ARCHIVE</span>
            <span>·</span>
            <span>CHAPTERS OF THE FORGOTTEN</span>
          </div>

          <h2
            className="text-base sm:text-lg uppercase tracking-[0.2em] text-[#cfc8c0] font-light pt-2"
            style={{ fontFamily: '"Noto Serif", Georgia, serif' }}
          >
            THE STORIES THAT SLEEP BENEATH THE THORNS
          </h2>

          <p
            className="text-xs sm:text-sm italic text-[#9c938d] tracking-[0.06em] max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: '"Noto Serif", Georgia, serif' }}
          >
            Khoảng trời nơi đây tạm thời tĩnh lặng. Những câu chuyện và mảnh hồn ngủ quên dưới tán gai mùa đông chưa được công bố.
          </p>

          <div className="pt-2 text-[0.65rem] font-mono text-[#7a726e] tracking-widest uppercase">
            [ TRANG LƯU TRỮ TRỐNG · CHỜ ĐỢI BẢN THẢO ]
          </div>
        </motion.div>
      </main>

      {/* 4. Footer */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-[#242426] bg-[#161618] text-[0.68rem] font-mono text-[#8a8480] uppercase tracking-[0.16em]">
        <span>NƠI TRIỀN ĐÔNG ĐƯỢM YÊN. · SILVESTRE EDITORIAL DESK</span>
      </footer>
    </div>
  );
};
