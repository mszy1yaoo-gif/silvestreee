import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPaperRustle } from '../../../utils/paperAudio';
import { siYingCharacters, SiYingCharacterEntry } from '../../../data/siYingCharacters';

interface SiYingMagazineSpreadProps {
  currentSpread: number;
  totalSpreads: number;
  onNextSpread: () => void;
  onPrevSpread: () => void;
  onGoToSpread: (index: number) => void;
  soundEnabled: boolean;
}

export const SiYingMagazineSpread: React.FC<SiYingMagazineSpreadProps> = ({
  currentSpread,
  totalSpreads,
  onNextSpread,
  onPrevSpread,
  onGoToSpread,
  soundEnabled,
}) => {
  const handlePageClick = (side: 'left' | 'right') => {
    if (side === 'left' && currentSpread > 0) {
      playPaperRustle(soundEnabled);
      onPrevSpread();
    } else if (side === 'right' && currentSpread < totalSpreads - 1) {
      playPaperRustle(soundEnabled);
      onNextSpread();
    }
  };

  const renderCharacterPage = (char: SiYingCharacterEntry, pageNumber: string, side: 'left' | 'right') => {
    return (
      <div
        onClick={() => handlePageClick(side)}
        className="relative p-6 sm:p-8 md:p-9 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#645039]/25 bg-[#faf4e7]/95 hover:bg-[#fff9ee] transition-colors cursor-pointer group/char"
      >
        {/* Top Running Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#3b2d1e]/30 text-[0.6rem] font-mono text-[#5f4e3b] uppercase tracking-[0.2em]">
          <span>SI YING EDITORIAL · {char.issueNumber}</span>
          <span className="text-[#8a382b] font-bold">UNPUBLISHED SPECIMEN</span>
          <span className="font-semibold">{pageNumber}</span>
        </div>

        {/* Rubber Stamp: NSFW / Editorial Tag */}
        <div className="my-2.5 flex items-center justify-between">
          <div className="px-2 py-0.5 border border-[#8a382b] text-[#8a382b] font-mono text-[0.58rem] tracking-[0.16em] uppercase font-bold bg-[#faf3e7]/90 -rotate-1 shadow-xs">
            [ R18 · BẢN THẢO ĐẶC BIỆT ]
          </div>
          <span className="text-[0.68rem] font-mono text-[#735c43]">❖ {char.thematicMotif}</span>
        </div>

        {/* Character Article Content */}
        <div className="space-y-3.5 my-auto">
          {/* Issue Kicker */}
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] font-mono uppercase tracking-[0.2em] text-[#863728] font-bold">
              ĐẶC SAN TÒA SOẠN · {char.issueNumber}
            </span>
            <span className="text-[0.58rem] font-mono text-[#745d45]">HỒ SƠ SỐ #{char.id.toUpperCase()}</span>
          </div>

          {/* Character Name */}
          <div>
            <h2
              className="text-2xl sm:text-3xl font-light text-[#1c140c] tracking-[0.14em] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {char.name}
            </h2>
            <p
              className="text-xs sm:text-[0.84rem] italic text-[#63503d] tracking-[0.06em] mt-1 leading-relaxed"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              &ldquo;{char.intro}&rdquo;
            </p>
          </div>

          {/* Editorial Note Box */}
          {char.editorialNote && (
            <div className="p-2.5 rounded-[2px] border-l-2 border-[#863728] bg-[#eee4d0]/75 font-mono text-[0.7rem] text-[#34271a]">
              <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#8a382b] font-bold mb-0.5">
                — GHI CHÚ TỪ BÀN BIÊN TẬP —
              </span>
              <span className="italic font-serif text-[0.8rem] text-[#22180e]">{char.editorialNote}</span>
            </div>
          )}

          {/* Tropes / Tags */}
          <div>
            <span className="block text-[0.58rem] font-mono text-[#78634e] uppercase tracking-[0.16em] mb-1.5">
              TỪ KHÓA / TAGS:
            </span>
            <div className="flex flex-wrap gap-1.5 text-[0.62rem] font-mono text-[#4a3927]">
              {char.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-1.5 py-0.5 border border-[#8c7457]/40 bg-[#f2e9d7] rounded-[2px]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links & Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-dashed border-[#8c7457]/50 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8a382b]">
              <span>♡</span>
              <span className="text-[0.62rem] font-bold">LƯU TRỮ ĐỘC QUYỀN</span>
            </div>

            <div className="flex items-center gap-2">
              {char.fullPlotUrl && (
                <a
                  href={char.fullPlotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 border border-[#3b2d1e] bg-[#2b1f14] text-[#f4ebdc] rounded-[2px] text-[0.65rem] hover:bg-[#3d2c1d] transition-colors"
                >
                  đọc cốt truyện ↗
                </a>
              )}
              {char.ggaiUrl && (
                <a
                  href={char.ggaiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 border border-[#8a382b] bg-[#8a382b] text-[#fff9ee] rounded-[2px] text-[0.65rem] hover:bg-[#9e4334] transition-colors font-bold"
                >
                  tìm hắn ♡
                </a>
              )}
              {!char.ggaiUrl && (
                <span className="text-[0.62rem] italic text-[#8a382b] font-serif">
                  (bản thảo lưu bút riêng)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Folio Footer */}
        <div className="pt-2 border-t border-[#3b2d1e]/30 flex items-center justify-between text-[0.6rem] font-mono text-[#74614a]">
          <span>ĐẶC SAN SI YING</span>
          <span className="font-semibold">{pageNumber}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 sm:my-6 select-none flex flex-col items-center">
      {/* 1. Underlying Stacked Pages Effect */}
      <div className="relative w-full flex justify-center">
        <div
          className="absolute inset-x-2 -bottom-3 sm:-bottom-4 h-full rounded-[4px] pointer-events-none opacity-40 shadow-2xl"
          style={{ background: '#e3d7c1', transform: 'scale(0.985) translateY(6px)' }}
        />
        <div
          className="absolute inset-x-1 -bottom-1.5 sm:-bottom-2 h-full rounded-[4px] pointer-events-none opacity-70 shadow-xl"
          style={{ background: '#ece2cd', transform: 'scale(0.993) translateY(3px)' }}
        />

        {/* 2. Main Open Magazine Folio Spread Container */}
        <div
          className="relative w-full rounded-[6px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.65),0_8px_20px_rgba(30,20,12,0.4)] border border-[#4a3928]/80"
          style={{
            background: 'linear-gradient(135deg, #f7f1e4 0%, #efe7d3 50%, #e9deca 100%)',
          }}
        >
          {/* Halftone Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply z-10"
            style={{
              backgroundImage: 'radial-gradient(rgba(50, 38, 26, 0.14) 0.75px, transparent 0)',
              backgroundSize: '10px 10px',
            }}
          />

          {/* Central Spine Gutter */}
          <div
            className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 z-20 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.32) 48%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.32) 52%, rgba(0,0,0,0.18) 100%)',
            }}
          />
          <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#3a2c1d]/35 z-20 pointer-events-none" />

          {/* Animated Spread Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpread}
              initial={{ opacity: 0, rotateY: currentSpread === 0 ? 0 : 3, scale: 0.99 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -3, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full min-h-[560px] sm:min-h-[640px] md:min-h-[680px] grid grid-cols-1 lg:grid-cols-2 z-15"
            >
              {/* ================= SPREAD 0: COVER & MANIFESTO ================= */}
              {currentSpread === 0 && (
                <>
                  {/* Left Page: Manifesto */}
                  <div
                    onClick={() => handlePageClick('left')}
                    className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#645039]/25 cursor-default bg-[#f8f2e5]/90"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#3b2d1e]/30 text-[0.6rem] font-mono text-[#5f4e3b] uppercase tracking-[0.2em]">
                      <span>SI YING EDITORIAL ARCHIVE</span>
                      <span>INSIDE COVER · DOSSIER</span>
                      <span>PAGE 00</span>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                      <div className="px-2 py-0.5 border border-[#8a382b] text-[#8a382b] font-mono text-[0.62rem] tracking-[0.16em] uppercase font-bold bg-[#faf3e7]/80 -rotate-2">
                        [ BÀN BIÊN TẬP SỐ 03 · TÒA SOẠN CỔ THỤ ]
                      </div>
                      <span className="text-xl opacity-80">🦇</span>
                    </div>

                    <div className="space-y-4 my-auto">
                      <h2
                        className="text-xl sm:text-2xl font-light tracking-[0.14em] text-[#1c150e] uppercase"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Bản Tuyên Ngôn Từ Bàn Biên Tập
                      </h2>

                      <div className="w-12 h-[1px] bg-[#6d543c]" />

                      <p
                        className="text-sm sm:text-[0.92rem] text-[#34271a] leading-relaxed italic"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        &ldquo;Chào mừng đến với Tòa Soạn Cổ Thụ. Nơi này không sử dụng những tấm thẻ nhân vật thông thường. Từng câu chuyện, từng số phận sẽ được khắc họa như một trang đặc san độc bản, mang hơi thở của giấy in cổ điển, vết mực rỉ và các bản thảo chưa từng được công bố.&rdquo;
                      </p>

                      <div className="p-3.5 rounded-[3px] border-l-2 border-[#1c150e] bg-[#eee4cf]/70 font-mono text-xs text-[#22180f]">
                        <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#735c43] mb-1 font-semibold">
                          — LỜI BÌNH CỦA CHỦ BÚT SI YING —
                        </span>
                        <span className="text-sm sm:text-base font-bold font-serif italic text-[#17100a]">
                          &ldquo;tao - là bố chúng mày&rdquo;
                        </span>
                      </div>

                      <div className="pt-2 grid grid-cols-2 gap-2 text-[0.65rem] font-mono text-[#5b4a37]">
                        <div className="border border-dashed border-[#8c7457]/50 p-2">
                          <span className="block text-[#8c6742] uppercase text-[0.58rem]">ĐỊNH DẠNG:</span>
                          <span className="font-semibold">Đặc San Độc Bản (10 Nhân Vật)</span>
                        </div>
                        <div className="border border-dashed border-[#8c7457]/50 p-2">
                          <span className="block text-[#8c6742] uppercase text-[0.58rem]">TÌNH TRẠNG:</span>
                          <span className="font-semibold text-[#8a382b]">Đã Hoàn Tất Phát Hành</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#3b2d1e]/25 flex items-center justify-between text-[0.6rem] font-mono text-[#74614a]">
                      <span>CHỦ BÚT: SI YING</span>
                      <span className="italic font-serif">folio 00 · ấn bản silvestre</span>
                    </div>
                  </div>

                  {/* Right Page: Cover */}
                  <div
                    onClick={() => handlePageClick('right')}
                    className="group/right relative p-6 sm:p-8 md:p-10 flex flex-col justify-between cursor-pointer bg-[#faf4e8]/95 hover:bg-[#fff9ee] transition-colors"
                  >
                    <div className="flex items-center justify-between pb-2 border-b-2 border-double border-[#3b2d1e]/40 text-[0.6rem] font-mono text-[#4b3c2c] uppercase tracking-[0.2em]">
                      <span>THE SILVESTRE CHRONICLE</span>
                      <span className="font-bold">ISSUE NO. 010 · SPECIAL EDITION</span>
                      <span>PAGE 01</span>
                    </div>

                    <div className="my-auto flex flex-col items-center text-center px-2">
                      <span className="text-[0.64rem] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#863728] font-bold mb-2">
                        ❖ TẬP LƯU TRỮ VĂN HỌC ĐẶC BIỆT ❖
                      </span>

                      <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-[#1c140d] uppercase"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        SI YING
                      </h2>

                      <span
                        className="text-xs sm:text-sm tracking-[0.24em] uppercase text-[#614e3b] mt-1 mb-5"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        ARCHIVE OF UNPUBLISHED STORIES
                      </span>

                      <div className="w-full max-w-sm aspect-[4/3] rounded-[4px] border-2 border-dashed border-[#614e3b]/50 p-3 bg-[#f2e9d7]/70 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="relative z-10 px-3 py-1.5 border border-[#863728] bg-[#faf3e6]/95 rotate-[-2deg] shadow-xs">
                          <span className="block font-mono text-[0.62rem] sm:text-xs font-bold text-[#863728] uppercase tracking-[0.16em]">
                            [ 10 NHÂN VẬT ĐẶC SAN CHÍNH THỨC ]
                          </span>
                        </div>
                        <p
                          className="relative z-10 text-xs sm:text-[0.82rem] text-[#4d3d2c] italic mt-3 max-w-[260px] leading-relaxed"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          Bao gồm Lê Trung Đức, Phó Kính, Yến Tri Hành, Phan Nhựt Minh, Vũ Khải Minh, Ueda Shinya, Dmitri, Chartreuse, Rye và Vindoro.
                        </p>
                        <span className="relative z-10 text-[0.6rem] font-mono text-[#8c7457] mt-2">
                          ARCHIVE COLLECTION · 10 CHARACTERS
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-xs font-mono text-[#8a382b] tracking-wider animate-pulse">
                        <span>LẬT XEM CÁC TRANG NHÂN VẬT</span>
                        <span>⟶</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#3b2d1e]/30 flex items-center justify-between text-[0.6rem] font-mono text-[#74614a]">
                      <span>ĐÃ XUẤT BẢN · 2024</span>
                      <span className="font-semibold">— P. 01 —</span>
                    </div>
                  </div>
                </>
              )}

              {/* ================= SPREAD 1: CHARACTERS 1 & 2 (Lê Trung Đức & Phó Kính) ================= */}
              {currentSpread === 1 && (
                <>
                  {renderCharacterPage(siYingCharacters[0], '— P. 02 —', 'left')}
                  {renderCharacterPage(siYingCharacters[1], '— P. 03 —', 'right')}
                </>
              )}

              {/* ================= SPREAD 2: CHARACTERS 3 & 4 (Yến Tri Hành & Phan Nhựt Minh) ================= */}
              {currentSpread === 2 && (
                <>
                  {renderCharacterPage(siYingCharacters[2], '— P. 04 —', 'left')}
                  {renderCharacterPage(siYingCharacters[3], '— P. 05 —', 'right')}
                </>
              )}

              {/* ================= SPREAD 3: CHARACTERS 5 & 6 (Vũ Khải Minh & Ueda Shinya) ================= */}
              {currentSpread === 3 && (
                <>
                  {renderCharacterPage(siYingCharacters[4], '— P. 06 —', 'left')}
                  {renderCharacterPage(siYingCharacters[5], '— P. 07 —', 'right')}
                </>
              )}

              {/* ================= SPREAD 4: CHARACTERS 7 & 8 (Dmitri Vsevolod & Chartreuse Lopez) ================= */}
              {currentSpread === 4 && (
                <>
                  {renderCharacterPage(siYingCharacters[6], '— P. 08 —', 'left')}
                  {renderCharacterPage(siYingCharacters[7], '— P. 09 —', 'right')}
                </>
              )}

              {/* ================= SPREAD 5: CHARACTERS 9 & 10 (Rye Sinclair & Vindoro Vannetti) ================= */}
              {currentSpread === 5 && (
                <>
                  {renderCharacterPage(siYingCharacters[8], '— P. 10 —', 'left')}
                  {renderCharacterPage(siYingCharacters[9], '— P. 11 —', 'right')}
                </>
              )}

              {/* ================= SPREAD 6: COLOPHON & BACK COVER ================= */}
              {currentSpread === 6 && (
                <>
                  {/* Left Page: Summary & Roadmap */}
                  <div
                    onClick={() => handlePageClick('left')}
                    className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#645039]/25 bg-[#faf4e7]/95"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#3b2d1e]/30 text-[0.6rem] font-mono text-[#5f4e3b] uppercase tracking-[0.2em]">
                      <span>EDITORIAL BOARD SUMMARY</span>
                      <span>DESK REGISTER</span>
                      <span className="font-semibold">— P. 12 —</span>
                    </div>

                    <div className="space-y-4 my-auto">
                      <span className="text-[0.62rem] font-mono uppercase tracking-[0.2em] text-[#8a382b] font-bold block">
                        ❖ TỔNG KẾT ẤN PHẢN TÒA SOẠN
                      </span>

                      <h2
                        className="text-xl sm:text-2xl font-light text-[#1c140c] tracking-[0.14em] uppercase"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Mười Trang Bản Thảo Hoàn Tất
                      </h2>

                      <div className="space-y-2 text-xs font-mono text-[#3a2c1f]">
                        <div className="p-2.5 border border-[#8c7457]/45 bg-[#f4ebdc]">
                          <span className="font-bold text-[#8a382b] block text-[0.64rem] uppercase">
                            ✓ HOÀN THÀNH 10 HỒ SƠ NHÂN VẬT
                          </span>
                          <span className="text-[0.68rem] text-[#54412e]">
                            Từ Lê Trung Đức cho đến trùm mafia Vindoro Vannetti đều đã được đóng thành tập đặc san hoàn chỉnh.
                          </span>
                        </div>
                      </div>

                      <p
                        className="text-xs italic text-[#5f4c39]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        Cảm ơn độc giả đã đồng hành cùng Tòa Soạn Cổ Thụ của Si Ying.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#3b2d1e]/30 flex items-center justify-between text-[0.6rem] font-mono text-[#74614a]">
                      <span>TỔNG KẾT ẤN PHẢN</span>
                      <span>— P. 12 —</span>
                    </div>
                  </div>

                  {/* Right Page: Back Cover & Colophon Seal */}
                  <div
                    onClick={() => onGoToSpread(0)}
                    className="group/right relative p-6 sm:p-8 md:p-10 flex flex-col justify-between cursor-pointer bg-[#faf4e7]/95 hover:bg-[#fff9ee] transition-colors"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#3b2d1e]/30 text-[0.6rem] font-mono text-[#5f4e3b] uppercase tracking-[0.2em]">
                      <span>COLOPHON & IMPRINT</span>
                      <span>INSIDE BACK COVER</span>
                      <span className="font-semibold">— P. 13 —</span>
                    </div>

                    <div className="my-auto flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#8a382b] flex items-center justify-center text-2xl mb-4 bg-[#fbf5ea]">
                        🦇
                      </div>

                      <span
                        className="text-lg sm:text-xl font-light tracking-[0.2em] text-[#1c140d] uppercase"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        SI YING
                      </span>

                      <span className="text-xs font-mono text-[#705a43] uppercase tracking-[0.18em] mt-1 mb-4">
                        THE SILVESTRE PRESS · IMPRINT
                      </span>

                      <div className="max-w-xs p-3 border border-[#8c7457]/50 bg-[#efe4ce]/70 text-[0.7rem] font-mono text-[#423222] leading-relaxed">
                        Ấn phẩm đặc san độc bản gồm 10 nhân vật được lưu trữ vĩnh viễn trong thư viện của Si Ying.
                      </div>

                      <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#241a12] text-[#f8ecda] text-xs font-mono tracking-wider group-hover/right:bg-[#382a1d] transition-colors">
                        <span>↺</span>
                        <span>QUAY LẠI TRANG BÌA (COVER)</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#3b2d1e]/30 flex items-center justify-between text-[0.6rem] font-mono text-[#74614a]">
                      <span>KẾT THÚC ĐẶC SAN</span>
                      <span>— P. 13 —</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
