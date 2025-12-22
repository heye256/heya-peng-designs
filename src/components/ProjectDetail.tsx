import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

/* ================= Types ================= */

interface ProjectImage {
  src: string;
  alt?: string;
}

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tools: string[];
  images: ProjectImage[];
  icon: React.ReactNode;
}

interface ProjectDetailProps {
  projects: Project[];
  initialProjectIndex: number;
  onClose: () => void;
}

/* ================= Lightbox ================= */

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
    >
      {/* 计数 */}
      <div className="absolute top-4 left-4 text-white/80 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* 图片 */}
      <div
        className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {currentIndex > 0 && (
          <button
            className="absolute -left-14 text-white/70 hover:text-white"
            onClick={() => onNavigate(currentIndex - 1)}
          >
            <ChevronLeft size={48} />
          </button>
        )}

        <img
          src={images[currentIndex].src}
          alt=""
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg select-none"
          draggable={false}
        />

        {currentIndex < images.length - 1 && (
          <button
            className="absolute -right-14 text-white/70 hover:text-white"
            onClick={() => onNavigate(currentIndex + 1)}
          >
            <ChevronRight size={48} />
          </button>
        )}
      </div>

      {/* 底部缩略图（始终贴底） */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/60 rounded-xl max-w-[90vw] overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(idx);
            }}
            className={`w-16 h-16 rounded-lg overflow-hidden transition ${
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

/* ================= LazyImage ================= */

const LazyImage = ({
  src,
  alt,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`relative cursor-pointer overflow-hidden group ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center">
      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
    </div>
  </div>
);

/* ================= ProjectDetail ================= */

const ProjectDetail = ({
  projects,
  initialProjectIndex,
  onClose,
}: ProjectDetailProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialProjectIndex);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentProject = projects[currentIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* 关闭项目 */}
      {lightboxIndex === null && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 hover:bg-destructive/20"
        >
          <X />
        </button>
      )}

      {/* 主滚动区 */}
      <div
        ref={contentRef}
        className={`h-full ${
          lightboxIndex !== null ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-4xl font-bold mb-4">
            {currentProject.title}
          </h1>

          <p className="text-muted-foreground mb-12">
            {currentProject.description}
          </p>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {currentProject.images.map((img, idx) => (
              <LazyImage
                key={idx}
                src={img.src}
                alt={img.alt || ''}
                className="rounded-xl shadow-card"
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ 唯一的 Lightbox（正确位置） */}
      {lightboxIndex !== null && (
        <Lightbox
          images={currentProject.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
