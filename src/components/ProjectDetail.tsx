// Lightbox Component（仅此处修改）
const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: ProjectImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) => {
  // 锁定页面滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
    >
      {/* 图片计数（保留） */}
      <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* 图片容器 */}
      <div
        className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.preventDefault()}
      >
        {/* 左切换按钮（贴近图片） */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute -left-12 text-white/70 hover:text-white transition"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
        )}

        {/* 图片 */}
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || ''}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg select-none"
          draggable={false}
        />

        {/* 右切换按钮（贴近图片） */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute -right-12 text-white/70 hover:text-white transition"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        )}
      </div>

      {/* 缩略图条（完全保留） */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/50 rounded-xl backdrop-blur-sm max-w-[90vw] overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(idx);
            }}
            className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
              idx === currentIndex
                ? 'ring-2 ring-white scale-110'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
