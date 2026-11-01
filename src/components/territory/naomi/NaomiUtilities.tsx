import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NaomiMusicPlayer } from './NaomiMusicPlayer';

export const NaomiUtilities: React.FC = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  // Feedback Form State
  const [feedbackSender, setFeedbackSender] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setFeedbackSubmitted(true);
    window.setTimeout(() => {
      setFeedbackSubmitted(false);
      setShowFeedbackModal(false);
      setFeedbackSender('');
      setFeedbackMessage('');
    }, 1800);
  };

  return (
    <>
      {/* Top-Right Antique Storybook Ornaments & Engraved Plaques */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-2.5"
      >
        {/* 1. Compact Antique Music Plaque */}
        <NaomiMusicPlayer />

        {/* 2. Epistolary Feedback Wax-Seal Ornament */}
        <button
          type="button"
          onClick={() => setShowFeedbackModal(true)}
          title="Gửi thư tâm tình đến Naomi"
          aria-label="Send Feedback"
          className="group relative flex items-center justify-center w-9 h-9 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none"
          style={{
            borderRadius: '3px',
            background: 'linear-gradient(145deg, #fbf6ea 0%, #efe3ce 100%)',
            border: '1px solid rgba(178, 146, 102, 0.78)',
            boxShadow: '0 3px 10px rgba(64, 46, 28, 0.1)',
          }}
        >
          <span className="text-sm text-[#6a4e32] group-hover:scale-110 transition-transform">
            ✉
          </span>
        </button>

        {/* 3. "nuôi naomi" Antique-Gold Storybook Ornament */}
        <button
          type="button"
          onClick={() => setShowDonateModal(true)}
          title="Nuôi Naomi"
          aria-label="Nuôi Naomi"
          className="group relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none"
          style={{
            borderRadius: '3px',
            background: 'linear-gradient(145deg, #fbf3ef 0%, #eed8d4 100%)',
            border: '1px solid rgba(184, 134, 138, 0.85)',
            boxShadow:
              '0 3px 12px rgba(96, 56, 62, 0.12), inset 0 1px 0 rgba(255, 252, 248, 0.8)',
          }}
        >
          <span className="text-xs sm:text-sm text-[#a65464] group-hover:scale-115 transition-transform">
            ❦
          </span>
          <span
            className="text-[0.72rem] sm:text-xs tracking-[0.09em] text-[#59363d] font-medium lowercase"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            nuôi naomi ♡
          </span>
        </button>
      </motion.div>

      {/* FEEDBACK ILLUMINATED MANUSCRIPT MODAL */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFeedbackModal(false)}
              className="absolute inset-0 bg-[#24190f]/45"
            />

            {/* Manuscript Leaf Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md p-6 sm:p-8 text-[#2c2016] overflow-hidden"
              style={{
                borderRadius: '4px 6px 4px 6px',
                background:
                  'linear-gradient(155deg, #fcf8ef 0%, #f5ecdc 55%, #ebdec8 100%)',
                border: '1.5px solid rgba(176, 144, 98, 0.85)',
                boxShadow:
                  '0 24px 58px rgba(46, 32, 18, 0.28), 0 0 0 4px rgba(248, 239, 222, 0.4), inset 0 0 32px rgba(246, 228, 192, 0.7)',
              }}
            >
              {/* Inner Engraved Rule */}
              <div
                className="absolute inset-2.5 pointer-events-none"
                style={{ border: '0.8px dashed rgba(178, 146, 102, 0.48)' }}
              />

              {/* Close Plaque */}
              <button
                type="button"
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center text-[#6e563d] hover:text-[#2b1e12] bg-[#f8f0e0] hover:bg-[#efe2ca] border border-[#c8ac84] text-xs transition-colors cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                ✕
              </button>

              <div className="relative z-10 text-center mb-5">
                <span
                  className="block text-[0.62rem] uppercase tracking-[0.24em] text-[#84694a] mb-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  EPISTOLA AD CUSTODEM · THƯ TÂM TÌNH
                </span>
                <h3
                  className="text-xl sm:text-2xl lowercase tracking-[0.1em] font-normal text-[#342416] mt-0.5"
                  style={{ fontFamily: 'var(--font-whimsical)' }}
                >
                  gửi thư đến rừng mộng
                </h3>
                <p
                  className="text-xs text-[#6e5842] italic tracking-[0.04em] mt-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  chia sẻ cảm nghĩ, góp ý hoặc gửi một lời nhắn dịu dàng đến Naomi
                </p>
              </div>

              {feedbackSubmitted ? (
                <div className="relative z-10 py-8 text-center flex flex-col items-center">
                  <span className="text-2xl mb-2 text-[#9c636e]">❦</span>
                  <p
                    className="text-base text-[#3b2c1e] italic"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    thư đã được gió cuốn gửi vào rừng mộng ❀
                  </p>
                  <p className="text-xs text-[#7c654d] mt-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    cảm ơn vì sự ngọt ngào của bạn!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="relative z-10 space-y-4">
                  <div>
                    <label
                      htmlFor="feedback-sender"
                      className="block text-xs text-[#5e4935] italic tracking-[0.06em] mb-1"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      tên / biệt danh của bạn
                    </label>
                    <input
                      id="feedback-sender"
                      type="text"
                      placeholder="vd: một lữ khách ghé qua..."
                      value={feedbackSender}
                      onChange={(e) => setFeedbackSender(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#fdfaf2] border border-[#c8ac84] text-xs sm:text-sm text-[#38291b] placeholder:text-[#9c866d] placeholder:italic focus:outline-none focus:border-[#8f6d43]"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-message"
                      className="block text-xs text-[#5e4935] italic tracking-[0.06em] mb-1"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      lời thì thầm gửi rừng mộng *
                    </label>
                    <textarea
                      id="feedback-message"
                      rows={4}
                      required
                      placeholder="viết vài dòng gửi đến Naomi và miền rừng mộng này nhé..."
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#fdfaf2] border border-[#c8ac84] text-xs sm:text-sm text-[#38291b] placeholder:text-[#9c866d] placeholder:italic focus:outline-none focus:border-[#8f6d43] resize-none"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                      }}
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowFeedbackModal(false)}
                      className="px-4 py-1.5 text-xs text-[#644e39] bg-[#f6ecda] hover:bg-[#eadbc2] border border-[#c8ac84] transition-colors cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                      }}
                    >
                      đóng lại
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-1.5 bg-[#e6d1b1] hover:bg-[#dac09a] border border-[#aa8656] text-xs font-medium text-[#342416] tracking-[0.08em] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        borderRadius: '3px',
                      }}
                    >
                      <span>gửi thư</span>
                      <span>⟶</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NUÔI NAOMI — ILLUMINATED MANUSCRIPT PAGE MODAL */}
      <AnimatePresence>
        {showDonateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Warm Candlelit Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDonateModal(false)}
              className="absolute inset-0 bg-[#24180e]/50"
            />

            {/* Illuminated Manuscript Page Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg p-6 sm:p-9 text-[#2c2016] overflow-hidden my-auto"
              style={{
                borderRadius: '5px 7px 5px 7px',
                background:
                  'radial-gradient(ellipse 90% 85% at 50% 40%, #fdfaf1 0%, #f6ecda 55%, #ebdcc2 100%)',
                border: '1.5px solid rgba(176, 140, 92, 0.88)',
                boxShadow:
                  '0 26px 68px rgba(42, 28, 14, 0.35), 0 0 42px rgba(255, 224, 168, 0.38), inset 0 0 38px rgba(248, 226, 184, 0.78)',
              }}
            >
              {/* Soft Candlelight Glow Halo Inside Top of Manuscript */}
              <div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full pointer-events-none blur-2xl opacity-70"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 232, 178, 0.85) 0%, rgba(235, 194, 150, 0.25) 65%, transparent 100%)',
                }}
              />

              {/* Inner Double Antique-Gold Botanical Frame */}
              <div
                className="absolute inset-2.5 pointer-events-none"
                style={{
                  border: '1px solid rgba(182, 148, 102, 0.55)',
                }}
              />
              <div
                className="absolute inset-3.5 pointer-events-none"
                style={{
                  border: '0.8px dashed rgba(176, 142, 98, 0.48)',
                }}
              />

              {/* Botanical Corner Ornaments */}
              <div className="absolute top-4 left-4 text-xs text-[#9c784c] pointer-events-none opacity-80">
                ❦
              </div>
              <div className="absolute top-4 right-12 text-xs text-[#9c784c] pointer-events-none opacity-80">
                ❦
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-[#9c784c] pointer-events-none opacity-80">
                ✿
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-[#9c784c] pointer-events-none opacity-80">
                ✿
              </div>

              {/* Close Plaque (✕) */}
              <button
                type="button"
                onClick={() => setShowDonateModal(false)}
                className="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center text-[#6e543b] hover:text-[#2a1c10] bg-[#f8f0df] hover:bg-[#ecdec4] border border-[#c8ab82] text-xs transition-colors cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                ✕
              </button>

              {/* Illuminated Manuscript Header */}
              <div className="relative z-10 text-center mb-5">
                <span
                  className="block text-[0.62rem] uppercase tracking-[0.26em] text-[#846848] mb-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  ❧ DONUM PRO HORTO · HIẾN TẶNG KHU VƯỜN ❧
                </span>
                <h3
                  className="text-xl sm:text-2xl lowercase tracking-[0.14em] font-normal text-[#382417] mt-1"
                  style={{ fontFamily: 'var(--font-whimsical)' }}
                >
                  nuôi naomi 💐
                </h3>
                <p
                  className="text-xs sm:text-sm italic text-[#6d533d] tracking-[0.06em] mt-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  góp một chút hạt mầm yêu thương cho rừng mộng
                </p>
              </div>

              {/* QR Image Prominently Centered (Completely Uncropped & Untouched) */}
              <div className="relative z-10 flex justify-center my-4">
                <div
                  className="relative p-3 bg-[#fffdf8] max-w-[285px] sm:max-w-[315px] w-full"
                  style={{
                    borderRadius: '4px',
                    border: '1.5px solid rgba(178, 144, 98, 0.8)',
                    boxShadow:
                      '0 10px 28px rgba(62, 42, 24, 0.14), inset 0 0 14px rgba(244, 228, 198, 0.6)',
                  }}
                >
                  <img
                    src="/assets/aistudio/image_24662a44.png"
                    alt="VietQR MB Nuôi Naomi"
                    className="w-full h-auto object-contain"
                  />
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#f7ead6] border border-[#bc996b] text-[0.65rem] uppercase tracking-[0.14em] text-[#523b24] font-medium shadow-2xs"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      borderRadius: '2px',
                    }}
                  >
                    VietQR · MB Bank
                  </div>
                </div>
              </div>

              {/* Donation Message Inscribed on Parchment */}
              <div
                className="relative z-10 mt-6 p-4 sm:p-5 bg-[#fdfaf2]/90 border border-[#d4ba94]"
                style={{
                  borderRadius: '3px',
                  boxShadow: 'inset 0 0 16px rgba(238, 220, 188, 0.55)',
                }}
              >
                <p
                  className="text-xs sm:text-[0.9rem] text-[#3f2e1e] italic leading-relaxed text-center"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    lineHeight: '1.72',
                  }}
                >
                  &ldquo;cảm ơn cô dì chú bác anh chị đã góp tiền mua bánh, mời trà em naomi 🥹🌷 sự ủng hộ của mọi người chính là động lực để em tiếp tục đào đất, trồng cây, nằm mơ và đào thêm thật nhiều plot mới cho cả nhà chơi đóaaaa mỗi chiếc bánh, mỗi ly trà, mỗi đồng tiền gửi đến đều được em naomi trân trọng ghi nhớ trong tim (và có thể sẽ được quy đổi thành đồ ăn). cảm ơn mọi người rất nhiều vì đã nuôi em lớn khôn trong khu rừng này ♡&rdquo;
                </p>
              </div>

              {/* Footer Close Plaque */}
              <div className="relative z-10 mt-5 text-center">
                <button
                  type="button"
                  onClick={() => setShowDonateModal(false)}
                  className="px-6 py-2 bg-[#ead7b9] hover:bg-[#dfc6a0] border border-[#ae8a5a] text-xs font-medium text-[#382616] tracking-[0.1em] lowercase shadow-2xs transition-all cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderRadius: '3px',
                  }}
                >
                  ❦ cảm ơn vì tình cảm này ❀
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
