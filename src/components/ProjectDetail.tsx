import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

/* ===================== Types ===================== */

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

/* ===================== Lightbox ===================== */

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
      if (e.key === 'ArrowLeft' && currentIndex > 0)
        onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
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
      {/* Counter */}
      <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div
        className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute -left-12 text-white/70 hover:text-white"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
        )}

        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || ''}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg select-none"
          draggable={false}
        />

        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute -right-12 text-white/70 hover:text-white"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/50 rounded-xl max-w-[90vw] overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(idx);
            }}
            className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
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

/* ===================== Project Detail ===================== */

const ProjectDetail = ({
  projects,
  initialProjectIndex,
  onClose,
}: ProjectDetailProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialProjectIndex);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentProject = projects[currentIndex];
  const totalProjects = projects.length;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* Close */}
      {lightboxIndex === null && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80"
        >
          <X />
        </button>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className={`h-full ${
          lightboxIndex !== null ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        <div className="container mx-auto px-6 py-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-gradient-gold">
              {currentProject.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {currentProject.title}
              </h1>
              {currentProject.subtitle && (
                <p className="text-primary mt-2">
                  {currentProject.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="max-w-3xl mb-8 text-muted-foreground">
            {currentProject.description}
          </p>

          {/* Images */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {currentProject.images.map((img, idx) => (
              <div
                key={idx}
                className="relative cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  className="rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition">
                  <ZoomIn className="opacity-0 hover:opacity-100 text-white" />
                </div>
              </div>
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
