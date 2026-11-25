import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { naomiCharacters, CharacterEntry, getCharacterId } from '../../../data/characterLibrary';
import { CharacterComment, formatRelativeTime } from './NaomiCharacterComments';
import {
  fetchRungMongData,
  toggleLikeApi,
  submitCommentApi,
  subscribeRungMongUpdates,
} from '../../../utils/rungMongApi';

const LIKED_CHARS_STORAGE_KEY = 'rung_mong_user_liked_chars_v2';
const BOTANICAL_ICONS = ['✿', '🍄', '🌿', '✦', '❀', '🦋', '🌱', '🌙'];

interface CharacterBotanicalTheme {
  paletteName: string;
  rowBg: string;
  modalBg: string;
  border: string;
  hoverBorder: string;
  innerBorder: string;
  glow: string;
  hoverGlow: string;
  shadow: string;
  vineColor: string;
  flowerColor: string;
  accentDot: string;
  nameColor: string;
  introColor: string;
  tagBg: string;
  tagHoverBg: string;
  tagBorder: string;
  tagText: string;
  primaryBtnBg: string;
  primaryBtnBorder: string;
  primaryBtnText: string;
  secondaryBtnBg: string;
  secondaryBtnBorder: string;
  secondaryBtnText: string;
  organicRadius: string;
}

function isR18Tag(tag: string): boolean {
  const cleaned = tag.trim().toLowerCase();
  return (
    cleaned === 'r18' ||
    cleaned === 'r-18' ||
    cleaned === '18+' ||
    cleaned.includes('r18') ||
    cleaned.includes('nsfw')
  );
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
  isNsfwSection: boolean = false,
  index: number = 0
): CharacterBotanicalTheme {
  const radii = ['4px', '5px', '4px 6px 4px 6px'];
  const organicRadius = radii[index % radii.length];

  if (isNsfwSection) {
    return {
      paletteName: 'dark-wine-romance',
      rowBg: 'linear-gradient(135deg, #2b1720 0%, #201116 52%, #170b10 100%)',
      modalBg: 'linear-gradient(155deg, #2b1720 0%, #201116 50%, #150a0f 100%)',
      border: 'rgba(138, 74, 90, 0.75)',
      hoverBorder: 'rgba(182, 98, 118, 0.95)',
      innerBorder: 'rgba(112, 60, 74, 0.55)',
      glow: 'rgba(142, 68, 88, 0.3)',
      hoverGlow: 'rgba(176, 82, 108, 0.5)',
      shadow: '0 4px 16px rgba(0,0,0,0.35)',
      vineColor: '#b06b7a',
      flowerColor: '#e08ba0',
      accentDot: '#f0c29a',
      nameColor: '#fde6ec',
      introColor: '#d89ea9',
      tagBg: 'rgba(46, 26, 32, 0.85)',
      tagHoverBg: 'rgba(60, 32, 42, 0.98)',
      tagBorder: 'rgba(126, 70, 84, 0.75)',
      tagText: '#f2c8d2',
      primaryBtnBg: 'linear-gradient(145deg, #582b36 0%, #3e1e26 100%)',
      primaryBtnBorder: 'rgba(168, 92, 110, 0.88)',
      primaryBtnText: '#ffe0e6',
      secondaryBtnBg: 'linear-gradient(145deg, #361a22 0%, #251017 100%)',
      secondaryBtnBorder: 'rgba(126, 68, 82, 0.8)',
      secondaryBtnText: '#f5d6dc',
      organicRadius,
    };
  }

  // SFW section: soft baby pink, blush pink, warm ivory, dusty rose
  return {
    paletteName: 'pink-meadow-blossom',
    rowBg: 'linear-gradient(135deg, #fffdfc 0%, #fdf4f6 52%, #faeaee 100%)',
    modalBg: 'linear-gradient(155deg, #fffbf9 0%, #fdf2f4 48%, #f8e5e9 100%)',
    border: 'rgba(222, 172, 182, 0.75)',
    hoverBorder: 'rgba(196, 128, 142, 0.95)',
    innerBorder: 'rgba(224, 180, 190, 0.55)',
    glow: 'rgba(235, 175, 188, 0.22)',
    hoverGlow: 'rgba(224, 148, 164, 0.42)',
    shadow: '0 2px 12px rgba(82, 42, 52, 0.06), inset 0 0 16px rgba(255, 230, 236, 0.4)',
    vineColor: '#a86676',
    flowerColor: '#f2b2c2',
    accentDot: '#ffdca3',
    nameColor: '#451f28',
    introColor: '#72424d',
    tagBg: 'rgba(255, 250, 248, 0.92)',
    tagHoverBg: 'rgba(255, 255, 255, 0.98)',
    tagBorder: 'rgba(216, 172, 182, 0.75)',
    tagText: '#683642',
    primaryBtnBg: 'linear-gradient(145deg, #fcedf1 0%, #e8cad4 100%)',
    primaryBtnBorder: 'rgba(196, 140, 152, 0.88)',
    primaryBtnText: '#3b1c24',
    secondaryBtnBg: 'linear-gradient(145deg, #fffdfb 0%, #faecee 100%)',
    secondaryBtnBorder: 'rgba(216, 170, 180, 0.78)',
    secondaryBtnText: '#48262e',
    organicRadius,
  };
}

/**
 * Filter tags to compact pills for the preview list before click
 */
function getCompactPreviewTags(tags: string[] = []): string[] {
  const shortTags = tags.filter((t) => t.trim().length <= 26);
  if (shortTags.length > 0) {
    return shortTags.slice(0, 3);
  }
  return tags.slice(0, 3);
}

const CardCornerBotanical: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  vineColor: string;
  flowerColor: string;
  accentDot: string;
}> = ({ position, vineColor, flowerColor, accentDot }) => {
  const rotationMap = {
    'top-left': 'rotate(0deg)',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)',
  };

  return (
    <svg
      viewBox="0 0 68 68"
      className="w-10 h-10 pointer-events-none transition-transform duration-500 ease-out"
      style={{ transform: rotationMap[position] }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 4 46 C 4 22, 18 6, 46 5"
        stroke={vineColor}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <circle cx="13" cy="10.2" r="2.4" fill={flowerColor} fillOpacity="0.8" />
      <circle cx="15.8" cy="12.4" r="2.4" fill={flowerColor} fillOpacity="0.8" />
      <circle cx="13" cy="13.2" r="1.6" fill={accentDot} />
    </svg>
  );
};

/* =========================================================================
   COMPACT CHARACTER ROW (New Default View)
   Structure:
   [status/tag]  [CHARACTER NAME]              [SMALL IMAGE ON RIGHT]
   [intro short preview]
   [compact tags]  ♡ [likes]  💬 [comments]   xem chi tiết ↗
   ========================================================================= */
interface NaomiCompactCharacterRowProps {
  char: CharacterEntry;
  index: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (charId: string) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  commentsCount: number;
  onSelectCharacter: (char: CharacterEntry) => void;
  isNsfwSection: boolean;
}

const NaomiCompactCharacterRow: React.FC<NaomiCompactCharacterRowProps> = ({
  char,
  index,
  isLiked,
  likeCount,
  onToggleLike,
  selectedTags,
  onToggleTag,
  commentsCount,
  onSelectCharacter,
  isNsfwSection,
}) => {
  const charId = getCharacterId(char);
  const theme = getCharacterTheme(isNsfwSection, index);
  const archiveNum = String(index + 1).padStart(2, '0');
  const compactTags = getCompactPreviewTags(char.tags);

  const plateLabel =
    char.type === 'OPEN WORLD'
      ? 'OPEN WORLD'
      : char.type === 'NP'
        ? 'NP FILE'
        : isNsfwSection
          ? 'SECRET ARCHIVE'
          : 'CHARACTER FILE';

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelectCharacter(char)}
      className="group relative w-full p-3 sm:p-4 transition-all duration-300 cursor-pointer overflow-hidden flex flex-row items-center justify-between gap-3 sm:gap-4 select-none hover:-translate-y-0.5"
      style={{
        borderRadius: theme.organicRadius,
        background: theme.rowBg,
        border: `1.2px solid ${theme.border}`,
        boxShadow: theme.shadow,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectCharacter(char);
        }
      }}
      aria-label={`Mở hồ sơ nhân vật ${char.name}`}
    >
      {/* Subtle Manuscript Hairline Frame */}
      <div
        className="absolute inset-[3px] pointer-events-none rounded-[3px] transition-colors duration-300"
        style={{
          border: `0.8px dashed ${theme.innerBorder}`,
        }}
      />

      {/* Left Content Column */}
      <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-between space-y-1.5 sm:space-y-2">
        {/* Top: Status / Archive Number + Character Name */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[0.55rem] sm:text-[0.58rem] uppercase tracking-[0.18em] font-medium"
              style={{
                fontFamily: 'var(--font-serif)',
                color: theme.vineColor,
              }}
            >
              RM-{archiveNum} · {plateLabel}
            </span>
          </div>

          <h3
            className="text-[0.98rem] sm:text-[1.12rem] font-semibold leading-snug tracking-wide line-clamp-1 transition-colors duration-300 group-hover:opacity-95"
            style={{
              fontFamily: 'var(--font-whimsical)',
              color: theme.nameColor,
            }}
          >
            {char.name}
          </h3>
          {char.title && char.title !== char.intro && (
            <p
              className="text-[0.72rem] sm:text-[0.76rem] font-medium line-clamp-1 opacity-90 mt-0.5"
              style={{
                fontFamily: 'var(--font-serif)',
                color: theme.nameColor,
              }}
            >
              {char.title}
            </p>
          )}
        </div>

        {/* Middle: Short Intro Preview (Clamped, Never Full Summary) */}
        {(char.intro || char.quote) && (
          <p
            className="text-[0.76rem] sm:text-[0.82rem] italic line-clamp-2 leading-relaxed opacity-90 transition-opacity"
            style={{
              fontFamily: 'var(--font-serif)',
              color: theme.introColor,
            }}
          >
            &ldquo;{char.intro || char.quote}&rdquo;
          </p>
        )}

        {/* Bottom Row: Compact Tags + Likes + Comments + Click Hint */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
          {/* Compact Tag Pills */}
          {compactTags.map((tag, tIdx) => {
            const lowerTag = tag.trim().toLowerCase();
            const isTagActive = selectedTags.includes(lowerTag);
            return (
              <span
                key={tIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTag(lowerTag);
                }}
                title={isTagActive ? `Bỏ lọc nhãn "${lowerTag}"` : `Lọc theo nhãn "${lowerTag}"`}
                className="px-2 py-0.5 text-[0.64rem] sm:text-[0.68rem] lowercase tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1 hover:brightness-105"
                style={{
                  fontFamily: 'var(--font-serif)',
                  borderRadius: '2px',
                  background: isTagActive
                    ? isNsfwSection
                      ? 'linear-gradient(145deg, #7a3848 0%, #592532 100%)'
                      : 'linear-gradient(145deg, #ebd0d6 0%, #d8b0b8 100%)'
                    : theme.tagBg,
                  color: isTagActive ? '#fff' : theme.tagText,
                  fontWeight: isTagActive ? 600 : 400,
                  border: `1px solid ${isTagActive ? 'rgba(210, 138, 154, 0.9)' : theme.tagBorder}`,
                }}
              >
                <span className="text-[0.5rem] opacity-70">
                  {isTagActive ? '✦' : '·'}
                </span>
                <span>{lowerTag}</span>
              </span>
            );
          })}

          {char.tags && char.tags.length > compactTags.length && (
            <span
              className="text-[0.62rem] italic opacity-75"
              style={{ color: theme.vineColor, fontFamily: 'var(--font-serif)' }}
            >
              +{char.tags.length - compactTags.length}
            </span>
          )}

          {/* Compact Like Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(charId);
            }}
            aria-label={isLiked ? `Bỏ thích ${char.name}` : `Thích ${char.name}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.68rem] transition-all duration-200 cursor-pointer focus:outline-none hover:scale-105"
            style={{
              fontFamily: 'var(--font-serif)',
              borderRadius: '2px',
              background: isLiked
                ? isNsfwSection
                  ? 'rgba(92, 38, 50, 0.85)'
                  : 'rgba(248, 218, 224, 0.95)'
                : 'transparent',
              border: `1px solid ${isLiked ? 'rgba(210, 126, 142, 0.8)' : theme.innerBorder}`,
              color: isLiked ? '#e05876' : theme.vineColor,
            }}
          >
            <span className="text-xs leading-none">{isLiked ? '♥' : '♡'}</span>
            <span className="font-medium text-[0.68rem]">{likeCount}</span>
          </button>

          {/* Compact Comments Count Indicator */}
          <span
            className="inline-flex items-center gap-1 text-[0.66rem] sm:text-[0.7rem] opacity-85"
            style={{ fontFamily: 'var(--font-serif)', color: theme.vineColor }}
            title={`${commentsCount} lời nhắn`}
          >
            <span>💬</span>
            <span>{commentsCount}</span>
          </span>

          {/* Subtle Interaction Hint */}
          <span
            className="text-[0.66rem] sm:text-[0.72rem] italic tracking-wide ml-auto hidden xs:inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
            style={{
              fontFamily: 'var(--font-serif)',
              color: theme.vineColor,
            }}
          >
            <span>xem chi tiết</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </span>
        </div>
      </div>

      {/* Right Column: Small Compact Thumbnail Image */}
      <div
        className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-[3px] overflow-hidden p-[2px] transition-transform duration-300 group-hover:scale-[1.03]"
        style={{
          background: isNsfwSection
            ? 'linear-gradient(135deg, #381b24 0%, #1f0f15 100%)'
            : 'linear-gradient(135deg, #fcedf1 0%, #f4dce2 100%)',
          border: `1.2px solid ${isNsfwSection ? 'rgba(148, 80, 96, 0.8)' : 'rgba(216, 164, 174, 0.85)'}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {char.imageUrl ? (
          <img
            src={char.imageUrl}
            alt={char.name}
            className="w-full h-full object-cover rounded-[2px]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center select-none">
            <span className="text-sm opacity-75" style={{ color: theme.vineColor }}>
              ❦
            </span>
            <span
              className="text-[0.52rem] uppercase tracking-wider opacity-65 font-medium"
              style={{ color: theme.vineColor, fontFamily: 'var(--font-serif)' }}
            >
              RM
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
};

/* =========================================================================
   CHARACTER DETAIL VIEW (Modal / Folio Sheet)
   Revealed only upon user tap/click.
   Contains:
   - large character name
   - complete intro
   - complete tags
   - complete "tóm sờ tắt" / lore
   - character image
   - like button & count
   - comments interactive section
   - Plot & GGAI buttons
   ========================================================================= */
interface NaomiCharacterDetailModalProps {
  char: CharacterEntry | null;
  onClose: () => void;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (charId: string) => void;
  comments: CharacterComment[];
  onAddComment: (charId: string, nickname: string, commentText: string) => Promise<boolean | void> | void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  isNsfwSection: boolean;
}

const NaomiCharacterDetailModal: React.FC<NaomiCharacterDetailModalProps> = ({
  char,
  onClose,
  isLiked,
  likeCount,
  onToggleLike,
  comments,
  onAddComment,
  selectedTags,
  onToggleTag,
  isNsfwSection,
}) => {
  const [nickname, setNickname] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sylvester Vance Password Verification
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!char) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [char, onClose]);

  if (!char) return null;

  const charId = getCharacterId(char);
  const theme = getCharacterTheme(isNsfwSection, 0);

  const hasFullPlot = Boolean(
    char.fullPlotUrl && char.fullPlotUrl.trim() !== '' && char.fullPlotUrl.trim() !== '.'
  );
  const hasGgai = Boolean(char.ggaiUrl && char.ggaiUrl.trim() !== '');
  const hasMultipleLinks = Boolean(char.bgUrl && char.blUrl);
  const showFindHimButton = hasGgai || char.type === 'CHARACTER';

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedNick = nickname.trim();
    const trimmedComment = commentText.trim();

    if (!trimmedNick) {
      setErrorMsg('bbi đừng quên đặt cho mình một cái tên nha ♡');
      return;
    }
    if (!trimmedComment) {
      setErrorMsg('hãy nói gì đó về em bé này nhé ♡');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await onAddComment(charId, trimmedNick, trimmedComment);
      setCommentText('');
    } catch {
      setErrorMsg('Không thể gửi bình luận, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24 }}
        onClick={onClose}
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        style={{
          backgroundColor: isNsfwSection ? 'rgba(18, 9, 13, 0.65)' : 'rgba(42, 22, 28, 0.45)',
          backdropFilter: 'blur(3px)',
        }}
      >
        {/* Detail Sheet Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto p-4 sm:p-7 select-none my-auto"
          style={{
            borderRadius: '5px 7px 5px 7px',
            background: theme.modalBg,
            border: `1.5px solid ${theme.hoverBorder}`,
            boxShadow: isNsfwSection
              ? '0 26px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(182, 98, 118, 0.4)'
              : '0 24px 64px rgba(62, 28, 38, 0.22), 0 0 0 1px rgba(235, 180, 192, 0.5), inset 0 0 32px rgba(255, 235, 240, 0.75)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết nhân vật ${char.name}`}
        >
          {/* Inner Dashed Manuscript Rule */}
          <div
            className="absolute inset-[6px] pointer-events-none rounded-[4px]"
            style={{ border: `1px dashed ${theme.innerBorder}` }}
          />

          {/* 4 Delicate Botanical Corner Accents */}
          <div className="absolute top-1.5 left-1.5 pointer-events-none">
            <CardCornerBotanical
              position="top-left"
              vineColor={theme.vineColor}
              flowerColor={theme.flowerColor}
              accentDot={theme.accentDot}
            />
          </div>
          <div className="absolute top-1.5 right-1.5 pointer-events-none">
            <CardCornerBotanical
              position="top-right"
              vineColor={theme.vineColor}
              flowerColor={theme.flowerColor}
              accentDot={theme.accentDot}
            />
          </div>

          {/* Top Bar: Close button & Header Plate */}
          <div className="relative z-20 flex items-center justify-between pb-3 mb-3 border-b border-dashed" style={{ borderColor: theme.innerBorder }}>
            <span
              className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.22em] font-medium"
              style={{ fontFamily: 'var(--font-serif)', color: theme.vineColor }}
            >
              ❦ RỪNG MỘNG ARCHIVE · DOSSIER COMPLETE
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1 hover:brightness-110 focus:outline-none"
              style={{
                fontFamily: 'var(--font-serif)',
                borderRadius: '3px',
                background: theme.tagBg,
                border: `1px solid ${theme.border}`,
                color: theme.tagText,
              }}
            >
              <span>✕</span>
              <span>đóng</span>
            </button>
          </div>

          {/* Main Title & Portrait Area */}
          <div className="relative z-10 text-center space-y-2 mb-4">
            <h2
              className="text-xl sm:text-2xl font-bold tracking-wide leading-snug"
              style={{ fontFamily: 'var(--font-whimsical)', color: theme.nameColor }}
            >
              {char.name}
            </h2>

            {char.title && char.title !== char.intro && (
              <p
                className="text-[0.84rem] sm:text-[0.92rem] font-medium tracking-wide max-w-lg mx-auto"
                style={{ fontFamily: 'var(--font-whimsical)', color: theme.nameColor }}
              >
                {char.title}
              </p>
            )}

            {char.intro && (
              <p
                className="text-[0.85rem] sm:text-[0.92rem] italic leading-relaxed max-w-lg mx-auto"
                style={{ fontFamily: 'var(--font-serif)', color: theme.introColor }}
              >
                &ldquo;{char.intro}&rdquo;
              </p>
            )}

            {char.quote && (
              <p
                className="text-[0.82rem] sm:text-[0.88rem] italic leading-relaxed max-w-lg mx-auto px-4 py-1.5 rounded-[3px] border"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: theme.nameColor,
                  background: isNsfwSection ? 'rgba(54, 27, 36, 0.5)' : 'rgba(255, 240, 244, 0.6)',
                  borderColor: theme.innerBorder,
                }}
              >
                &ldquo;{char.quote}&rdquo;
              </p>
            )}

            {/* Character Image in Detail View (Proportional, Vintage Frame) */}
            {char.imageUrl && (
              <div
                className="max-w-[240px] sm:max-w-[280px] mx-auto my-3.5 p-1.5 rounded-[4px] overflow-hidden shadow-md"
                style={{
                  background: isNsfwSection
                    ? 'linear-gradient(145deg, #361b24 0%, #1e0e14 100%)'
                    : 'linear-gradient(145deg, #fcedf1 0%, #f4dce2 100%)',
                  border: `1.5px solid ${theme.hoverBorder}`,
                }}
              >
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  className="w-full h-auto object-cover rounded-[2px]"
                />
              </div>
            )}

            {/* Complete Tags */}
            {char.tags && char.tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
                {char.tags.map((tag, tIdx) => {
                  const lowerTag = tag.trim().toLowerCase();
                  const isTagActive = selectedTags.includes(lowerTag);
                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => onToggleTag(lowerTag)}
                      className="px-2.5 py-0.5 text-[0.7rem] sm:text-[0.74rem] lowercase tracking-wide transition-all cursor-pointer flex items-center gap-1 focus:outline-none"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '2px',
                        background: isTagActive
                          ? isNsfwSection
                            ? 'linear-gradient(145deg, #7a3848 0%, #592532 100%)'
                            : 'linear-gradient(145deg, #ead0d6 0%, #d8b0b8 100%)'
                          : theme.tagBg,
                        color: isTagActive ? '#fff' : theme.tagText,
                        fontWeight: isTagActive ? 600 : 400,
                        border: `1px solid ${isTagActive ? 'rgba(210, 138, 154, 0.9)' : theme.tagBorder}`,
                      }}
                    >
                      <span className="text-[0.52rem] opacity-75">
                        {isTagActive ? '✦' : '·'}
                      </span>
                      <span>{lowerTag}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Complete Summary / Character Note ("tóm sờ tắt") */}
          {char.characterNote && (
            <div
              className="relative z-10 my-4 p-3.5 sm:p-4 text-xs sm:text-[0.82rem] leading-relaxed rounded-[3px] border shadow-2xs"
              style={{
                fontFamily: 'var(--font-serif)',
                background: isNsfwSection
                  ? 'linear-gradient(135deg, #321922 0%, #221017 100%)'
                  : 'linear-gradient(135deg, #fffcfb 0%, #faedf0 100%)',
                borderColor: theme.innerBorder,
                color: isNsfwSection ? '#f5d6dc' : '#542d36',
              }}
            >
              <div
                className="flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] font-semibold mb-1.5"
                style={{ color: theme.vineColor }}
              >
                <span>❦</span>
                <span>tóm sờ tắt từ sốp:</span>
              </div>
              <p className="whitespace-pre-line text-left leading-relaxed">
                {char.characterNote}
              </p>
            </div>
          )}

          {/* Clean Action Buttons: Plot + GGAI (Shown ONLY inside Detail View) */}
          <div
            className="relative z-10 pt-3 pb-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 border-t border-b border-dashed"
            style={{ borderColor: theme.innerBorder }}
          >
            {hasMultipleLinks ? (
              <>
                {char.bgUrl && (
                  <a
                    href={char.bgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                      background: theme.secondaryBtnBg,
                      border: `1px solid ${theme.secondaryBtnBorder}`,
                      color: theme.secondaryBtnText,
                    }}
                  >
                    <span className="text-[0.65rem]">✿</span>
                    <span>bg ♡</span>
                  </a>
                )}
                {char.blUrl && (
                  <a
                    href={char.blUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                      background: theme.primaryBtnBg,
                      border: `1px solid ${theme.primaryBtnBorder}`,
                      color: theme.primaryBtnText,
                    }}
                  >
                    <span className="text-[0.65rem]">✦</span>
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
                  className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '3px',
                    background: theme.primaryBtnBg,
                    border: `1px solid ${theme.primaryBtnBorder}`,
                    color: theme.primaryBtnText,
                  }}
                >
                  <span className="text-[0.65rem]">❦</span>
                  <span>find them ♡</span>
                </a>
              )
            ) : char.type === 'OPEN WORLD' ? (
              hasGgai && (
                <a
                  href={char.ggaiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '3px',
                    background: theme.primaryBtnBg,
                    border: `1px solid ${theme.primaryBtnBorder}`,
                    color: theme.primaryBtnText,
                  }}
                >
                  <span className="text-[0.65rem]">✦</span>
                  <span>{char.buttonText || 'open ur world ↗'}</span>
                </a>
              )
            ) : (
              <>
                {hasFullPlot && (
                  <a
                    href={char.fullPlotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '3px',
                      background: theme.secondaryBtnBg,
                      border: `1px solid ${theme.secondaryBtnBorder}`,
                      color: theme.secondaryBtnText,
                    }}
                  >
                    <span className="text-[0.62rem]">❀</span>
                    <span>full plot ↗</span>
                  </a>
                )}

                {showFindHimButton &&
                  (hasGgai ? (
                    char.id === 'sylvester-vance' ? (
                      <button
                        type="button"
                        onClick={() => setIsPasswordPromptOpen(true)}
                        className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          borderRadius: '3px',
                          background: theme.primaryBtnBg,
                          border: `1px solid ${theme.primaryBtnBorder}`,
                          color: theme.primaryBtnText,
                        }}
                      >
                        <span className="text-[0.62rem]">❦</span>
                        <span>find him ♡</span>
                      </button>
                    ) : (
                      <a
                        href={char.ggaiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          borderRadius: '3px',
                          background: theme.primaryBtnBg,
                          border: `1px solid ${theme.primaryBtnBorder}`,
                          color: theme.primaryBtnText,
                        }}
                      >
                        <span className="text-[0.62rem]">❦</span>
                        <span>find him ♡</span>
                      </a>
                    )
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                        background: theme.primaryBtnBg,
                        border: `1px solid ${theme.primaryBtnBorder}`,
                        color: theme.primaryBtnText,
                      }}
                    >
                      <span className="text-[0.62rem]">❦</span>
                      <span>find him ♡</span>
                    </button>
                  ))}
              </>
            )}

            {/* Like Button in Detail */}
            <button
              type="button"
              onClick={() => onToggleLike(charId)}
              className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.09em] transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 cursor-pointer"
              style={{
                fontFamily: 'var(--font-serif)',
                borderRadius: '3px',
                background: isLiked
                  ? isNsfwSection
                    ? 'rgba(96, 38, 52, 0.9)'
                    : 'rgba(250, 216, 224, 0.95)'
                  : theme.secondaryBtnBg,
                border: `1px solid ${isLiked ? 'rgba(216, 120, 138, 0.9)' : theme.secondaryBtnBorder}`,
                color: isLiked ? '#e05876' : theme.secondaryBtnText,
              }}
            >
              <span className="text-sm leading-none">{isLiked ? '♥' : '♡'}</span>
              <span>{likeCount} lượt thích</span>
            </button>
          </div>

          {/* Password Prompt for Sylvester Vance */}
          <AnimatePresence>
            {isPasswordPromptOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3.5 text-center border rounded-[3px]"
                style={{
                  background: isNsfwSection ? 'rgba(45, 22, 30, 0.9)' : '#fcf6ec',
                  borderColor: isNsfwSection ? 'rgba(152, 82, 100, 0.8)' : '#c8ab84',
                }}
              >
                <h4 className="text-sm font-medium mb-1" style={{ color: theme.nameColor }}>
                  tên gọi viết tắt của Sylvester?
                </h4>
                {!isUnlocked ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (passwordInput.trim().toLowerCase() === 'syl') {
                        setIsUnlocked(true);
                        setPasswordError(null);
                      } else {
                        setAttempts((prev) => prev + 1);
                        setPasswordError('ô nooooo, sai mất rồi !! thử lại nhé.');
                      }
                    }}
                    className="space-y-2 mt-2"
                  >
                    <input
                      type="text"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="nhập đáp án..."
                      className="px-3 py-1.5 text-xs text-center border rounded w-full max-w-xs mx-auto block"
                      style={{
                        background: '#fff',
                        borderColor: theme.border,
                        color: '#333',
                      }}
                    />
                    {passwordError && (
                      <p className="text-[0.72rem] text-rose-600 italic">{passwordError}</p>
                    )}
                    {attempts >= 2 && (
                      <p className="text-[0.7rem] opacity-80 italic">
                        gợi ý: 3 chữ cái đầu tiên trong tên của ảnh nha (s**)
                      </p>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-1 text-xs uppercase tracking-wider font-medium text-white rounded"
                      style={{ background: theme.vineColor }}
                    >
                      xác nhận
                    </button>
                  </form>
                ) : (
                  <div className="space-y-2 mt-2">
                    <p className="text-xs text-emerald-700 font-medium">dễ mà đúng hơm, kekekekek (๑˃ᴗ˂)ﻭ</p>
                    <a
                      href={char.ggaiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-1.5 text-xs uppercase tracking-wider font-semibold text-white rounded"
                      style={{ background: '#4a6b46' }}
                    >
                      find him again ↗
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Comments Section */}
          <div className="relative z-10 mt-5 pt-2 text-left">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[0.72rem] sm:text-[0.78rem] uppercase tracking-[0.16em] font-medium"
                style={{ fontFamily: 'var(--font-serif)', color: theme.vineColor }}
              >
                lời nhắn gửi gắm cho bé ({comments.length})
              </span>
            </div>

            {/* List of Existing Comments */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-3.5">
              {comments.length === 0 ? (
                <p
                  className="text-xs italic py-2 text-center opacity-75"
                  style={{ fontFamily: 'var(--font-serif)', color: theme.introColor }}
                >
                  chưa có lời nhắn nào, hãy là người đầu tiên để lại lời nhắn cho bé nha ♡
                </p>
              ) : (
                comments.map((c, cIdx) => (
                  <div
                    key={c.id || cIdx}
                    className="p-2 sm:p-2.5 rounded-[3px] border"
                    style={{
                      background: isNsfwSection ? 'rgba(38, 20, 27, 0.7)' : 'rgba(255, 252, 250, 0.85)',
                      borderColor: theme.innerBorder,
                    }}
                  >
                    <div className="flex items-center justify-between text-[0.66rem] mb-1 opacity-80">
                      <span className="font-semibold flex items-center gap-1" style={{ color: theme.nameColor }}>
                        <span>{BOTANICAL_ICONS[c.iconIndex % BOTANICAL_ICONS.length]}</span>
                        <span>{c.nickname}</span>
                      </span>
                      <span style={{ color: theme.vineColor }}>{formatRelativeTime(c.timestamp)}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: theme.introColor }}>
                      {c.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* New Comment Submission Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2 pt-2 border-t border-dotted" style={{ borderColor: theme.innerBorder }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="bbi tên là gì nè..."
                  className="px-3 py-1.5 text-xs border rounded-[3px] focus:outline-none"
                  style={{
                    background: isNsfwSection ? 'rgba(32, 16, 22, 0.85)' : '#ffffff',
                    borderColor: theme.border,
                    color: theme.nameColor,
                  }}
                />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="để lại lời nhắn cho bé ♡"
                  className="sm:col-span-2 px-3 py-1.5 text-xs border rounded-[3px] focus:outline-none"
                  style={{
                    background: isNsfwSection ? 'rgba(32, 16, 22, 0.85)' : '#ffffff',
                    borderColor: theme.border,
                    color: theme.nameColor,
                  }}
                />
              </div>

              {errorMsg && (
                <p className="text-[0.72rem] text-rose-500 italic">{errorMsg}</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 text-xs uppercase tracking-wider font-medium cursor-pointer transition-all hover:brightness-105 disabled:opacity-50"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '3px',
                    background: theme.primaryBtnBg,
                    border: `1px solid ${theme.primaryBtnBorder}`,
                    color: theme.primaryBtnText,
                  }}
                >
                  {isSubmitting ? 'đang gửi...' : 'gửi lời nhắn ❦'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* =========================================================================
   EMPTY STATE NOTE
   ========================================================================= */
const NaomiEmptyForestNote: React.FC<{ isNsfwSection: boolean }> = ({ isNsfwSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 max-w-lg mx-auto my-8 px-6 sm:px-10 py-8 text-center overflow-hidden"
      style={{
        borderRadius: '4px',
        background: isNsfwSection
          ? 'linear-gradient(155deg, #2b1920 0%, #221419 55%, #190f13 100%)'
          : 'linear-gradient(155deg, #fef8f4 0%, #f7edf2 55%, #f1dedc 100%)',
        border: isNsfwSection ? '1.5px solid rgba(126, 72, 86, 0.75)' : '1.5px solid rgba(198, 150, 140, 0.78)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
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

/* =========================================================================
   MAIN COMPONENT: NaomiCharacterArchive
   ========================================================================= */
export const NaomiCharacterArchive: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingCategory, setRatingCategory] = useState<'sfw' | 'nsfw'>('sfw');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterEntry | null>(null);

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

  // Globally shared persistent like counts (starts from 0 for all characters)
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  // Globally shared persistent comments (starts from 0 comments for all characters)
  const [commentsByChar, setCommentsByChar] = useState<Record<string, CharacterComment[]>>({});

  const likingInFlightRef = useRef<Set<string>>(new Set());

  // Fetch latest shared data and connect to real-time SSE stream
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await fetchRungMongData();
        if (isMounted) {
          if (data.likes) setLikeCounts(data.likes);
          if (data.comments) setCommentsByChar(data.comments);
        }
      } catch (err) {
        console.error('Failed to load shared Rừng Mộng data from server:', err);
      }
    }

    loadData();

    // Subscribe to real-time SSE broadcast updates
    const unsubscribe = subscribeRungMongUpdates((event) => {
      if (!isMounted) return;
      if (event.type === 'like_update') {
        setLikeCounts((prev) => ({
          ...prev,
          [event.characterId]: event.likeCount,
        }));
      } else if (event.type === 'new_comment') {
        setCommentsByChar((prev) => {
          const list = prev[event.characterId] || [];
          if (list.some((c) => c.id === event.comment.id)) return prev;
          return {
            ...prev,
            [event.characterId]: [...list, event.comment],
          };
        });
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

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

  const handleToggleLike = useCallback(
    async (charId: string) => {
      if (likingInFlightRef.current.has(charId)) return;
      likingInFlightRef.current.add(charId);

      const isCurrentlyLiked = likedChars.includes(charId);
      const action = isCurrentlyLiked ? 'unlike' : 'like';

      const nextLiked = isCurrentlyLiked
        ? likedChars.filter((id) => id !== charId)
        : [...likedChars, charId];

      setLikedChars(nextLiked);
      try {
        window.localStorage.setItem(LIKED_CHARS_STORAGE_KEY, JSON.stringify(nextLiked));
      } catch {}

      setLikeCounts((prev) => {
        const current = prev[charId] || 0;
        return {
          ...prev,
          [charId]: Math.max(0, current + (isCurrentlyLiked ? -1 : 1)),
        };
      });

      try {
        const res = await toggleLikeApi(charId, action);
        if (res && typeof res.likeCount === 'number') {
          setLikeCounts((prev) => ({
            ...prev,
            [charId]: res.likeCount,
          }));
        }
      } catch (err) {
        console.error('Like toggle error, reverting:', err);
        setLikedChars((prev) =>
          isCurrentlyLiked ? [...prev, charId] : prev.filter((id) => id !== charId)
        );
        setLikeCounts((prev) => {
          const current = prev[charId] || 0;
          return {
            ...prev,
            [charId]: Math.max(0, current + (isCurrentlyLiked ? 1 : -1)),
          };
        });
      } finally {
        likingInFlightRef.current.delete(charId);
      }
    },
    [likedChars]
  );

  const handleAddComment = useCallback(
    async (charId: string, nickname: string, commentText: string) => {
      const res = await submitCommentApi(charId, nickname, commentText);
      if (res && res.comment) {
        setCommentsByChar((prev) => {
          const list = prev[charId] || [];
          if (list.some((c) => c.id === res.comment.id)) return prev;
          return {
            ...prev,
            [charId]: [...list, res.comment],
          };
        });
      }
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

  const isNsfw = ratingCategory === 'nsfw';

  return (
    <section
      ref={sectionRef}
      className="relative w-full mx-auto py-3 sm:py-5 select-none overflow-visible"
    >
      {/* 16:9 Atmospheric Video Frame */}
      <div className="relative z-20 max-w-2xl mx-auto mb-6 px-2 sm:px-4">
        <div
          className="relative overflow-hidden p-2 sm:p-2.5 transition-all duration-700"
          style={{
            borderRadius: '4px',
            background: isNsfw
              ? 'linear-gradient(145deg, #2e1a21 0%, #1f1116 100%)'
              : 'linear-gradient(145deg, #fef6ec 0%, #f1decb 100%)',
            border: isNsfw ? '1.2px solid rgba(142, 78, 94, 0.85)' : '1.2px solid rgba(198, 150, 134, 0.85)',
            boxShadow: isNsfw
              ? '0 10px 30px rgba(0,0,0,0.35)'
              : '0 8px 24px rgba(62, 38, 44, 0.1)',
          }}
        >
          <div
            className="absolute inset-1 pointer-events-none z-10"
            style={{
              border: isNsfw ? '0.8px dashed rgba(142, 78, 94, 0.5)' : '0.8px dashed rgba(188, 138, 122, 0.5)',
            }}
          />

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

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isNsfw
                  ? 'radial-gradient(circle, transparent 50%, rgba(20, 10, 14, 0.65) 100%)'
                  : 'radial-gradient(circle, transparent 55%, rgba(62, 30, 38, 0.22) 100%)',
              }}
            />
          </div>

          <div
            className="mt-1.5 text-center text-[0.6rem] uppercase tracking-[0.22em] italic"
            style={{
              fontFamily: 'var(--font-serif)',
              color: isNsfw ? '#c78292' : '#8c525f',
            }}
          >
            {isNsfw ? '❦ nox arcana · vầng trăng và nhung đỏ ❦' : '❦ hortus diurnus · nắng sớm qua vòm lá ❦'}
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="relative z-20 max-w-3xl mx-auto mb-5 sm:mb-7 px-1 sm:px-3 space-y-3 sm:space-y-4">
        {/* Search Field */}
        <div className="relative max-w-md mx-auto">
          <div
            className="relative flex items-center px-3 py-1.5 transition-all duration-300"
            style={{
              borderRadius: '3px',
              background: isNsfw
                ? 'linear-gradient(155deg, #2e1a21 0%, #221419 100%)'
                : 'linear-gradient(155deg, #fef8f4 0%, #f1ded5 100%)',
              border: isNsfw ? '1px solid rgba(142, 78, 94, 0.8)' : '1px solid rgba(198, 150, 134, 0.8)',
            }}
          >
            <span className="text-xs mr-2 opacity-75" style={{ color: isNsfw ? '#c78292' : '#8c525f' }}>
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="tìm kiếm nhân vật trong rừng mộng..."
              className="w-full bg-transparent text-xs sm:text-sm focus:outline-none placeholder:italic"
              style={{
                fontFamily: 'var(--font-serif)',
                color: isNsfw ? '#ffe0e6' : '#4a252f',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs px-1.5 py-0.5 opacity-65 hover:opacity-100 cursor-pointer"
                style={{ color: isNsfw ? '#c78292' : '#8c525f' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Folio Tabs: SFW vs NSFW */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={() => setRatingCategory('sfw')}
            className="px-4 py-1.5 text-xs sm:text-sm lowercase tracking-[0.12em] transition-all duration-300 cursor-pointer flex items-center gap-1.5 hover:-translate-y-0.5 focus:outline-none"
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
                  ? '0 3px 10px rgba(188, 114, 130, 0.22)'
                  : 'none',
            }}
          >
            <span className="text-[0.72rem]">🌱</span>
            <span>FOLIO I · sfw (ánh dương)</span>
            {ratingCategory === 'sfw' && <span className="text-[0.62rem] text-[#b36778]">❦</span>}
          </button>

          <button
            type="button"
            onClick={() => setRatingCategory('nsfw')}
            className="px-4 py-1.5 text-xs sm:text-sm lowercase tracking-[0.12em] transition-all duration-300 cursor-pointer flex items-center gap-1.5 hover:-translate-y-0.5 focus:outline-none"
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
                  ? '0 3px 10px rgba(0,0,0,0.3)'
                  : 'none',
            }}
          >
            <span className="text-[0.72rem]">🍄</span>
            <span>FOLIO II · nsfw (bóng đêm)</span>
            {ratingCategory === 'nsfw' && <span className="text-[0.62rem] text-[#ff8da5]">❦</span>}
          </button>
        </div>

        {/* Keyword Filter Tags */}
        {availableKeywordTags.length > 0 && (
          <div
            className="relative px-3 py-2 sm:px-4 sm:py-2.5"
            style={{
              borderRadius: '3px',
              background: isNsfw ? 'rgba(36, 20, 26, 0.8)' : 'rgba(254, 248, 246, 0.85)',
              border: isNsfw ? '1px dashed rgba(126, 72, 86, 0.6)' : '1px dashed rgba(198, 150, 134, 0.65)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {availableKeywordTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleKeywordTag(tag)}
                    className="px-2 py-0.5 text-[0.68rem] sm:text-[0.72rem] lowercase tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1 focus:outline-none"
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
                    <span className="text-[0.52rem] opacity-75">
                      {isSelected ? '✦' : '·'}
                    </span>
                    <span>{tag}</span>
                  </button>
                );
              })}

              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearKeywordFilters}
                  className="px-2 py-0.5 text-[0.68rem] italic tracking-wide cursor-pointer transition-all hover:opacity-100 opacity-80"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: isNsfw ? '#ffd1db' : '#8c4856',
                  }}
                >
                  ✕ xoá lọc
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          NEW COMPACT CHARACTER ARCHIVE LIST (Single Column Vertical Flow)
          Replaces the old giant multi-column vertical cards.
         ===================================================================== */}
      <AnimatePresence mode="wait">
        {filteredCharacters.length === 0 ? (
          <NaomiEmptyForestNote key="empty-forest-note" isNsfwSection={isNsfw} />
        ) : (
          <motion.div
            key={`${ratingCategory}-${selectedTags.join(',')}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 max-w-3xl sm:max-w-4xl mx-auto flex flex-col gap-2.5 sm:gap-3 px-1 sm:px-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredCharacters.map((char, index) => {
                const charId = getCharacterId(char);
                const isLiked = likedChars.includes(charId);
                const likeCount = likeCounts[charId] || 0;
                const comments = commentsByChar[charId] || [];

                return (
                  <NaomiCompactCharacterRow
                    key={charId}
                    char={char}
                    index={index}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    onToggleLike={handleToggleLike}
                    selectedTags={selectedTags}
                    onToggleTag={handleToggleKeywordTag}
                    commentsCount={comments.length}
                    onSelectCharacter={(selected) => setSelectedCharacter(selected)}
                    isNsfwSection={isNsfw}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          CHARACTER DETAIL VIEW (Opens upon click / tap)
         ===================================================================== */}
      {selectedCharacter && (
        <NaomiCharacterDetailModal
          char={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          isLiked={likedChars.includes(getCharacterId(selectedCharacter))}
          likeCount={likeCounts[getCharacterId(selectedCharacter)] || 0}
          onToggleLike={handleToggleLike}
          comments={commentsByChar[getCharacterId(selectedCharacter)] || []}
          onAddComment={handleAddComment}
          selectedTags={selectedTags}
          onToggleTag={handleToggleKeywordTag}
          isNsfwSection={isNsfw}
        />
      )}
    </section>
  );
};
