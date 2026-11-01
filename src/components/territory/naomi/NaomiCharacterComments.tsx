import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

export interface CharacterComment {
  id: string;
  characterName: string;
  nickname: string;
  comment: string;
  timestamp: number;
  iconIndex: number;
}

const BOTANICAL_ICONS = ['✿', '🍄', '🌿', '✦', '❀', '🦋', '🌱', '🌙'];

export function formatRelativeTime(timestamp: number): string {
  const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSeconds < 45) return 'vừa xong';
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} ngày trước`;
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

interface NaomiCharacterCommentsProps {
  characterName: string;
  comments: CharacterComment[];
  onAddComment: (characterName: string, nickname: string, commentText: string) => void;
  vineColor: string;
  flowerColor: string;
  innerBorder: string;
  glow: string;
}

export const NaomiCharacterComments: React.FC<NaomiCharacterCommentsProps> = ({
  characterName,
  comments,
  onAddComment,
  vineColor,
  flowerColor,
  innerBorder,
  glow,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [commentText, setCommentText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const scrollListRef = useRef<HTMLDivElement | null>(null);

  // Close panel on Escape key
  useEffect(() => {
    if (!isPanelOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

    onAddComment(characterName, trimmedNick, trimmedComment);
    setCommentText('');
    setErrorMsg('');

    // Smoothly scroll the internal comment list to the newest note
    window.setTimeout(() => {
      if (scrollListRef.current) {
        scrollListRef.current.scrollTo({
          top: scrollListRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  // Subtle manuscript slip tilts
  const noteTilts = [-0.4, 0.35, -0.25, 0.45];

  const commentCount = comments.length;

  return (
    <>
      {/* Compact Clickable Manuscript Marginalia Slip Trigger on Character Plate */}
      <div
        className="relative z-10 mt-3 pt-2.5 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderTop: `1px dotted ${innerBorder}`,
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPanelOpen(true);
            setErrorMsg('');
          }}
          className="group/note inline-flex items-center gap-1.5 px-3 py-1 text-[0.72rem] italic text-[#5e4a38] hover:text-[#2c1f14] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 focus:outline-none"
          style={{
            fontFamily: 'var(--font-serif)',
            borderRadius: '3px',
            background:
              commentCount > 0
                ? 'linear-gradient(145deg, #fbf6ea 0%, #efe1c9 100%)'
                : 'rgba(252, 248, 238, 0.78)',
            border: `1px dashed ${innerBorder}`,
            boxShadow: commentCount > 0 ? `0 2px 8px ${glow}` : 'none',
          }}
        >
          <span
            className="text-[0.64rem] transition-transform duration-300 group-hover/note:rotate-12"
            style={{ color: vineColor }}
            aria-hidden="true"
          >
            ❦
          </span>
          <span>
            {commentCount > 0
              ? `bé này đã nhận được ${commentCount} lời nhận xét ♡`
              : 'để lại lời nhắn cho bé ♡'}
          </span>
        </button>
      </div>

      {/* Illuminated Manuscript Comment Folio Modal rendered in a Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isPanelOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsPanelOpen(false)}
                className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
                style={{
                  backgroundColor: 'rgba(38, 26, 16, 0.42)',
                }}
              >
                {/* Delicate Thin Custom Scrollbar Scoped to Comment Panel */}
                <style>{`
                  .rm-comment-scroll::-webkit-scrollbar {
                    width: 4px;
                  }
                  .rm-comment-scroll::-webkit-scrollbar-track {
                    background: rgba(232, 218, 196, 0.4);
                  }
                  .rm-comment-scroll::-webkit-scrollbar-thumb {
                    background: rgba(172, 140, 98, 0.7);
                  }
                  .rm-comment-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(146, 114, 74, 0.9);
                  }
                `}</style>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="những lời nhắn để lại trong rừng ♡"
                  className="relative w-full max-w-md max-h-[85vh] flex flex-col p-4 sm:p-6 overflow-hidden select-none my-auto"
                  style={{
                    borderRadius: '4px 6px 4px 6px',
                    background:
                      'linear-gradient(155deg, #fcf8ef 0%, #f5ecdc 55%, #ebdec8 100%)',
                    border: '1.5px solid rgba(176, 144, 98, 0.85)',
                    boxShadow:
                      '0 24px 56px rgba(46, 32, 18, 0.28), 0 0 0 4px rgba(248, 239, 222, 0.4), inset 0 0 28px rgba(246, 228, 192, 0.75)',
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

                  {/* Inner Botanical Hairline Frame */}
                  <div
                    className="absolute inset-2 pointer-events-none"
                    style={{
                      border: '0.8px dashed rgba(178, 146, 102, 0.52)',
                    }}
                  />

                  {/* Tiny Corner Flowers & Leaves */}
                  <span
                    className="absolute top-3 left-3.5 text-xs pointer-events-none opacity-75"
                    style={{ color: vineColor }}
                    aria-hidden="true"
                  >
                    🌿
                  </span>
                  <span
                    className="absolute bottom-3 left-3.5 text-xs pointer-events-none opacity-70"
                    style={{ color: flowerColor }}
                    aria-hidden="true"
                  >
                    ✿
                  </span>
                  <span
                    className="absolute bottom-3 right-3.5 text-xs pointer-events-none opacity-70"
                    style={{ color: vineColor }}
                    aria-hidden="true"
                  >
                    ❦
                  </span>

                  {/* Close Plaque */}
                  <button
                    type="button"
                    onClick={() => setIsPanelOpen(false)}
                    aria-label="Đóng bảng lời nhắn"
                    className="absolute top-3.5 right-3.5 z-20 w-7 h-7 flex items-center justify-center text-xs text-[#6e563d] hover:text-[#2b1e12] bg-[#f8f0e0] hover:bg-[#efe2ca] border border-[#c8ac84] transition-all cursor-pointer"
                    style={{ borderRadius: '2px' }}
                  >
                    ✕
                  </button>

                  {/* Panel Header */}
                  <div className="relative z-10 text-center pb-2.5 border-b border-dashed border-[#cfb590] shrink-0">
                    <span
                      className="block text-[0.58rem] uppercase tracking-[0.22em] text-[#84694a] mb-0.5"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      MARGINALIA LECTORUM · LỜI GHI BÊN LỀ
                    </span>
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      <span className="text-[0.68rem]" style={{ color: vineColor }}>
                        ✿
                      </span>
                      <h4
                        className="text-sm sm:text-base text-[#362618] font-medium tracking-[0.04em]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        những lời nhắn để lại trong rừng ♡
                      </h4>
                      <span className="text-[0.68rem]" style={{ color: vineColor }}>
                        ✿
                      </span>
                    </div>
                    <p
                      className="text-xs text-[#745d46] italic lowercase tracking-[0.05em]"
                      style={{ fontFamily: 'var(--font-whimsical)' }}
                    >
                      dành cho {characterName}
                    </p>
                  </div>

                  {/* Fixed-Height Scrollable Comment List */}
                  <div className="relative z-10 my-2.5 flex-1 min-h-[130px] max-h-[205px] flex flex-col overflow-hidden">
                    <div
                      ref={scrollListRef}
                      className="rm-comment-scroll flex-1 overflow-y-auto px-1.5 py-2 space-y-2.5"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(172, 140, 98, 0.7) rgba(232, 218, 196, 0.4)',
                      }}
                    >
                      {comments.length === 0 ? (
                        <div className="h-full min-h-[110px] flex flex-col items-center justify-center text-center px-4 py-4">
                          <span className="text-sm mb-1 opacity-75">🌱</span>
                          <p
                            className="text-xs italic text-[#7c6650] leading-relaxed"
                            style={{ fontFamily: 'var(--font-serif)' }}
                          >
                            chưa có mảnh giấy nhỏ nào ở đây cả... bbi hãy là người đầu tiên để lại lời nhắn cho bé nha ♡
                          </p>
                        </div>
                      ) : (
                        comments.map((item, idx) => {
                          const tilt = noteTilts[idx % noteTilts.length];
                          const icon = BOTANICAL_ICONS[item.iconIndex % BOTANICAL_ICONS.length];

                          return (
                            <div
                              key={item.id}
                              className="relative px-3.5 py-2.5 text-left transition-transform duration-300"
                              style={{
                                borderRadius: '3px',
                                transform: `rotate(${tilt}deg)`,
                                background:
                                  'linear-gradient(145deg, #fdfaf2 0%, #f5ebd8 100%)',
                                border: '1px solid rgba(190, 162, 122, 0.75)',
                                boxShadow:
                                  '0 2px 8px rgba(64, 46, 28, 0.06), 2px 2px 0px rgba(226, 210, 184, 0.5)',
                              }}
                            >
                              <span
                                className="absolute top-1.5 right-2.5 text-[0.6rem] opacity-65 pointer-events-none"
                                style={{ color: vineColor }}
                                aria-hidden="true"
                              >
                                ❦
                              </span>

                              {/* Nickname + Botanical Icon */}
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span
                                  className="text-[0.88rem] text-[#362618] font-medium tracking-[0.03em] leading-tight"
                                  style={{ fontFamily: 'var(--font-whimsical)' }}
                                >
                                  {item.nickname}
                                </span>
                                <span
                                  className="text-[0.68rem] opacity-85"
                                  style={{ color: vineColor }}
                                  aria-hidden="true"
                                >
                                  {icon}
                                </span>
                              </div>

                              {/* Comment Text */}
                              <p
                                className="text-[0.78rem] text-[#4c3a29] leading-relaxed break-words select-text"
                                style={{ fontFamily: 'var(--font-serif)' }}
                              >
                                &ldquo;{item.comment}&rdquo;
                              </p>

                              {/* Small Relative Timestamp */}
                              <span
                                className="block mt-1 text-[0.62rem] italic text-[#846c54] tracking-[0.04em]"
                                style={{ fontFamily: 'var(--font-serif)' }}
                              >
                                {formatRelativeTime(item.timestamp)}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Compact Comment Input Form inside the Panel */}
                  <form
                    onSubmit={handleSubmit}
                    className="relative z-10 pt-2.5 border-t border-dashed border-[#cfb590] space-y-2 shrink-0 text-left"
                  >
                    <div>
                      <input
                        type="text"
                        required
                        value={nickname}
                        onChange={(e) => {
                          setNickname(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="đặt cho mình một cái tên..."
                        aria-label="nickname"
                        maxLength={40}
                        className="w-full px-3 py-1.5 text-xs text-[#38291d] placeholder:text-[#9c866d] placeholder:italic bg-[#fdfaf2] border border-[#c8ac84] focus:outline-none focus:border-[#8f6d43] transition-colors"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        required
                        value={commentText}
                        onChange={(e) => {
                          setCommentText(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="nói gì đó về em bé này..."
                        aria-label="comment"
                        maxLength={280}
                        className="w-full px-3 py-1.5 text-xs text-[#38291d] placeholder:text-[#9c866d] placeholder:italic bg-[#fdfaf2] border border-[#c8ac84] focus:outline-none focus:border-[#8f6d43] resize-none transition-colors"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>

                    {errorMsg && (
                      <p
                        className="text-[0.68rem] italic text-[#a84c5c]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {errorMsg}
                      </p>
                    )}

                    <div className="flex justify-end pt-0.5">
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-medium lowercase tracking-[0.08em] text-[#382616] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          borderRadius: '3px',
                          background: 'linear-gradient(145deg, #f3e4cb 0%, #e4cfa9 100%)',
                          border: '1px solid rgba(172, 138, 92, 0.85)',
                          boxShadow: `0 3px 10px rgba(64, 46, 28, 0.1)`,
                        }}
                      >
                        <span className="text-[0.65rem]" style={{ color: vineColor }}>
                          ❦
                        </span>
                        <span>gửi lời nhắn ♡</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
