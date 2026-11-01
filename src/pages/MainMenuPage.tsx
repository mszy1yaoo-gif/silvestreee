import React from 'react';
import { motion } from 'motion/react';
import { CREATORS, CreatorEntry } from '../data/creators';
import { useNavigation } from '../context/NavigationContext';
import { MoSuongCreatorCard } from '../components/creators/MoSuongCreatorCard';
import { SiYingCreatorCard } from '../components/creators/SiYingCreatorCard';
import { MongDuVeMayCreatorCard } from '../components/creators/MongDuVeMayCreatorCard';
import { NoiTrienDongCreatorCard } from '../components/creators/NoiTrienDongCreatorCard';

export const MainMenuPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden py-8 sm:py-10 px-4 sm:px-6 md:px-12 z-20 flex flex-col items-center">
      {/* 1. Header Navigation Mark: SILVESTRE · the central clearing */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl flex items-center justify-between pb-6 sm:pb-8 border-b border-[#706450]/15"
      >
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="group inline-flex items-center gap-2 text-xs sm:text-sm text-[#4a3f31]/80 hover:text-[#2d2417] tracking-[0.16em] lowercase transition-colors cursor-pointer focus:outline-none"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span className="text-sm transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
            ⟵
          </span>
          <span className="italic">khu rừng ngoài kia</span>
        </button>

        <div className="text-center">
          <span
            className="text-base sm:text-lg uppercase tracking-[0.28em] text-[#3e3427] font-light"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SILVESTRE
          </span>
          <span
            className="block text-[0.72rem] sm:text-xs italic text-[#746654] tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            the central clearing
          </span>
        </div>

        <a
          href="https://discord.gg/silvestre"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm italic text-[#4a3f31]/80 hover:text-[#2d2417] tracking-[0.14em] transition-colors focus:outline-none"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          our discord
        </a>
      </motion.header>

      {/* 2. Main Announcement Board (Shared by all 5 creators) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-label="SILVESTRE Notice Board"
        className="w-full max-w-3xl mt-8 sm:mt-10 relative"
      >
        {/* Vintage fairy-tale wooden & parchment notice board */}
        <div
          className="relative rounded-[20px] p-6 sm:p-9 md:p-11 text-[#2d251a] shadow-[0_16px_48px_rgba(65,52,36,0.16),0_2px_10px_rgba(255,255,255,0.7)_inset]"
          style={{
            background:
              'linear-gradient(145deg, rgba(255, 253, 248, 0.94) 0%, rgba(252, 246, 235, 0.9) 100%)',
            border: '1px solid rgba(198, 178, 148, 0.55)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Antique Botanical Corner Inking */}
          <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none opacity-40 border-t-2 border-l-2 border-[#827158] rounded-tl-sm" />
          <div className="absolute top-3 right-3 w-8 h-8 pointer-events-none opacity-40 border-t-2 border-r-2 border-[#827158] rounded-tr-sm" />
          <div className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none opacity-40 border-b-2 border-l-2 border-[#827158] rounded-bl-sm" />
          <div className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none opacity-40 border-b-2 border-r-2 border-[#827158] rounded-br-sm" />

          {/* Wooden Notice Board Pin / Crest at Top */}
          <div className="flex justify-center -mt-8 sm:-mt-11 mb-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#f6eee0] border border-[#a89578] shadow-[0_3px_10px_rgba(80,65,45,0.22)] flex items-center justify-center text-[#6e5d48] text-sm sm:text-base">
              ❦
            </div>
          </div>

          {/* Board Title Header */}
          <div className="text-center">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.24em] font-normal text-[#2b2216]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SILVESTRE
            </h1>
            <p
              className="mt-1 text-xs sm:text-sm italic tracking-[0.16em] text-[#705e46]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              *notice board*
            </p>
            <p
              className="text-[0.72rem] sm:text-xs text-[#8c7b64] tracking-[0.1em] mt-0.5"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              bảng tin chung của năm nhà sáng tạo
            </p>
          </div>

          {/* Delicate Botanical Divider Line */}
          <div className="my-5 sm:my-6 flex items-center justify-center gap-3 opacity-60">
            <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#8b7960]" />
            <span className="text-xs text-[#8b7960]">𖥸</span>
            <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#8b7960]" />
          </div>

          {/* SHARED ANNOUNCEMENT: Friendly handwritten note pinned onto the board */}
          <div
            className="relative rounded-[14px] p-5 sm:p-7 border border-[#e5d9c7] text-center shadow-[0_6px_22px_rgba(70,55,38,0.08)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 252, 0.95) 0%, rgba(254, 250, 242, 0.92) 100%)',
            }}
          >
            {/* Cute Little Wooden / Brass Pushpin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-[#f4d493] border-2 border-[#fffdf8] shadow-[0_2px_8px_rgba(90,65,35,0.25)] flex items-center justify-center text-xs">
                📌
              </div>
            </div>

            {/* Exact Announcement Text */}
            <p
              className="text-lg sm:text-xl md:text-[1.32rem] text-[#342718] leading-relaxed pt-1"
              style={{
                fontFamily: 'var(--font-handwritten)',
              }}
            >
              &ldquo;chào mừng đến với web tổng hợp của các bé đến từ SILVESTRE (｡・//ε//・｡)&rdquo;
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#907c65] italic tracking-[0.06em]" style={{ fontFamily: 'var(--font-serif)' }}>
              <span>❀</span>
              <span>— lời chào ấm áp từ năm vùng lãnh địa —</span>
              <span>❀</span>
            </div>
          </div>

          {/* SECONDARY NOTICE: Small handwritten notice pinned for creator Tiff */}
          <div className="mt-4 sm:mt-5 flex justify-center">
            <div
              className="relative max-w-lg w-full px-4 sm:px-6 py-3 sm:py-3.5 rounded-[10px] border border-[#d9ccb8] shadow-[0_3px_12px_rgba(70,55,38,0.06)] text-center rotate-[-0.8deg] transition-transform duration-300 hover:rotate-0"
              style={{
                background:
                  'linear-gradient(140deg, rgba(255, 253, 246, 0.96) 0%, rgba(250, 245, 234, 0.94) 100%)',
              }}
            >
              {/* Small paperclip pinned at top */}
              <div className="absolute -top-2.5 left-5 sm:left-6 flex items-center pointer-events-none text-xs">
                <span className="inline-block transform rotate-12">📎</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[0.66rem] font-mono text-[#8a755d] uppercase tracking-wider mb-1">
                <span>🦌</span>
                <span>lời nhắn từ tiff bé xíu</span>
                <span>🦌</span>
              </div>

              <p
                className="text-xs sm:text-[0.88rem] text-[#52412e] leading-relaxed italic"
                style={{
                  fontFamily: 'var(--font-serif)',
                }}
              >
                &ldquo;creator tiff bé xíu hiện đang off một thời gian nên chưa update được trên web, mọi người ráng chờ nhé.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Creator Directory Section */}
      <section className="w-full max-w-[1400px] mt-12 sm:mt-16 flex flex-col items-center">
        {/* Section Heading: choose your path */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#7d6c57]/60" />
            <h2
              className="text-xl sm:text-2xl md:text-3xl italic font-normal text-[#2d2417] tracking-[0.14em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              choose your path
            </h2>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#7d6c57]/60" />
          </div>
          <p
            className="mt-1 text-xs sm:text-sm text-[#73634e] italic tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            năm con đường rẽ sâu vào các vùng lãnh địa
          </p>
        </motion.div>

        {/* Creator Entries: Distinct Worlds Branching from the Central Clearing */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {/* 1. Mộ Sương Chi Ức Dao (Naomi): Botanical Dream Journal */}
          <div className="flex">
            <MoSuongCreatorCard
              creator={CREATORS[0]}
              onSelect={() => navigateTo('creator-territory', { creatorId: CREATORS[0].id })}
            />
          </div>

          {/* 2. Mộng Du Vẽ Mây (Jun): Poet's Private Watercolor Garden */}
          <div className="flex">
            <MongDuVeMayCreatorCard
              creator={CREATORS[1]}
              onSelect={() => navigateTo('creator-territory', { creatorId: CREATORS[1].id })}
            />
          </div>

          {/* 3. Si Ying: Old Newspaper Office & Editorial Desk */}
          <div className="flex">
            <SiYingCreatorCard
              creator={CREATORS[2]}
              onSelect={() => navigateTo('creator-territory', { creatorId: CREATORS[2].id })}
            />
          </div>

          {/* 4. Nơi Triền Đông Đượm Yên. (Chấm): Forgotten Fairy-Tale Cemetery Plaque */}
          <div className="flex">
            <NoiTrienDongCreatorCard
              creator={CREATORS[3]}
              onSelect={() => navigateTo('creator-territory', { creatorId: CREATORS[3].id })}
            />
          </div>

          {/* 5. Tiff bé xíu: Storybook Path Card */}
          <div className="flex">
            <StandardCreatorCard
              creator={CREATORS[4]}
              index={4}
              onSelect={() => navigateTo('creator-territory', { creatorId: CREATORS[4].id })}
            />
          </div>
        </div>
      </section>

      {/* 4. Footer Note */}
      <footer className="mt-14 sm:mt-20 text-center pb-6">
        <p
          className="text-xs italic text-[#6a5b48]/75 tracking-[0.12em]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          SILVESTRE — thế giới nhỏ ẩn mình giữa những tán cây cổ thụ
        </p>
      </footer>
    </div>
  );
};

/**
 * Standard Creator Path Card for other creators awaiting their dedicated artwork
 */
interface StandardCreatorCardProps {
  creator: CreatorEntry;
  index: number;
  onSelect: () => void;
}

const StandardCreatorCard: React.FC<StandardCreatorCardProps> = ({ creator, index, onSelect }) => {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center justify-between p-5 sm:p-6 rounded-[22px] text-center cursor-pointer transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7a62] hover:-translate-y-1.5 w-full"
      style={{
        background:
          'linear-gradient(175deg, rgba(255, 254, 250, 0.94) 0%, rgba(251, 246, 238, 0.9) 100%)',
        border: '1.5px solid rgba(200, 182, 155, 0.55)',
        boxShadow: '0 8px 24px rgba(70, 56, 38, 0.08)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Top Arched Path Accent */}
      <div
        className="w-10 h-1 rounded-full mb-2 transition-all duration-300 group-hover:w-14"
        style={{ backgroundColor: creator.accentColor }}
      />

      {/* Mascot Illustrated Oval Plaque */}
      <div className="relative my-3">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,248,225,0.9)]"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(246, 238, 224, 0.85) 100%)',
            border: `1.5px solid ${creator.accentColor}`,
            boxShadow: '0 4px 14px rgba(60, 48, 32, 0.1)',
          }}
        >
          <span className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            {creator.mascot}
          </span>
        </div>
        <span
          className="block mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-[#867560]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {creator.mascotLabel}
        </span>
      </div>

      {/* Creator Name & Territory */}
      <div className="my-2 flex-grow flex flex-col justify-center">
        <h3
          className="text-base sm:text-[1.12rem] font-medium text-[#2d2417] leading-tight tracking-[0.04em] group-hover:text-[#18130b] transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {creator.name}
        </h3>
        <p
          className="mt-1 text-xs italic text-[#786650] tracking-[0.06em]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {creator.territoryName}
        </p>
      </div>

      {/* Path Description */}
      <p
        className="text-[0.72rem] text-[#887864] italic leading-snug tracking-[0.02em] line-clamp-2 my-2 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {creator.pathDescription}
      </p>

      {/* Enter Button Cue */}
      <div className="w-full pt-3 border-t border-[#8c7b64]/15 flex items-center justify-center gap-1.5 text-xs text-[#5a4c3a] tracking-[0.14em] lowercase group-hover:text-[#1e170f] transition-colors">
        <span style={{ fontFamily: 'var(--font-serif)' }}>bước vào</span>
        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">⟶</span>
      </div>
    </motion.button>
  );
};
