import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { musicLibrary, MusicTrack } from '../../../data/musicLibrary';

/**
 * Extracts YouTube Video ID from various URL formats (youtu.be, watch?v=, embed, etc.)
 */
function extractYouTubeId(url: string): string {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}

export const NaomiMusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Automatically start playing upon entering Rừng Mộng
  const [volume, setVolume] = useState(70);
  const [isExpanded, setIsExpanded] = useState(false);

  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const currentTrack: MusicTrack = musicLibrary[currentTrackIndex] || musicLibrary[0];
  const videoId = extractYouTubeId(currentTrack.youtubeUrl);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % musicLibrary.length);
    setIsPlaying(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + musicLibrary.length) % musicLibrary.length);
    setIsPlaying(true);
  }, []);

  return (
    <div className="relative">
      {/* Compact Antique Music Plaque (Top Right) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center"
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isPlaying ? 'Đang phát nhạc rừng mộng' : 'Mở máy phát nhạc'}
          aria-label="Toggle Forest Music Player"
          className="group relative flex items-center gap-2 px-3 py-1.5 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none"
          style={{
            borderRadius: '3px',
            background: isPlaying
              ? 'linear-gradient(145deg, #fbf4e4 0%, #eeddc2 100%)'
              : 'linear-gradient(145deg, #faf5e9 0%, #efe4cf 100%)',
            border: isPlaying
              ? '1px solid rgba(174, 136, 86, 0.88)'
              : '1px solid rgba(182, 152, 114, 0.72)',
            boxShadow: isPlaying
              ? '0 4px 14px rgba(74, 52, 28, 0.14), inset 0 0 10px rgba(255, 244, 215, 0.8)'
              : '0 3px 10px rgba(64, 46, 28, 0.08)',
          }}
        >
          {/* Antique Musical Clef Ornament */}
          <span className="relative flex items-center justify-center text-sm sm:text-base text-[#6d5134]">
            <span className={isPlaying ? 'animate-pulse' : ''}>𝄞</span>
            {isPlaying && (
              <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-[#c98a4b] animate-ping" />
            )}
          </span>

          <div className="text-left hidden sm:block">
            <span
              className="block text-[0.58rem] uppercase tracking-[0.18em] text-[#84694a]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              carmen horti
            </span>
            <span
              className="block text-[0.76rem] text-[#3a2a1b] italic tracking-[0.03em] max-w-[105px] truncate"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {currentTrack.title ? currentTrack.title : 'chọn bài hát...'}
            </span>
          </div>

          {/* Quick Play/Pause Engraved Tab */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="w-6 h-6 bg-[#fcf8ee] border border-[#c8ab84] flex items-center justify-center text-[0.68rem] text-[#523d28] hover:bg-[#f2e5ce] transition-colors ml-0.5"
            style={{ borderRadius: '2px' }}
          >
            {isPlaying ? '⏸' : '▶'}
          </span>
        </button>
      </motion.div>

      {/* Expanded Illuminated Manuscript Music Folio */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-12 right-0 z-40 w-80 p-5 text-[#2c2016]"
            style={{
              borderRadius: '4px 6px 4px 6px',
              background:
                'linear-gradient(155deg, #fcf8ef 0%, #f4ead6 55%, #ebdec6 100%)',
              border: '1.5px solid rgba(176, 144, 98, 0.85)',
              boxShadow:
                '0 18px 44px rgba(48, 34, 20, 0.24), inset 0 0 24px rgba(246, 228, 192, 0.65)',
            }}
          >
            {/* Inner Double Rule */}
            <div
              className="absolute inset-2 pointer-events-none"
              style={{ border: '0.8px dashed rgba(178, 146, 102, 0.48)' }}
            />

            {/* Header with Title & Close */}
            <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-[#cfb590]">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#8f6d43]">❦</span>
                <span
                  className="text-[0.68rem] uppercase tracking-[0.18em] text-[#6e5539] font-medium"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  bản nhạc khu vườn cổ
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="w-6 h-6 flex items-center justify-center text-[#6e563d] hover:bg-[#e8d8be] border border-[#c8ab84] text-xs transition-colors cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                ✕
              </button>
            </div>

            {/* Currently Playing Track Info */}
            <div
              className="relative z-10 my-3.5 text-center p-3.5 bg-[#fdfaf2]/90 border border-[#d6bc98]"
              style={{ borderRadius: '3px' }}
            >
              <span
                className="text-[0.62rem] uppercase tracking-[0.2em] text-[#8c7050] block"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                ♫ đang ngân vang
              </span>
              <h4
                className="text-base sm:text-lg text-[#342416] font-normal tracking-[0.06em] mt-1 capitalize"
                style={{ fontFamily: 'var(--font-whimsical)' }}
              >
                {currentTrack.title ? currentTrack.title : '(chưa đặt tên bài hát)'}
              </h4>
            </div>

            {/* Playback Controls: Engraved Plaques */}
            <div className="relative z-10 flex items-center justify-center gap-3.5 my-3">
              <button
                type="button"
                onClick={handlePrev}
                title="Bài trước"
                className="w-8 h-8 bg-[#f8f0df] border border-[#c8ac84] flex items-center justify-center text-[#523e29] hover:bg-[#efe0c6] transition-colors cursor-pointer text-xs"
                style={{ borderRadius: '2px' }}
              >
                ⏮
              </button>

              <button
                type="button"
                onClick={handlePlayPause}
                title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
                className="w-11 h-9 bg-[#ead7b9] border border-[#b89668] flex items-center justify-center text-[#362617] hover:bg-[#dfc7a3] transition-all cursor-pointer text-sm shadow-2xs"
                style={{ borderRadius: '3px' }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Bài tiếp theo"
                className="w-8 h-8 bg-[#f8f0df] border border-[#c8ac84] flex items-center justify-center text-[#523e29] hover:bg-[#efe0c6] transition-colors cursor-pointer text-xs"
                style={{ borderRadius: '2px' }}
              >
                ⏭
              </button>
            </div>

            {/* Volume Control */}
            <div className="relative z-10 mt-3.5 pt-2.5 border-t border-[#cfb590] flex items-center gap-2.5">
              <span className="text-xs text-[#785e42]">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#9c794e] cursor-pointer h-1 bg-[#dcc6a6]"
              />
              <span className="text-[0.68rem] text-[#785e42] w-7 text-right" style={{ fontFamily: 'var(--font-serif)' }}>
                {volume}%
              </span>
            </div>

            {/* Playlist Track List Selection */}
            <div className="relative z-10 mt-3 pt-2.5 border-t border-[#cfb590] max-h-36 overflow-y-auto space-y-1 pr-1">
              <span
                className="block text-[0.62rem] uppercase tracking-[0.16em] text-[#7c6246] mb-1.5"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                mục lục bản nhạc ({musicLibrary.length}):
              </span>
              {musicLibrary.map((track, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    currentTrackIndex === idx
                      ? 'bg-[#e8d5b7] text-[#2b1d11] font-medium border border-[#b89668]'
                      : 'hover:bg-[#f4ead8] text-[#5c4732] border border-transparent'
                  }`}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '2px',
                  }}
                >
                  <span className="truncate">
                    {idx + 1}. {track.title || `bài hát ${idx + 1}`}
                  </span>
                  {currentTrackIndex === idx && isPlaying && <span className="text-[0.7rem] text-[#8c6b42]">♫</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden YouTube Iframe Embed for Reliable Audio Streaming */}
      {videoId && (
        <div className="hidden absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          <iframe
            ref={playerRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&loop=1&playlist=${videoId}`}
            title={currentTrack.title || 'YouTube audio stream'}
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};
