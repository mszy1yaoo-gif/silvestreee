import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SiYingColophonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SiYingColophonModal: React.FC<SiYingColophonModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card Styled like an Editorial Press Notice / Memorandum */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-[6px] border-2 border-[#54412f] shadow-2xl text-left overflow-hidden z-10"
            style={{
              background: 'linear-gradient(145deg, #f9f3e6 0%, #efe5d1 100%)',
              color: '#1e160e',
            }}
          >
            {/* Ink Stamp: [ THÔNG CÁO BÁO CHÍ ] */}
            <div className="absolute top-4 right-5 rotate-3 pointer-events-none opacity-85">
              <span className="px-2 py-0.5 border border-[#8a382b] text-[#8a382b] font-mono text-[0.62rem] font-bold tracking-widest uppercase bg-[#faf3e5]">
                [ BẢN TIN TÒA SOẠN ]
              </span>
            </div>

            {/* Header */}
            <div className="border-b border-[#3b2d1f]/30 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#735d45] uppercase tracking-widest">
                <span>🦇 TÒA SOẠN CỔ THỤ</span>
                <span>/</span>
                <span>SILVESTRE</span>
              </div>
              <h3
                className="text-2xl font-light tracking-[0.14em] uppercase text-[#1c140c] mt-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                THE MAGAZINE ARCHIVE
              </h3>
              <p
                className="text-xs italic text-[#5c4a37] tracking-wider"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Bản ghi chú của chủ bút Si Ying
              </p>
            </div>

            {/* Body */}
            <div className="space-y-3.5 text-xs sm:text-[0.84rem] text-[#2c2014] leading-relaxed">
              <p style={{ fontFamily: 'var(--font-serif)' }} className="italic text-sm">
                &ldquo;Chào mừng quý độc giả ghé thăm phòng biên tập của Si Ying. Chúng tôi kiến tạo không gian này như một ấn bản báo in cổ phong giữa lòng rừng già SILVESTRE.&rdquo;
              </p>

              <div className="p-3 border border-[#8c7457]/40 bg-[#f3ebd9] rounded-[3px] font-mono text-xs space-y-1.5">
                <div className="font-bold text-[#8a382b] uppercase text-[0.66rem] tracking-wider">
                  QUY CÁCH XUẤT BẢN:
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[#3d2f21]">
                  <li>Không áp dụng giao diện thẻ nhân vật thông thường.</li>
                  <li>Mỗi nhân vật được dàn trang thành một bài báo đặc san (Feature Article).</li>
                  <li>Bao gồm tranh minh họa khổ lớn, bài ký chân dung, đối thoại mật, từ khóa và tương tác độc giả.</li>
                  <li>Toàn bộ nhân vật hiện đang được biên soạn kỹ lưỡng trước khi chính thức ấn hành.</li>
                </ul>
              </div>

              <p className="text-[0.76rem] text-[#5e4b37] font-mono">
                Mọi thắc mắc hoặc góp ý bản thảo, xin mời kết nối qua kênh Discord SILVESTRE.
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-3 border-t border-[#3b2d1f]/25 flex items-center justify-between">
              <span className="text-[0.6rem] font-mono text-[#78634e]">CHỦ BÚT: SI YING</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-[3px] bg-[#221810] hover:bg-[#38281c] text-[#f7eee1] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
              >
                Đã hiểu & Đóng lại
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
