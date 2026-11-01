import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { naomiCharacters, CharacterEntry } from '../../../data/characterLibrary';
import { NaomiCharacterComments, CharacterComment } from './NaomiCharacterComments';

const LIKED_CHARS_STORAGE_KEY = 'rung_mong_liked_chars_v1';
const LIKE_COUNTS_STORAGE_KEY = 'rung_mong_like_counts_v1';
const COMMENTS_STORAGE_KEY = 'rung_mong_comments_v1';

function getInitialLikeCount(name: string): number {
  let hash = 0;
  const clean = name.trim().toLowerCase();
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) % 997;
  }
  return 16 + (hash % 23);
}

interface ClickBurst {
  id: number;
  x: number;
  y: number;
  accentColor: string;
}

interface CharacterBotanicalTheme {
  paletteName: string;
  cardBg: string;
  layeredPageBg: string;
  border: string;
  hoverBorder: string;
  innerBorder: string;
  glow: string;
  hoverGlow: string;
  vineColor: string;
  flowerColor: string;
  accentDot: string;
  tagBg: string;
  tagHoverBg: string;
  tagBorder: string;
  tagText: string;
  primaryBtnBg: string;
  primaryBtnHoverBg: string;
  primaryBtnBorder: string;
  secondaryBtnBg: string;
  secondaryBtnHoverBg: string;
  secondaryBtnBorder: string;
  organicRadius: string;
  motifType:
    | 'starlight-vine'
    | 'rose-thorn'
    | 'gilded-ivy'
    | 'frost-blossom'
    | 'meadow-daisy'
    | 'lavender-mist'
    | 'wildberry-fern';
}

function isR18Tag(tag: string): boolean {
  const cleaned = tag.trim().toLowerCase();
  return cleaned === 'r18' || cleaned === 'r-18' || cleaned === '18+';
}

function isCharacterNsfw(char: CharacterEntry): boolean {
  if (char.name && char.name.trim().toLowerCase().includes('kismet')) {
    return true;
  }
  if (!char.tags || char.tags.length === 0) return false;
  return char.tags.some((t) => isR18Tag(t));
}

function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

function getCharacterTheme(
  tags: string[] = [],
  name: string = '',
  type?: string,
  index: number = 0,
  isNsfwSection: boolean = false
): CharacterBotanicalTheme {
  const lowerTags = (tags || []).map((t) => t.toLowerCase());
  const lowerName = (name || '').toLowerCase();

  const radii = [
    '4px 6px 5px 7px / 6px 4px 7px 5px',
    '6px 4px 7px 5px / 5px 7px 4px 6px',
    '5px 7px 4px 6px / 7px 5px 6px 4px',
  ];
  const organicRadius = radii[index % radii.length];

  // If in NSFW section, apply darker, mysterious, wine/burgundy/plum dark romance aesthetic
  if (isNsfwSection) {
    return {
      paletteName: 'dark-wine-romance',
      cardBg:
        'linear-gradient(160deg, #2b1920 0%, #221419 52%, #190f13 100%)',
      layeredPageBg: 'rgba(56, 32, 40, 0.65)',
      border: 'rgba(126, 72, 86, 0.75)',
      hoverBorder: 'rgba(164, 94, 112, 0.95)',
      innerBorder: 'rgba(108, 60, 72, 0.55)',
      glow: 'rgba(142, 68, 88, 0.3)',
      hoverGlow: 'rgba(176, 82, 108, 0.5)',
      vineColor: '#b06b7a',
      flowerColor: '#e08ba0',
      accentDot: '#f0c29a',
      tagBg: 'rgba(42, 24, 30, 0.85)',
      tagHoverBg: 'rgba(56, 32, 40, 0.98)',
      tagBorder: 'rgba(122, 68, 82, 0.8)',
      tagText: '#f0c6d0',
      primaryBtnBg: 'linear-gradient(145deg, #522c36 0%, #3d1f27 100%)',
      primaryBtnHoverBg: 'linear-gradient(145deg, #663844 0%, #4a2530 100%)',
      primaryBtnBorder: 'rgba(152, 86, 104, 0.88)',
      secondaryBtnBg: 'linear-gradient(145deg, #361f26 0%, #28151b 100%)',
      secondaryBtnHoverBg: 'linear-gradient(145deg, #462832 0%, #321b22 100%)',
      secondaryBtnBorder: 'rgba(118, 66, 80, 0.8)',
      organicRadius,
      motifType: 'rose-thorn',
    };
  }

  // SFW section: bright, dreamy, warm pastel fairy-tale garden
  return {
    paletteName: 'pink-meadow-blossom',
    cardBg:
      'linear-gradient(160deg, #fef8f4 0%, #f7edf2 52%, #f1dedc 100%)',
    layeredPageBg: 'rgba(240, 212, 218, 0.6)',
    border: 'rgba(202, 154, 164, 0.75)',
    hoverBorder: 'rgba(186, 126, 138, 0.95)',
    innerBorder: 'rgba(214, 172, 182, 0.5)',
    glow: 'rgba(224, 162, 176, 0.25)',
    hoverGlow: 'rgba(210, 138, 154, 0.45)',
    vineColor: '#a86a78',
    flowerColor: '#f2b2c2',
    accentDot: '#ffe4a3',
    tagBg: 'rgba(255, 250, 248, 0.82)',
    tagHoverBg: 'rgba(255, 255, 255, 0.96)',
    tagBorder: 'rgba(212, 170, 178, 0.72)',
    tagText: '#6e3f4a',
    primaryBtnBg: 'linear-gradient(145deg, #fcedf1 0%, #e8cbd4 100%)',
    primaryBtnHoverBg: 'linear-gradient(145deg, #fff5f8 0%, #f0d6df 100%)',
    primaryBtnBorder: 'rgba(196, 142, 154, 0.85)',
    secondaryBtnBg: 'linear-gradient(145deg, #fffdfb 0%, #faedec 100%)',
    secondaryBtnHoverBg: 'linear-gradient(145deg, #ffffff 0%, #f4e0e4 100%)',
    secondaryBtnBorder: 'rgba(212, 168, 176, 0.75)',
    organicRadius,
    motifType: 'meadow-daisy',
  };
}

const CardCornerBotanical: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  vineColor: string;
  flowerColor: string;
  accentDot: string;
  motifType: CharacterBotanicalTheme['motifType'];
}> = ({ position, vineColor, flowerColor, accentDot, motifType }) => {
  const rotationMap = {
    'top-left': 'rotate(0deg)',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)',
  };

  return (
    <svg
      viewBox="0 0 68 68"
      className="w-12 h-12 sm:w-14 sm:h-14 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
      style={{ transform: rotationMap[position] }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 4 46 C 4 22, 18 6, 46 5"
        stroke={vineColor}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
      <path
        d="M 8 34 C 12 20, 22 12, 36 9"
        stroke={vineColor}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="2 2.5"
        strokeOpacity="0.48"
      />
      <circle cx="13" cy="10.2" r="2.6" fill={flowerColor} fillOpacity="0.8" />
      <circle cx="15.8" cy="12.4" r="2.6" fill={flowerColor} fillOpacity="0.8" />
      <circle cx="13" cy="13.2" r="1.8" fill={accentDot} />
      <circle cx="22" cy="21" r="1.1" fill={accentDot} fillOpacity="0.75" />
    </svg>
  );
};

const StorybookCharacterCard: React.FC<{
  char: CharacterEntry;
  index: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (charName: string) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  comments: CharacterComment[];
  onAddComment: (charName: string, nickname: string, commentText: string) => void;
  isReducedMotion: boolean;
  isTouchDevice: boolean;
  onTriggerBurst: (e: React.MouseEvent, accentColor: string) => void;
  isNsfwSection: boolean;
}> = ({
  char,
  index,
  isLiked,
  likeCount,
  onToggleLike,
  selectedTags,
  onToggleTag,
  comments,
  onAddComment,
  isReducedMotion,
  isTouchDevice,
  onTriggerBurst,
  isNsfwSection,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClickedGlow, setIsClickedGlow] = useState(false);
  const [heartBurstKey, setHeartBurstKey] = useState(0);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const isLongIntro = Boolean(char.intro && char.intro.length > 100);

  const theme = getCharacterTheme(char.tags, char.name, char.type, index, isNsfwSection);
  const hasFullPlot = Boolean(
    char.fullPlotUrl && char.fullPlotUrl.trim() !== '' && char.fullPlotUrl.trim() !== '.'
  );
  const hasGgai = Boolean(char.ggaiUrl && char.ggaiUrl.trim() !== '');
  const showFindHimButton = hasGgai || char.type === 'CHARACTER';
  const hasIntro = Boolean(char.intro && char.intro.trim() !== '');
  const hasMultipleLinks = Boolean(char.bgUrl && char.blUrl);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setParallax({
      x: normX * 5.5,
      y: normY * 5.5,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallax({ x: 0, y: 0 });
  };

  const handleCardOrButtonClick = (e: React.MouseEvent, accentColor: string) => {
    onTriggerBurst(e, accentColor);
    setIsClickedGlow(true);
    window.setTimeout(() => setIsClickedGlow(false), 450);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLiked) {
      setHeartBurstKey((prev) => prev + 1);
    }
    onToggleLike(char.name);
  };

  const archiveNum = String(index + 1).padStart(2, '0');
  const plateLabel =
    char.type === 'OPEN WORLD'
      ? 'CODEX MUNDI · OPEN WORLD'
      : char.type === 'NP'
        ? 'FOLIO PLURALIS · NP FILE'
        : isNsfwSection
          ? 'SECRET ARCHIVE · NOX'
          : 'CHARACTER FILE · HERBARIUM';

  return (
    <motion.article
      ref={cardRef}
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleCardOrButtonClick(e, theme.flowerColor)}
      className="group relative flex flex-col justify-between p-3.5 sm:p-6 transition-all duration-500 ease-out"
      style={{
        borderRadius: theme.organicRadius,
        background: theme.cardBg,
        border: `1.5px solid ${isHovered || isClickedGlow ? theme.hoverBorder : theme.border}`,
        boxShadow: isClickedGlow
          ? `0 16px 36px ${isNsfwSection ? 'rgba(0,0,0,0.45)' : 'rgba(54, 38, 22, 0.16)'}, 4px 5px 0px ${theme.layeredPageBg}, inset 0 0 26px ${theme.hoverGlow}`
          : isHovered
            ? `0 14px 32px ${isNsfwSection ? 'rgba(0,0,0,0.38)' : 'rgba(54, 38, 22, 0.14)'}, 4px 5px 0px ${theme.layeredPageBg}, inset 0 0 22px ${theme.hoverGlow}`
            : `0 8px 22px ${isNsfwSection ? 'rgba(0,0,0,0.28)' : 'rgba(54, 38, 22, 0.08)'}, 3px 4px 0px ${theme.layeredPageBg}, inset 0 0 18px ${theme.glow}`,
        transform: `translate3d(${parallax.x}px, ${parallax.y + (isHovered && !isReducedMotion ? -3 : 0)}px, 0)`,
      }}
    >
      {/* Parchment / Dark Velvet Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.28] mix-blend-multiply"
        style={{
          borderRadius: theme.organicRadius,
          backgroundImage:
            'radial-gradient(rgba(142, 114, 82, 0.16) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Inner Frame Double Manuscript Rule */}
      <div
        className="absolute inset-[6px] pointer-events-none transition-colors duration-500"
        style={{
          borderRadius: '3px',
          border: `1px solid ${theme.innerBorder}`,
        }}
      />
      <div
        className="absolute inset-[9px] pointer-events-none"
        style={{
          borderRadius: '2px',
          border: `0.6px dashed ${theme.innerBorder}`,
        }}
      />

      {/* 4 Botanical Corner Vines */}
      <div className="absolute top-1.5 left-1.5 pointer-events-none">
        <CardCornerBotanical
          position="top-left"
          vineColor={theme.vineColor}
          flowerColor={theme.flowerColor}
          accentDot={theme.accentDot}
          motifType={theme.motifType}
        />
      </div>
      <div className="absolute top-1.5 right-1.5 pointer-events-none">
        <CardCornerBotanical
          position="top-right"
          vineColor={theme.vineColor}
          flowerColor={theme.flowerColor}
          accentDot={theme.accentDot}
          motifType={theme.motifType}
        />
      </div>
      <div className="absolute bottom-1.5 left-1.5 pointer-events-none">
        <CardCornerBotanical
          position="bottom-left"
          vineColor={theme.vineColor}
          flowerColor={theme.flowerColor}
          accentDot={theme.accentDot}
          motifType={theme.motifType}
        />
      </div>
      <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
        <CardCornerBotanical
          position="bottom-right"
          vineColor={theme.vineColor}
          flowerColor={theme.flowerColor}
          accentDot={theme.accentDot}
          motifType={theme.motifType}
        />
      </div>

      {/* Metadata Bar + Like Plaque */}
      <div
        className="relative z-20 flex items-center justify-between gap-2 pb-2 mb-1"
        style={{
          borderBottom: `1px dashed ${isNsfwSection ? 'rgba(126, 72, 86, 0.5)' : 'rgba(214, 172, 182, 0.65)'}`,
        }}
      >
        <div className="flex flex-col text-left">
          <span
            className="text-[0.56rem] uppercase tracking-[0.2em] font-medium"
            style={{
              fontFamily: 'var(--font-serif)',
              color: isNsfwSection ? '#c78292' : '#8c525f',
            }}
          >
            ARCHIVE NO. RM-{archiveNum}
          </span>
          <span
            className="text-[0.52rem] uppercase tracking-[0.16em]"
            style={{
              fontFamily: 'var(--font-serif)',
              color: isNsfwSection ? '#a66878' : '#a8727e',
            }}
          >
            {plateLabel}
          </span>
        </div>

        <motion.button
          type="button"
          onClick={handleLikeClick}
          whileTap={{ scale: 0.92 }}
          animate={isLiked ? { scale: [1, 1.16, 0.96, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          aria-label={isLiked ? `Bỏ thích ${char.name}` : `Thích ${char.name}`}
          title={isLiked ? `♥ ${likeCount}` : `♡ ${likeCount}`}
          className="relative px-2.5 py-1 inline-flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 focus:outline-none"
          style={{
            fontFamily: 'var(--font-serif)',
            borderRadius: '2px',
            background: isLiked
              ? isNsfwSection
                ? 'linear-gradient(145deg, #592532 0%, #3f1821 100%)'
                : 'linear-gradient(145deg, #f8dce2 0%, #edc2cc 100%)'
              : isNsfwSection
                ? 'linear-gradient(145deg, #321b22 0%, #241116 100%)'
                : 'linear-gradient(145deg, #fef5f0 0%, #f0d6dc 100%)',
            border: isLiked
              ? '1px solid rgba(206, 114, 132, 0.85)'
              : isNsfwSection
                ? '1px solid rgba(126, 72, 86, 0.75)'
                : '1px solid rgba(202, 154, 164, 0.75)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          <span
            className="text-xs leading-none select-none transition-colors duration-300"
            style={{
              color: isLiked ? '#ff8da5' : theme.vineColor,
            }}
          >
            {isLiked ? '♥' : '♡'}
          </span>
          <span
            className="text-[0.68rem] leading-none select-none tracking-[0.04em] transition-colors duration-300"
            style={{
              color: isLiked ? '#ffd1db' : isNsfwSection ? '#d4a3af' : '#7a4852',
              fontWeight: isLiked ? 600 : 400,
            }}
          >
            {likeCount}
          </span>
        </motion.button>
      </div>

      {/* Main Body */}
      <div className="relative z-10 text-center my-auto pt-2 pb-2 px-1.5">
        <div className="flex items-center justify-center gap-1.5 mb-1.5 opacity-75">
          <span
            className="w-7 h-[0.8px]"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.vineColor})` }}
          />
          <span className="text-[0.62rem]" style={{ color: theme.vineColor }}>
            {isNsfwSection ? '✦' : '❦'}
          </span>
          <span
            className="text-[0.54rem] uppercase tracking-[0.22em]"
            style={{
              fontFamily: 'var(--font-serif)',
              color: isNsfwSection ? '#c78292' : '#8c525f',
            }}
          >
            FOL. {archiveNum}
          </span>
          <span className="text-[0.62rem]" style={{ color: theme.vineColor }}>
            {isNsfwSection ? '✦' : '❦'}
          </span>
          <span
            className="w-7 h-[0.8px]"
            style={{ background: `linear-gradient(270deg, transparent, ${theme.vineColor})` }}
          />
        </div>

        <h3
          className="text-xl sm:text-[1.38rem] font-normal tracking-[0.04em] leading-snug transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-whimsical)',
            color: isNsfwSection ? '#fbe6eb' : '#3f2027',
          }}
        >
          {char.name}
        </h3>

        {hasIntro && (
          <div className="my-1.5 px-1">
            <p
              className={`text-[0.82rem] sm:text-[0.86rem] italic tracking-[0.02em] leading-relaxed ${
                isLongIntro && !isIntroExpanded ? 'line-clamp-2 sm:line-clamp-none' : ''
              }`}
              style={{
                fontFamily: 'var(--font-serif)',
                color: isNsfwSection ? '#d6a3b0' : '#734852',
              }}
            >
              &ldquo;{char.intro}&rdquo;
            </p>
            {isLongIntro && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsIntroExpanded(!isIntroExpanded);
                }}
                className="mt-1 text-[0.68rem] italic underline tracking-wide cursor-pointer focus:outline-none opacity-85 hover:opacity-100"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: isNsfwSection ? '#e095a6' : '#a06472',
                }}
              >
                {isIntroExpanded ? 'thu gọn ▴' : 'xem thêm ▾'}
              </button>
            )}
          </div>
        )}

        {char.characterNote && (
          <div
            className="my-2.5 p-2.5 text-xs italic border shadow-2xs text-left"
            style={{
              fontFamily: 'var(--font-handwritten)',
              borderRadius: '3px',
              background: isNsfwSection
                ? 'linear-gradient(135deg, #381f27 0%, #261219 100%)'
                : 'linear-gradient(135deg, #fef5f0 0%, #f0d8dc 100%)',
              borderColor: isNsfwSection ? 'rgba(142, 78, 94, 0.7)' : 'rgba(212, 168, 178, 0.7)',
              color: isNsfwSection ? '#f2cbd4' : '#59323c',
            }}
          >
            <div
              className="flex items-center gap-1 text-[0.62rem] uppercase tracking-[0.14em] mb-0.5 not-italic"
              style={{
                fontFamily: 'var(--font-serif)',
                color: isNsfwSection ? '#e095a6' : '#8c525f',
              }}
            >
              <span>{isNsfwSection ? '✦' : '❦'}</span>
              <span>chú giải từ sốp:</span>
            </div>
            <p className="leading-relaxed">&ldquo;{char.characterNote}&rdquo;</p>
          </div>
        )}

        {char.tags && char.tags.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {(isTagsExpanded ? char.tags : char.tags.slice(0, 4)).map((tag, tIdx) => {
                const lowerTag = tag.trim().toLowerCase();
                const isTagActive = selectedTags.includes(lowerTag);
                return (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTag(lowerTag);
                    }}
                    title={isTagActive ? `Bỏ lọc nhãn "${lowerTag}"` : `Lọc theo nhãn "${lowerTag}"`}
                    className="px-2 py-0.5 text-[0.68rem] sm:text-[0.7rem] lowercase tracking-[0.05em] transition-all duration-300 cursor-pointer flex items-center gap-1 hover:-translate-y-0.5 focus:outline-none"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '2px',
                      background: isTagActive
                        ? isNsfwSection
                          ? 'linear-gradient(145deg, #7a3848 0%, #592532 100%)'
                          : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)'
                        : isNsfwSection
                          ? 'rgba(42, 24, 30, 0.85)'
                          : 'rgba(254, 248, 246, 0.88)',
                      color: isTagActive ? '#fff' : isNsfwSection ? '#e0b8c2' : '#6e3f4a',
                      fontWeight: isTagActive ? 600 : 400,
                      border: isTagActive
                        ? '1px solid rgba(210, 138, 154, 0.9)'
                        : isNsfwSection
                          ? '1px solid rgba(118, 66, 80, 0.7)'
                          : '1px solid rgba(206, 162, 172, 0.68)',
                    }}
                  >
                    <span
                      className="text-[0.52rem] opacity-75"
                      style={{ color: isTagActive ? '#ffd1db' : theme.vineColor }}
                    >
                      {isTagActive ? '✦' : '·'}
                    </span>
                    <span>{lowerTag}</span>
                  </button>
                );
              })}
            </div>
            {char.tags.length > 4 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTagsExpanded(!isTagsExpanded);
                }}
                className="mt-1.5 text-[0.65rem] italic tracking-wide cursor-pointer focus:outline-none opacity-80 hover:opacity-100 block mx-auto"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: isNsfwSection ? '#c78292' : '#8c525f',
                }}
              >
                {isTagsExpanded ? 'thu gọn nhãn ▴' : `+${char.tags.length - 4} nhãn khác ▾`}
              </button>
            )}
          </div>
        )}

        <div
          className="mt-3 text-[0.52rem] uppercase tracking-[0.22em] opacity-80"
          style={{
            fontFamily: 'var(--font-serif)',
            color: isNsfwSection ? '#a66878' : '#9c6a76',
          }}
        >
          {isNsfwSection ? 'NOX ARCANA · SECRET GARDEN' : 'FOUND IN RỪNG MỘNG · NAOMI'}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="relative z-10 mt-3.5 pt-3 flex flex-wrap items-center justify-center gap-2"
        style={{
          borderTop: `1px dashed ${isNsfwSection ? 'rgba(126, 72, 86, 0.55)' : 'rgba(214, 172, 182, 0.6)'}`,
        }}
      >
        {hasMultipleLinks ? (
          <>
            {char.bgUrl && (
              <a
                href={char.bgUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardOrButtonClick(e, theme.flowerColor);
                }}
                className="group/btn relative px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'var(--font-serif)',
                  borderRadius: '3px',
                  background: isNsfwSection
                    ? 'linear-gradient(145deg, #462630 0%, #30171e 100%)'
                    : 'linear-gradient(145deg, #fef5f0 0%, #f0d8dc 100%)',
                  border: isNsfwSection ? '1px solid rgba(138, 76, 92, 0.8)' : '1px solid rgba(202, 154, 164, 0.8)',
                  color: isNsfwSection ? '#f5d6dc' : '#482830',
                }}
              >
                <span className="text-[0.65rem] opacity-80" style={{ color: theme.vineColor }}>✿</span>
                <span>bg ♡</span>
              </a>
            )}
            {char.blUrl && (
              <a
                href={char.blUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardOrButtonClick(e, theme.flowerColor);
                }}
                className="group/btn relative px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'var(--font-serif)',
                  borderRadius: '3px',
                  background: isNsfwSection
                    ? 'linear-gradient(145deg, #5c2d38 0%, #3d1b23 100%)'
                    : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)',
                  border: isNsfwSection ? '1px solid rgba(162, 92, 110, 0.88)' : '1px solid rgba(188, 134, 146, 0.88)',
                  color: isNsfwSection ? '#ffe0e6' : '#361c22',
                }}
              >
                <span className="text-[0.65rem] opacity-85" style={{ color: theme.vineColor }}>✦</span>
                <span>bl ♡</span>
              </a>
            )}
          </>
        ) : char.type === 'NP' ? (
          hasGgai && (
            <a
              href={char.ggaiUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                handleCardOrButtonClick(e, theme.flowerColor);
              }}
              className="group/btn relative px-4 py-1.5 text-xs font-medium lowercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
              style={{
                fontFamily: 'var(--font-serif)',
                borderRadius: '3px',
                background: isNsfwSection
                  ? 'linear-gradient(145deg, #5c2d38 0%, #3d1b23 100%)'
                  : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)',
                border: isNsfwSection ? '1px solid rgba(162, 92, 110, 0.88)' : '1px solid rgba(188, 134, 146, 0.88)',
                color: isNsfwSection ? '#ffe0e6' : '#361c22',
              }}
            >
              <span className="text-[0.65rem] opacity-85" style={{ color: theme.vineColor }}>❦</span>
              <span>find them ♡</span>
            </a>
          )
        ) : char.type === 'OPEN WORLD' ? (
          hasGgai && (
            <a
              href={char.ggaiUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                handleCardOrButtonClick(e, theme.flowerColor);
              }}
              className="group/btn relative px-4 py-1.5 text-xs font-medium lowercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
              style={{
                fontFamily: 'var(--font-serif)',
                borderRadius: '3px',
                background: isNsfwSection
                  ? 'linear-gradient(145deg, #5c2d38 0%, #3d1b23 100%)'
                  : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)',
                border: isNsfwSection ? '1px solid rgba(162, 92, 110, 0.88)' : '1px solid rgba(188, 134, 146, 0.88)',
                color: isNsfwSection ? '#ffe0e6' : '#361c22',
              }}
            >
              <span className="text-[0.65rem] opacity-85" style={{ color: theme.vineColor }}>✦</span>
              <span>open ur world ↗</span>
            </a>
          )
        ) : (
          <>
            {hasFullPlot && (
              <a
                href={char.fullPlotUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardOrButtonClick(e, theme.flowerColor);
                }}
                className="group/btn relative px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'var(--font-serif)',
                  borderRadius: '3px',
                  background: isNsfwSection
                    ? 'linear-gradient(145deg, #462630 0%, #30171e 100%)'
                    : 'linear-gradient(145deg, #fef5f0 0%, #f0d8dc 100%)',
                  border: isNsfwSection ? '1px solid rgba(138, 76, 92, 0.8)' : '1px solid rgba(202, 154, 164, 0.8)',
                  color: isNsfwSection ? '#f5d6dc' : '#482830',
                }}
              >
                <span className="text-[0.62rem] opacity-80" style={{ color: theme.vineColor }}>❀</span>
                <span>full plot ↗</span>
              </a>
            )}

            {showFindHimButton &&
              (hasGgai ? (
                char.id === 'sylvester-vance' ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardOrButtonClick(e, theme.flowerColor);
                      setIsPasswordModalOpen(true);
                    }}
                    className="group/btn relative px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                      background: isNsfwSection
                        ? 'linear-gradient(145deg, #5c2d38 0%, #3d1b23 100%)'
                        : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)',
                      border: isNsfwSection ? '1px solid rgba(162, 92, 110, 0.88)' : '1px solid rgba(188, 134, 146, 0.88)',
                      color: isNsfwSection ? '#ffe0e6' : '#361c22',
                    }}
                  >
                    <span className="text-[0.62rem] opacity-85" style={{ color: theme.vineColor }}>❦</span>
                    <span>find him ♡</span>
                  </button>
                ) : (
                  <a
                    href={char.ggaiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardOrButtonClick(e, theme.flowerColor);
                    }}
                    className="group/btn relative px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                      background: isNsfwSection
                        ? 'linear-gradient(145deg, #5c2d38 0%, #3d1b23 100%)'
                        : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)',
                      border: isNsfwSection ? '1px solid rgba(162, 92, 110, 0.88)' : '1px solid rgba(188, 134, 146, 0.88)',
                      color: isNsfwSection ? '#ffe0e6' : '#361c22',
                    }}
                  >
                    <span className="text-[0.62rem] opacity-85" style={{ color: theme.vineColor }}>❦</span>
                    <span>find him ♡</span>
                  </a>
                )
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardOrButtonClick(e, theme.flowerColor);
                  }}
                  className="group/btn relative px-3.5 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '3px',
                    background: isNsfwSection
                      ? 'linear-gradient(145deg, #5c2d38 0%, #3d1b23 100%)'
                      : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)',
                    border: isNsfwSection ? '1px solid rgba(162, 92, 110, 0.88)' : '1px solid rgba(188, 134, 146, 0.88)',
                    color: isNsfwSection ? '#ffe0e6' : '#361c22',
                  }}
                >
                  <span className="text-[0.62rem] opacity-85" style={{ color: theme.vineColor }}>❦</span>
                  <span>find him ♡</span>
                </button>
              ))}
          </>
        )}
      </div>

      <NaomiCharacterComments
        characterName={char.name}
        comments={comments}
        onAddComment={onAddComment}
        vineColor={theme.vineColor}
        flowerColor={theme.flowerColor}
        innerBorder={isNsfwSection ? 'rgba(126, 72, 86, 0.55)' : 'rgba(214, 172, 182, 0.55)'}
        glow={theme.glow}
      />

      {/* Sylvester Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24180e]/45"
            onClick={(e) => {
              e.stopPropagation();
              setIsPasswordModalOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-6 sm:p-7 text-center border"
              style={{
                borderRadius: '4px 6px 4px 6px',
                background: 'linear-gradient(155deg, #fcf8ef 0%, #f4ead6 55%, #ebdec6 100%)',
                borderColor: 'rgba(176, 144, 98, 0.85)',
                boxShadow: '0 22px 54px rgba(46, 32, 18, 0.28), inset 0 0 28px rgba(246, 228, 192, 0.65)',
              }}
            >
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="absolute top-3.5 right-3.5 w-7 h-7 bg-[#f8f0df] border border-[#c8ab84] text-[#6e563d] hover:bg-[#ecdec4] flex items-center justify-center text-xs cursor-pointer transition-colors"
                style={{ borderRadius: '2px' }}
                aria-label="Đóng"
              >
                ✕
              </button>

              <div
                className="w-9 h-9 mx-auto mb-2 bg-[#f6ebd8] border border-[#b89668] shadow-2xs flex items-center justify-center text-[#7a5d3b] text-sm"
                style={{ borderRadius: '50%' }}
              >
                ❦
              </div>

              <h4
                className="text-base sm:text-lg font-normal text-[#2b2015] mb-1"
                style={{ fontFamily: 'var(--font-whimsical)' }}
              >
                tên gọi viết tắt của Sylvester?
              </h4>

              <div className="my-2 flex items-center justify-center gap-2 opacity-75 text-xs text-[#84694a]">
                <span>✦</span>
                <span>mật ấn trong rừng mộng</span>
                <span>✦</span>
              </div>

              {!isUnlocked ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const cleaned = passwordInput.trim().toLowerCase();
                    if (cleaned === 'syl') {
                      setIsUnlocked(true);
                      setPasswordError(null);
                    } else {
                      const nextAttempts = attempts + 1;
                      setAttempts(nextAttempts);
                      setPasswordError('ô nooooo, sai mất rồi !! thử lại nhé.');
                    }
                  }}
                  className="mt-4 space-y-3"
                >
                  <input
                    type="text"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="nhập đáp án..."
                    autoFocus
                    className="w-full px-4 py-2 bg-[#fdfaf2] border border-[#c8ac84] text-center text-sm text-[#38291d] placeholder:text-[#9c866d] focus:outline-none focus:border-[#8c6b42] tracking-wider"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                    }}
                  />

                  {passwordError && (
                    <p className="text-xs text-[#a8435b] italic tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
                      {passwordError}
                    </p>
                  )}

                  {attempts >= 3 && (
                    <div
                      className="p-3 bg-[#f9f2e6] border border-[#d8be98] text-xs text-[#6e533b] italic leading-relaxed text-left"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                      }}
                    >
                      <span className="font-semibold not-italic">gợi ý: </span>
                      đọc lại plot, hoặc xem thử thông báo có link char, naomi đã gọi ảnh là gì nhé.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#69523c] hover:bg-[#523e2c] text-[#fef9e8] text-xs tracking-[0.14em] uppercase font-medium shadow-sm transition-all cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                    }}
                  >
                    xác nhận
                  </button>
                </form>
              ) : (
                <div className="mt-4 space-y-4">
                  <div
                    className="p-3.5 bg-[#edf5ec] border border-[#a8c6a4] text-xs text-[#2b522b] italic"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                    }}
                  >
                    dễ mà đúng hơm, kekekekek (๑˃ᴗ˂)ﻭ
                  </div>

                  <a
                    href={char.ggaiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="block w-full py-2.5 bg-[#4a6b46] hover:bg-[#385435] text-[#fefefc] text-xs tracking-[0.14em] uppercase font-medium shadow-sm transition-all text-center"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                    }}
                  >
                    find him again ↗
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const ForestFrameCornerSVG: React.FC<{
  corner: 'tl' | 'tr' | 'bl' | 'br';
}> = ({ corner }) => {
  const transformMap = {
    tl: 'rotate(0deg)',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1, -1)',
  };

  return (
    <svg
      viewBox="0 0 130 130"
      className="w-20 h-20 sm:w-28 sm:h-28 pointer-events-none animate-rm-vine"
      style={{ transform: transformMap[corner] }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 6 112 C 6 54, 24 22, 68 10 C 88 5, 106 6, 122 8"
        stroke="#c8969e"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
      <circle cx="22" cy="22" r="3.2" fill="#f2b2c2" fillOpacity="0.88" />
    </svg>
  );
};

const NaomiEmptyForestNote: React.FC<{ isNsfwSection: boolean }> = ({ isNsfwSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 max-w-lg mx-auto my-8 px-6 sm:px-10 py-9 sm:py-11 text-center overflow-hidden"
      style={{
        borderRadius: '4px 6px 4px 6px',
        background: isNsfwSection
          ? 'linear-gradient(155deg, #2b1920 0%, #221419 55%, #190f13 100%)'
          : 'linear-gradient(155deg, #fef8f4 0%, #f7edf2 55%, #f1dedc 100%)',
        border: isNsfwSection ? '1.5px solid rgba(126, 72, 86, 0.75)' : '1.5px solid rgba(198, 150, 140, 0.78)',
        boxShadow: isNsfwSection
          ? '0 14px 36px rgba(0,0,0,0.3), inset 0 0 22px rgba(108, 60, 72, 0.4)'
          : '0 14px 36px rgba(54, 38, 22, 0.1), inset 0 0 22px rgba(248, 226, 232, 0.65)',
      }}
    >
      <div
        className="absolute inset-2.5 pointer-events-none"
        style={{
          borderRadius: '3px',
          border: isNsfwSection ? '0.8px dashed rgba(126, 72, 86, 0.55)' : '0.8px dashed rgba(188, 146, 138, 0.55)',
        }}
      />
      <p
        className="relative z-10 text-base sm:text-lg italic leading-relaxed px-2"
        style={{
          fontFamily: 'var(--font-serif)',
          color: isNsfwSection ? '#f5d6dc' : '#482830',
        }}
      >
        &ldquo;em naomi lười quá, chưa chịu đẻ nữa (ง ื▿ ื)ว&rdquo;
      </p>
    </motion.div>
  );
};

export const NaomiCharacterArchive: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursorOffset, setCursorOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingCategory, setRatingCategory] = useState<'sfw' | 'nsfw'>('sfw');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [likedChars, setLikedChars] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(LIKED_CHARS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    try {
      const raw = window.localStorage.getItem(LIKE_COUNTS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {}
    return {};
  });

  const [commentsByChar, setCommentsByChar] = useState<Record<string, CharacterComment[]>>(() => {
    try {
      const raw = window.localStorage.getItem(COMMENTS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {}
    return {};
  });

  const activeCharacters = useMemo(
    () => naomiCharacters.filter((char) => char.name && char.name.trim() !== ''),
    []
  );

  const availableKeywordTags = useMemo(() => {
    const curatedWhitelist = [
      'bg',
      'bl',
      'np',
      'r18',
      'open world',
      'dark romance',
      'xuyên không',
      'dating',
      'slice of life',
      'modern',
      'hài cốt',
      'anh trai em gái',
      'forbidden love',
      'age gap',
    ];
    const presentTags = new Set<string>();
    activeCharacters.forEach((char) => {
      (char.tags || []).forEach((rawTag) => {
        const lower = rawTag.trim().toLowerCase();
        if (lower) {
          if (isR18Tag(lower)) {
            presentTags.add('r18');
          } else {
            presentTags.add(lower);
          }
        }
      });
    });
    return curatedWhitelist.filter((tag) => presentTags.has(tag));
  }, [activeCharacters]);

  const filteredCharacters = useMemo(() => {
    const trimmedSearch = searchQuery.trim().toLowerCase();
    const normalizedSearch = normalizeVietnamese(searchQuery);

    return activeCharacters.filter((char) => {
      const isNsfw = isCharacterNsfw(char);
      if (ratingCategory === 'sfw' && isNsfw) return false;
      if (ratingCategory === 'nsfw' && !isNsfw) return false;

      if (trimmedSearch !== '') {
        const lowerName = char.name.toLowerCase();
        const normalizedName = normalizeVietnamese(char.name);
        const matchesExactLower = lowerName.includes(trimmedSearch);
        const matchesNormalized = normalizedName.includes(normalizedSearch);
        if (!matchesExactLower && !matchesNormalized) {
          return false;
        }
      }

      if (selectedTags.length > 0) {
        const charLowerTags = (char.tags || []).map((t) => t.trim().toLowerCase());
        const hasAllSelected = selectedTags.every((selectedTag) =>
          charLowerTags.some(
            (ct) =>
              ct === selectedTag ||
              ct
                .split('/')
                .map((part) => part.trim())
                .includes(selectedTag)
          )
        );
        if (!hasAllSelected) return false;
      }

      return true;
    });
  }, [activeCharacters, ratingCategory, searchQuery, selectedTags]);

  useEffect(() => {
    if (ratingCategory === 'sfw' && video1Ref.current) {
      video1Ref.current.play().catch(() => {});
    }
    if (ratingCategory === 'nsfw' && video2Ref.current) {
      video2Ref.current.play().catch(() => {});
    }
  }, [ratingCategory]);

  const handleToggleLike = useCallback((charName: string) => {
    setLikedChars((prevLiked) => {
      const isCurrentlyLiked = prevLiked.includes(charName);
      const nextLiked = isCurrentlyLiked
        ? prevLiked.filter((name) => name !== charName)
        : [...prevLiked, charName];

      try {
        window.localStorage.setItem(LIKED_CHARS_STORAGE_KEY, JSON.stringify(nextLiked));
      } catch {}

      setLikeCounts((prevCounts) => {
        const baseCount =
          typeof prevCounts[charName] === 'number'
            ? prevCounts[charName]
            : getInitialLikeCount(charName);
        const nextCount = Math.max(0, isCurrentlyLiked ? baseCount - 1 : baseCount + 1);
        const nextCounts = { ...prevCounts, [charName]: nextCount };
        try {
          window.localStorage.setItem(LIKE_COUNTS_STORAGE_KEY, JSON.stringify(nextCounts));
        } catch {}
        return nextCounts;
      });

      return nextLiked;
    });
  }, []);

  const handleAddComment = useCallback(
    (charName: string, nickname: string, commentText: string) => {
      const newComment: CharacterComment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        characterName: charName,
        nickname,
        comment: commentText,
        timestamp: Date.now(),
        iconIndex: Math.floor(Math.random() * 8),
      };

      setCommentsByChar((prev) => {
        const existing = prev[charName] || [];
        const next = {
          ...prev,
          [charName]: [...existing, newComment],
        };
        try {
          window.localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const handleToggleKeywordTag = useCallback((rawTag: string) => {
    const tag = rawTag.trim().toLowerCase();
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleClearKeywordFilters = () => {
    setSelectedTags([]);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  const handleArchiveMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isReducedMotion || isTouchDevice || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const relY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setCursorOffset({ x: relX, y: relY });
    },
    [isReducedMotion, isTouchDevice]
  );

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

  const isNsfw = ratingCategory === 'nsfw';

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleArchiveMouseMove}
      className="relative w-full mx-auto py-4 sm:py-6 select-none overflow-visible"
    >
      {/* 16:9 Decorative Atmospheric Video Frame (Video 1 for SFW, Video 2 for NSFW) */}
      <div className="relative z-20 max-w-2xl mx-auto mb-8 px-2 sm:px-4">
        <div
          className="relative overflow-hidden p-2 sm:p-3 transition-all duration-700"
          style={{
            borderRadius: '4px 6px 4px 6px',
            background: isNsfw
              ? 'linear-gradient(145deg, #2e1a21 0%, #1f1116 100%)'
              : 'linear-gradient(145deg, #fef6ec 0%, #f1decb 100%)',
            border: isNsfw ? '1.5px solid rgba(142, 78, 94, 0.85)' : '1.5px solid rgba(198, 150, 134, 0.85)',
            boxShadow: isNsfw
              ? '0 12px 36px rgba(0,0,0,0.4), inset 0 0 20px rgba(108, 50, 64, 0.5)'
              : '0 12px 36px rgba(62, 38, 44, 0.15), inset 0 0 20px rgba(255, 230, 235, 0.7)',
          }}
        >
          {/* Inner Dashed Rule */}
          <div
            className="absolute inset-1.5 pointer-events-none z-10"
            style={{
              border: isNsfw ? '0.8px dashed rgba(142, 78, 94, 0.5)' : '0.8px dashed rgba(188, 138, 122, 0.5)',
            }}
          />

          {/* 16:9 Aspect Ratio Container */}
          <div className="relative w-full aspect-video overflow-hidden" style={{ borderRadius: '2px' }}>
            {ratingCategory === 'sfw' ? (
              <video
                ref={video1Ref}
                src="/assets/aistudio/5721C21A-1A28-44C1-BCE1-1753AAA4F192_3b402fbd.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-[1.04] contrast-[1.02]"
              />
            ) : (
              <video
                ref={video2Ref}
                src="/assets/aistudio/63e60a96d273d03d94157c51bd3ba1f8_2b43d941.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-[0.96] contrast-[1.08]"
              />
            )}

            {/* Subtle Atmospheric Vignette Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isNsfw
                  ? 'radial-gradient(circle, transparent 50%, rgba(20, 10, 14, 0.65) 100%)'
                  : 'radial-gradient(circle, transparent 55%, rgba(62, 30, 38, 0.25) 100%)',
              }}
            />
          </div>

          <div
            className="mt-2 text-center text-[0.62rem] uppercase tracking-[0.24em] italic"
            style={{
              fontFamily: 'var(--font-serif)',
              color: isNsfw ? '#c78292' : '#8c525f',
            }}
          >
            {isNsfw ? '❦ nox arcana · vầng trăng và nhung đỏ ❦' : '❦ hortus diurnus · nắng sớm qua vòm lá ❦'}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SEARCH & FILTER SYSTEM (Adapted to SFW vs NSFW Mood)
         ===================================================================== */}
      <div className="relative z-20 max-w-4xl mx-auto mb-6 sm:mb-11 px-0.5 sm:px-4 space-y-3.5 sm:space-y-5">
        {/* Search Field */}
        <div className="relative max-w-md mx-auto">
          <div
            className="relative flex items-center px-3.5 py-2 transition-all duration-300"
            style={{
              borderRadius: '3px',
              background: isNsfw
                ? 'linear-gradient(155deg, #2e1a21 0%, #221419 100%)'
                : 'linear-gradient(155deg, #fef8f4 0%, #f1ded5 100%)',
              border: isNsfw ? '1.2px solid rgba(142, 78, 94, 0.85)' : '1.2px solid rgba(198, 150, 134, 0.85)',
              boxShadow: isNsfw
                ? '0 4px 14px rgba(0,0,0,0.3), inset 0 0 12px rgba(108, 50, 64, 0.4)'
                : '0 4px 14px rgba(62, 38, 44, 0.08), inset 0 0 12px rgba(255, 230, 235, 0.7)',
            }}
          >
            <span
              className="text-sm mr-2.5 select-none"
              style={{ color: isNsfw ? '#e095a6' : '#8c525f' }}
              aria-hidden="true"
            >
              {isNsfw ? '🗝' : '✒'}
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isNsfw ? 'tìm bí mật trong bóng tối...' : 'tìm một người trong rừng...'}
              aria-label="tìm kiếm"
              className="w-full bg-transparent text-xs sm:text-sm placeholder:italic focus:outline-none tracking-[0.04em]"
              style={{
                fontFamily: 'var(--font-serif)',
                color: isNsfw ? '#f5d6dc' : '#3f2027',
              }}
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa tìm kiếm"
                className="ml-2 w-5 h-5 flex items-center justify-center text-[0.7rem] transition-colors cursor-pointer"
                style={{
                  borderRadius: '2px',
                  background: isNsfw ? '#3f1821' : '#f4e2d8',
                  border: isNsfw ? '1px solid rgba(142, 78, 94, 0.8)' : '1px solid rgba(198, 150, 134, 0.8)',
                  color: isNsfw ? '#f5d6dc' : '#482830',
                }}
              >
                ✕
              </button>
            ) : (
              <span
                className="text-xs ml-2 select-none opacity-80"
                style={{ color: isNsfw ? '#c78292' : '#b36778' }}
                aria-hidden="true"
              >
                {isNsfw ? '✦' : '🌿'}
              </span>
            )}
          </div>
        </div>

        {/* Manuscript Tabs (SFW vs NSFW) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* SFW Tab */}
          <button
            type="button"
            onClick={() => setRatingCategory('sfw')}
            className="group/sign relative px-5 py-1.5 text-xs sm:text-sm lowercase tracking-[0.14em] transition-all duration-300 cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 focus:outline-none"
            style={{
              fontFamily: 'var(--font-serif)',
              borderRadius: '3px',
              background:
                ratingCategory === 'sfw'
                  ? 'linear-gradient(145deg, #f8dce2 0%, #edc2cc 100%)'
                  : 'linear-gradient(145deg, #fef5f0 0%, #f1ded5 100%)',
              border:
                ratingCategory === 'sfw'
                  ? '1.2px solid rgba(188, 114, 130, 0.95)'
                  : '1px solid rgba(198, 150, 134, 0.75)',
              color: ratingCategory === 'sfw' ? '#4a1e28' : '#734852',
              fontWeight: ratingCategory === 'sfw' ? 600 : 400,
              boxShadow:
                ratingCategory === 'sfw'
                  ? '0 4px 14px rgba(188, 114, 130, 0.25), 2px 2px 0px rgba(238, 196, 204, 0.7)'
                  : '0 2px 6px rgba(62, 38, 44, 0.05)',
            }}
          >
            <span className="text-[0.72rem] opacity-85">🌱</span>
            <span>FOLIO I · sfw (ánh dương)</span>
            {ratingCategory === 'sfw' && <span className="text-[0.62rem] text-[#b36778]">❦</span>}
          </button>

          {/* NSFW Tab */}
          <button
            type="button"
            onClick={() => setRatingCategory('nsfw')}
            className="group/sign relative px-5 py-1.5 text-xs sm:text-sm lowercase tracking-[0.14em] transition-all duration-300 cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 focus:outline-none"
            style={{
              fontFamily: 'var(--font-serif)',
              borderRadius: '3px',
              background:
                ratingCategory === 'nsfw'
                  ? 'linear-gradient(145deg, #522c36 0%, #321820 100%)'
                  : 'linear-gradient(145deg, #fef5f0 0%, #f1ded5 100%)',
              border:
                ratingCategory === 'nsfw'
                  ? '1.2px solid rgba(176, 92, 112, 0.95)'
                  : '1px solid rgba(198, 150, 134, 0.75)',
              color: ratingCategory === 'nsfw' ? '#ffccd5' : '#734852',
              fontWeight: ratingCategory === 'nsfw' ? 600 : 400,
              boxShadow:
                ratingCategory === 'nsfw'
                  ? '0 4px 14px rgba(0, 0, 0, 0.35), 2px 2px 0px rgba(82, 44, 54, 0.8)'
                  : '0 2px 6px rgba(62, 38, 44, 0.05)',
            }}
          >
            <span className="text-[0.72rem] opacity-85">🍄</span>
            <span>FOLIO II · nsfw (bóng đêm)</span>
            {ratingCategory === 'nsfw' && <span className="text-[0.62rem] text-[#ff8da5]">❦</span>}
          </button>
        </div>

        {/* Keyword Tags Row */}
        {availableKeywordTags.length > 0 && (
          <div
            className="relative px-3.5 py-3 sm:px-5 sm:py-3.5"
            style={{
              borderRadius: '4px',
              background: isNsfw ? 'rgba(36, 20, 26, 0.82)' : 'rgba(254, 248, 246, 0.82)',
              border: isNsfw ? '1px dashed rgba(126, 72, 86, 0.65)' : '1px dashed rgba(198, 150, 134, 0.65)',
              boxShadow: isNsfw ? 'inset 0 0 16px rgba(78, 38, 48, 0.4)' : 'inset 0 0 16px rgba(248, 222, 228, 0.45)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {availableKeywordTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleKeywordTag(tag)}
                    className="px-2.5 py-1 text-[0.72rem] sm:text-xs lowercase tracking-[0.05em] transition-all duration-300 cursor-pointer flex items-center gap-1 hover:-translate-y-0.5 focus:outline-none"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '2px',
                      background: isSelected
                        ? isNsfw
                          ? 'linear-gradient(145deg, #7a3848 0%, #592532 100%)'
                          : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)'
                        : isNsfw
                          ? 'rgba(46, 26, 32, 0.9)'
                          : 'rgba(255, 252, 250, 0.9)',
                      border: isSelected
                        ? '1px solid rgba(210, 138, 154, 0.9)'
                        : isNsfw
                          ? '1px solid rgba(118, 66, 80, 0.7)'
                          : '1px solid rgba(206, 162, 172, 0.68)',
                      color: isSelected ? '#fff' : isNsfw ? '#e0b8c2' : '#6e3f4a',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    <span className="text-[0.55rem]" style={{ color: isSelected ? '#ffd1db' : (isNsfw ? '#e0b8c2' : '#a86a78') }}>
                      {isSelected ? '✦' : '·'}
                    </span>
                    <span>{tag}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleClearKeywordFilters}
                disabled={selectedTags.length === 0}
                className={`px-2.5 py-1 text-[0.72rem] sm:text-xs italic lowercase tracking-[0.06em] transition-all duration-300 flex items-center gap-1 focus:outline-none ${
                  selectedTags.length > 0
                    ? 'cursor-pointer hover:-translate-y-0.5'
                    : 'opacity-45 cursor-default'
                }`}
                style={{
                  fontFamily: 'var(--font-serif)',
                  borderRadius: '2px',
                  background:
                    selectedTags.length > 0
                      ? isNsfw
                        ? 'linear-gradient(145deg, #692c3a 0%, #481c26 100%)'
                        : 'linear-gradient(145deg, #f6e2e6 0%, #ebd0d6 100%)'
                      : isNsfw
                        ? 'rgba(40, 22, 28, 0.5)'
                        : 'rgba(248, 241, 229, 0.55)',
                  border:
                    selectedTags.length > 0
                      ? '1px solid rgba(206, 114, 132, 0.8)'
                      : '1px dotted rgba(198, 150, 134, 0.55)',
                  color: selectedTags.length > 0 ? (isNsfw ? '#ffd1db' : '#693a44') : '#8c6a72',
                }}
              >
                <span className="text-[0.62rem]">❀</span>
                <span>clear filters</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Character Plates */}
      <AnimatePresence mode="wait">
        {filteredCharacters.length === 0 ? (
          <NaomiEmptyForestNote key="empty-forest-note" isNsfwSection={isNsfw} />
        ) : (
          <motion.div
            key={`${ratingCategory}-${selectedTags.join(',')}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredCharacters.map((char, index) => {
                const isLiked = likedChars.includes(char.name);
                const likeCount =
                  typeof likeCounts[char.name] === 'number'
                    ? likeCounts[char.name]
                    : getInitialLikeCount(char.name) + (isLiked ? 1 : 0);

                return (
                  <StorybookCharacterCard
                    key={char.name}
                    char={char}
                    index={index}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    onToggleLike={handleToggleLike}
                    selectedTags={selectedTags}
                    onToggleTag={handleToggleKeywordTag}
                    comments={commentsByChar[char.name] || []}
                    onAddComment={handleAddComment}
                    isReducedMotion={isReducedMotion}
                    isTouchDevice={isTouchDevice}
                    onTriggerBurst={handleTriggerBurst}
                    isNsfwSection={isNsfw}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
