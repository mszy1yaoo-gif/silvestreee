import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { junSfwCharacters, junNsfwCharacters, JunCharacterEntry } from '../data/junCharacters';

function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

interface ClickBurst {
  id: number;
  x: number;
  y: number;
  accentColor: string;
}

export const JunTerritoryPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingCategory, setRatingCategory] = useState<'sfw' | 'nsfw'>('sfw');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedCharName, setExpandedCharName] = useState<string | null>(null);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  const [musicPlaying, setMusicPlaying] = useState(true);

  const activeCharacters = useMemo(() => {
    return ratingCategory === 'sfw' ? junSfwCharacters : junNsfwCharacters;
  }, [ratingCategory]);

  const filteredCharacters = useMemo(() => {
    const trimmedSearch = searchQuery.trim().toLowerCase();
    const normalizedSearch = normalizeVietnamese(searchQuery);

    return activeCharacters.filter((char) => {
      if (trimmedSearch !== '') {
        const lowerName = char.name.toLowerCase();
        const normalizedName = normalizeVietnamese(char.name);
        const lowerIntro = (char.intro || '').toLowerCase();
        const matchesName = lowerName.includes(trimmedSearch) || normalizedName.includes(normalizedSearch);
        const matchesIntro = lowerIntro.includes(trimmedSearch);
        if (!matchesName && !matchesIntro) return false;
      }

      if (selectedTags.length > 0) {
        const charLowerTags = (char.tags || []).map((t) => t.trim().toLowerCase());
        const hasAllSelected = selectedTags.every((sel) => charLowerTags.includes(sel));
        if (!hasAllSelected) return false;
      }

      return true;
    });
  }, [activeCharacters, searchQuery, selectedTags]);

  const handleToggleTag = useCallback((rawTag: string) => {
    const tag = rawTag.trim().toLowerCase();
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const handleTriggerBurst = useCallback((e: React.MouseEvent, accentColor: string) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setClickBursts((prev) => [...prev.slice(-4), { id, x, y, accentColor }]);
    window.setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== id));
    }, 480);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto">
      {/* 1. Full-Screen Background Image Asset (image_66c00d29.png) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/aistudio/image_66c00d29.png"
          alt="Mộng Du Vẽ Mây — Watercolour Poetry Garden"
          className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.02]"
        />
        {/* Soft Lavender & Warm Ivory Lighting Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(254, 252, 255, 0.35) 0%, rgba(238, 226, 250, 0.28) 55%, rgba(220, 205, 242, 0.4) 100%)',
          }}
        />

        {/* Floating Pastel Petals & Soft Fireflies */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${(i * 10 + 5) % 92}vw`,
                y: `${(i * 12 + 8) % 88}vh`,
                opacity: 0.25,
                scale: 0.7,
              }}
              animate={{
                y: [
                  `${(i * 12 + 8) % 88}vh`,
                  `${((i * 12 + 8) % 88) - 18}vh`,
                  `${(i * 12 + 8) % 88}vh`,
                ],
                x: [
                  `${(i * 10 + 5) % 92}vw`,
                  `${((i * 10 + 5) % 92) + 5}vw`,
                  `${(i * 10 + 5) % 92}vw`,
                ],
                opacity: [0.25, 0.8, 0.25],
                scale: [0.7, 1.15, 0.7],
              }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.35,
              }}
              className="absolute w-2 h-2 rounded-full bg-[#f3d9f8]"
              style={{
                boxShadow: '0 0 10px rgba(243, 217, 248, 0.9)',
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Page Content Layer */}
      <div className="relative z-10 w-full min-h-screen py-8 sm:py-10 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-between">
        {/* Header Navigation */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl flex items-center justify-between pb-6 border-b border-[#a48abf]/30"
        >
          <button
            type="button"
            onClick={() => navigateTo('forest-map')}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm text-[#423152] hover:text-[#21152d] tracking-[0.16em] lowercase transition-colors cursor-pointer focus:outline-none"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <span className="text-sm transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
              ⟵
            </span>
            <span className="italic">khoảng rừng trung tâm</span>
          </button>

          <div className="text-center">
            <span
              className="text-base sm:text-lg uppercase tracking-[0.24em] text-[#362646] font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SILVESTRE
            </span>
            <span
              className="block text-[0.72rem] sm:text-xs italic text-[#705b82] tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              vườn mộng mơ · jun
            </span>
          </div>

          {/* Hidden YouTube Background Audio Player for Jun (loops continuously) */}
          {musicPlaying && (
            <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
              <iframe
                src="https://www.youtube.com/embed/d_HlPboLRL8?autoplay=1&loop=1&playlist=d_HlPboLRL8"
                allow="autoplay"
                title="Jun Background Music"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMusicPlaying((prev) => !prev)}
              title={musicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer font-mono text-xs ${
                musicPlaying
                  ? 'border-[#a48abf] bg-[#f2e6fa] text-[#422c59] shadow-xs'
                  : 'border-[#a48abf]/40 bg-[#faf4ff]/70 text-[#7a6b8a] hover:text-[#422c59]'
              }`}
            >
              <span className={musicPlaying ? 'animate-pulse text-purple-600' : ''}>♪</span>
              <span className="hidden xs:inline text-[0.66rem] tracking-wider">
                {musicPlaying ? 'nhạc: bật' : 'nhạc: tắt'}
              </span>
            </button>

            <a
              href="https://discord.gg/silvestre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm italic text-[#423152] hover:text-[#21152d] tracking-[0.14em] transition-colors focus:outline-none"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              our discord
            </a>
          </div>
        </motion.header>

        {/* Main Jun Territory Archive */}
        <main className="w-full my-auto py-10 sm:py-14 flex flex-col items-center justify-center">
          <section
            ref={sectionRef}
            className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-14 select-none overflow-hidden"
            style={{
              borderRadius: '38px 32px 40px 34px / 34px 38px 32px 40px',
              background:
                'linear-gradient(165deg, rgba(254, 250, 255, 0.88) 0%, rgba(246, 236, 252, 0.82) 48%, rgba(238, 228, 248, 0.86) 100%)',
              border: '1.5px solid rgba(186, 162, 215, 0.65)',
              boxShadow:
                '0 20px 55px rgba(62, 45, 82, 0.12), 0 0 40px rgba(238, 220, 255, 0.6) inset',
              backdropFilter: 'blur(14px)',
            }}
          >
            {/* Header / Title Area with Signature Watercolor Butterfly & Poetry Garden Details */}
            <div className="relative z-20 text-center mb-8 sm:mb-10 px-2">
              {/* Slowly Fluttering Tiny Watercolor Butterfly near heading */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  x: [-2, 2, -2],
                  rotate: [-4, 4, -4],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 left-1/2 -translate-x-20 text-sm select-none pointer-events-none opacity-85"
                aria-hidden="true"
              >
                🦋
              </motion.div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/75 border border-[#d2bfe8]/70 mb-3 shadow-2xs">
                <span className="text-xs text-[#8c6ca8]">🐑</span>
                <span
                  className="text-[0.7rem] lowercase tracking-[0.22em] text-[#63497a]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  vườn thơ & mộng mị
                </span>
                <span className="text-xs text-[#8c6ca8]">🌸</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl text-[#2d1e3d] font-normal lowercase tracking-[0.12em]"
                style={{ fontFamily: 'var(--font-whimsical)' }}
              >
                MỘNG DU VẼ MÂY
              </h2>

              <p
                className="mt-2 text-sm sm:text-base text-[#5c4470] italic tracking-[0.04em] leading-relaxed max-w-xl mx-auto"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                &ldquo;Tưới hoa bằng mộng, nuôi tâm hồn bằng thơ.<br />
                Let every word become a flower.&rdquo;
              </p>

              {/* Botanical Pressed Flower & Floral Divider */}
              <div className="mt-4 flex items-center justify-center gap-2.5 opacity-80">
                <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b592d4] to-[#9273b0]" />
                <span className="text-xs text-[#9273b0]">❀</span>
                <span className="text-[0.7rem] text-[#b592d4]">✦</span>
                <span className="text-xs text-[#9273b0]">❀</span>
                <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#b592d4] to-[#9273b0]" />
              </div>
            </div>

            {/* Search Bar & SFW / NSFW Tabs */}
            <div className="relative z-20 max-w-xl mx-auto mb-9 sm:mb-11 px-1 sm:px-4 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div
                  className="relative flex items-center px-4 py-2.5 transition-all duration-300"
                  style={{
                    borderRadius: '22px 18px 24px 19px / 19px 23px 18px 22px',
                    background:
                      'linear-gradient(145deg, rgba(255, 253, 255, 0.95) 0%, rgba(248, 240, 252, 0.92) 100%)',
                    border: '1.5px solid rgba(186, 162, 215, 0.72)',
                    boxShadow:
                      '0 6px 20px rgba(62, 45, 82, 0.07), 3px 3px 0px rgba(225, 210, 245, 0.5), 0 0 14px rgba(240, 225, 255, 0.7) inset',
                  }}
                >
                  <span className="text-sm mr-2.5 select-none opacity-80" aria-hidden="true">
                    🌸
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="tìm một người trong rừng..."
                    aria-label="tìm một người trong rừng..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#352244] placeholder:text-[#8a729e] placeholder:italic focus:outline-none tracking-[0.04em]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#705585] hover:text-[#2d1e3d] ml-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* SFW / NSFW Rating Tabs with Tiny Flowers */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setRatingCategory('sfw')}
                  className={`px-5 py-1.5 rounded-full text-xs sm:text-sm tracking-[0.1em] lowercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    ratingCategory === 'sfw'
                      ? 'bg-[#e5d4f5] text-[#322042] font-semibold border border-[#b895d8] shadow-sm'
                      : 'bg-white/60 text-[#6e5582] hover:bg-white/90 border border-[#d6c4eb]'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  <span>🌸</span>
                  <span>✦ SFW ({junSfwCharacters.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRatingCategory('nsfw')}
                  className={`px-5 py-1.5 rounded-full text-xs sm:text-sm tracking-[0.1em] lowercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    ratingCategory === 'nsfw'
                      ? 'bg-[#edd2df] text-[#422030] font-semibold border border-[#d496b2] shadow-sm'
                      : 'bg-white/60 text-[#82556b] hover:bg-white/90 border border-[#ebd0de]'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  <span>🥀</span>
                  <span>⚠️ NSFW ({junNsfwCharacters.length})</span>
                </button>
              </div>

              {selectedTags.length > 0 && (
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-[#63497a] italic">đang lọc tag: {selectedTags.join(', ')}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className="px-2 py-0.5 rounded-full bg-[#f8e3ec] border border-[#d495b0] text-[#8a445d] cursor-pointer"
                  >
                    xóa lọc ✕
                  </button>
                </div>
              )}
            </div>

            {/* Character Index / Collection of Story Entries */}
            {filteredCharacters.length > 0 ? (
              <div className="relative z-20 space-y-3">
                {filteredCharacters.map((char, index) => {
                  const isExpanded = expandedCharName === char.name;

                  return (
                    <JunStorybookCard
                      key={char.name}
                      char={char}
                      index={index}
                      isExpanded={isExpanded}
                      onToggleExpand={() => setExpandedCharName(isExpanded ? null : char.name)}
                      selectedTags={selectedTags}
                      onToggleTag={handleToggleTag}
                      onTriggerBurst={handleTriggerBurst}
                    />
                  );
                })}
              </div>
            ) : (
              /* Required Exact Empty State */
              <div className="relative z-20 py-16 text-center">
                <p
                  className="text-base sm:text-lg text-[#5c4470] italic tracking-[0.04em]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  &ldquo;em naomi lười quá, chưa chịu đẻ nữa (ง ื▿ ื)ว&rdquo;
                </p>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full max-w-4xl pt-6 text-center">
          <p
            className="text-xs italic text-[#5c4470]/80 tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Mộng Du Vẽ Mây — khu vườn thơ ca và những giấc mộng êm đềm
          </p>
        </footer>
      </div>
    </div>
  );
};

interface JunStorybookCardProps {
  char: JunCharacterEntry;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onTriggerBurst: (e: React.MouseEvent, color: string) => void;
}

const JunStorybookCard: React.FC<JunStorybookCardProps> = ({
  char,
  index,
  isExpanded,
  onToggleExpand,
  selectedTags,
  onToggleTag,
  onTriggerBurst,
}) => {
  const hasFullPlot = Boolean(char.fullPlotUrl && char.fullPlotUrl.trim() !== '');
  const hasGgai = Boolean(char.ggaiUrl && char.ggaiUrl.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-[18px] transition-all duration-300 overflow-hidden"
      style={{
        background: isExpanded
          ? 'linear-gradient(145deg, rgba(255, 253, 255, 0.98) 0%, rgba(248, 240, 252, 0.95) 100%)'
          : 'rgba(255, 253, 255, 0.78)',
        border: isExpanded
          ? '1.5px solid rgba(176, 142, 218, 0.9)'
          : '1px solid rgba(200, 180, 226, 0.55)',
        boxShadow: isExpanded
          ? '0 10px 28px rgba(62, 45, 82, 0.12), 0 0 20px rgba(212, 178, 245, 0.35) inset'
          : '0 4px 14px rgba(62, 45, 82, 0.05)',
      }}
    >
      {/* Collapsed Header / Row */}
      <div
        onClick={onToggleExpand}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-colors hover:bg-white/50"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-grow min-w-0 pr-3">
          <span className="text-xs text-[#a282c8] select-none flex-shrink-0">✦</span>
          
          {/* Full Character Name with Natural Text Wrapping & No Truncation */}
          <div className="flex-grow min-w-0">
            <h3
              className="text-base sm:text-[1.05rem] text-[#2d1e3d] font-normal tracking-[0.04em] leading-snug whitespace-normal overflow-visible"
              style={{
                fontFamily: 'var(--font-whimsical)',
                overflowWrap: 'anywhere',
              }}
            >
              {char.name}
            </h3>

            {/* Tags in Collapsed State */}
            {char.tags && char.tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap items-center gap-1 mt-1.5">
                {char.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTag(tag.trim().toLowerCase());
                    }}
                    className="px-2 py-0.5 rounded-full text-[0.68rem] lowercase text-[#63497a] bg-white/70 border border-[#d2bfe8]/60 cursor-pointer hover:bg-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {tag.trim().toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side: Expand Arrow */}
        <div className="flex items-center gap-2 flex-shrink-0 pl-2">
          <span
            className="text-xs text-[#8c6ca8] transition-transform duration-300 select-none p-1"
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            ❯
          </span>
        </div>
      </div>

      {/* Expanded Section (Summary & Buttons) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="px-5 pb-5 pt-1 border-t border-[#d2bfe8]/40"
          >
            {/* Mobile tags */}
            {char.tags && char.tags.length > 0 && (
              <div className="flex sm:hidden flex-wrap items-center gap-1 mb-3">
                {char.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTag(tag.trim().toLowerCase());
                    }}
                    className="px-2 py-0.5 rounded-full text-[0.68rem] lowercase text-[#63497a] bg-white/70 border border-[#d2bfe8]/60"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {tag.trim().toLowerCase()}
                  </span>
                ))}
              </div>
            )}

            {/* Full Character Summary */}
            <p
              className="text-sm text-[#5c4470] italic leading-relaxed mb-4 p-3 rounded-[12px] bg-white/60 border border-[#d2bfe8]/50 whitespace-normal overflow-visible"
              style={{
                fontFamily: 'var(--font-serif)',
                overflowWrap: 'anywhere',
              }}
            >
              {char.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {hasFullPlot && (
                <a
                  href={char.fullPlotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-[#523d66] lowercase tracking-[0.08em] flex items-center gap-1.5 bg-white border border-[#c4a8e2] shadow-2xs hover:bg-[#f6effc]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  <span className="text-[0.62rem] text-[#8c6ca8]">❀</span>
                  <span>full plot ↗</span>
                </a>
              )}

              {hasGgai && (
                <a
                  href={char.ggaiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-[#3b274a] lowercase tracking-[0.08em] flex items-center gap-1.5 bg-[#eadef9] border border-[#a882d8] shadow-2xs hover:bg-[#e4d4f8]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  <span className="text-[0.62rem] text-[#704f9e]">✦</span>
                  <span>find him ♡</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
