import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { CREATORS } from '../data/creators';

export const CreatorTerritoryPlaceholder: React.FC = () => {
  const { routeParams, navigateTo } = useNavigation();

  const creator = CREATORS.find((c) => c.id === routeParams.creatorId) || CREATORS[0];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 z-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full p-8 sm:p-10 rounded-[22px] relative"
        style={{
          background:
            'linear-gradient(160deg, rgba(255, 254, 250, 0.95) 0%, rgba(250, 244, 235, 0.92) 100%)',
          border: '1.5px solid rgba(198, 178, 148, 0.65)',
          boxShadow: '0 16px 48px rgba(65, 52, 36, 0.16)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Creator Artwork or Mascot */}
        {creator.mediaSrc ? (
          <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6 border border-[#d8c5aa] shadow-md relative">
            {creator.mediaSrc.endsWith('.mp4') ? (
              <video
                src={creator.mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={creator.mediaSrc}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/85 text-xs text-[#3a2e1f] backdrop-blur-sm border border-white/70">
              {creator.mascot} {creator.mascotLabel}
            </div>
          </div>
        ) : (
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, #f6ede0 100%)',
              border: `2px solid ${creator.accentColor}`,
            }}
          >
            <span className="text-3xl sm:text-4xl">{creator.mascot}</span>
          </div>
        )}

        {/* Territory & Creator Title */}
        <span
          className="text-xs uppercase tracking-[0.2em] text-[#86735c] block mb-1"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {creator.creatorTag || `${creator.mascotLabel} · lãnh địa`}
        </span>

        <h1
          className="text-2xl sm:text-3xl font-medium text-[#2b2216] tracking-[0.06em]"
          style={{
            fontFamily:
              creator.id === 'si-ying' || creator.id === 'noi-trien-dong-duom-yen'
                ? 'var(--font-display)'
                : 'var(--font-whimsical)',
            letterSpacing:
              creator.id === 'si-ying'
                ? '0.14em'
                : creator.id === 'noi-trien-dong-duom-yen'
                  ? '0.08em'
                  : '0.04em',
          }}
        >
          {creator.name}
        </h1>

        <p
          className="mt-1 text-sm sm:text-base italic text-[#725e46] tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {creator.territoryName}
        </p>

        {/* Divider */}
        <div className="my-5 flex items-center justify-center gap-2 opacity-60">
          <span className="w-12 h-[1px] bg-[#8a765e]" />
          <span className="text-xs text-[#8a765e]">
            {creator.id === 'si-ying' ? '❖' : creator.id === 'noi-trien-dong-duom-yen' ? '🥀' : '✦'}
          </span>
          <span className="w-12 h-[1px] bg-[#8a765e]" />
        </div>

        {/* Introduction or description */}
        {creator.introduction ? (
          <div className="p-4 rounded-[12px] bg-white/60 border border-[#e2d5c2] my-3">
            <p
              className="text-sm sm:text-base italic text-[#443322] leading-relaxed"
              style={{
                fontFamily:
                  creator.id === 'si-ying' || creator.id === 'noi-trien-dong-duom-yen'
                    ? 'var(--font-serif)'
                    : 'var(--font-handwritten)',
                fontSize:
                  creator.id === 'si-ying'
                    ? '1.05rem'
                    : creator.id === 'noi-trien-dong-duom-yen'
                      ? '1rem'
                      : '1.15rem',
                fontWeight: creator.id === 'si-ying' ? 600 : 400,
              }}
            >
              &ldquo;{creator.introduction}&rdquo;
            </p>
          </div>
        ) : (
          <p
            className="text-sm sm:text-base italic text-[#4e4031] leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            &ldquo;{creator.pathDescription}&rdquo;
          </p>
        )}

        <p
          className="mt-4 text-xs text-[#867560] italic tracking-[0.06em]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Lãnh địa này đang được các vị tác giả chăm chút dệt nên. Hãy quay lại sớm để bước vào thế giới riêng của {creator.name}.
        </p>

        {/* Return Button */}
        <button
          type="button"
          onClick={() => navigateTo('forest-map')}
          className="mt-8 inline-flex items-center justify-center px-6 py-2.5 rounded-[8px] bg-[#f5ede0] hover:bg-[#eae0cf] border border-[#a89578]/50 text-[#382d20] text-xs sm:text-sm lowercase tracking-[0.16em] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span>⟵ quay lại khoảng rừng trung tâm</span>
        </button>
      </motion.div>
    </div>
  );
};
