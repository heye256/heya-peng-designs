import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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
  onNavigate
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
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onClose, onNavigate]);
  return <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center" onClick={onClose}>
      {/* 图片计数 */}
      <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* 图片容器 */}
      <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
        {/* 左切换 */}
        {currentIndex > 0 && <button onClick={() => onNavigate(currentIndex - 1)} className="absolute -left-12 text-white/70 hover:text-white transition">
            <ChevronLeft className="w-10 h-10" />
          </button>}

        <img src={images[currentIndex].src} alt={images[currentIndex].alt || ''} className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg select-none" draggable={false} />

        {/* 右切换 */}
        {currentIndex < images.length - 1 && <button onClick={() => onNavigate(currentIndex + 1)} className="absolute -right-12 text-white/70 hover:text-white transition">
            <ChevronRight className="w-10 h-10" />
          </button>}
      </div>

      {/* 缩略图条 - 固定在底部 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/50 rounded-xl backdrop-blur-sm max-w-[90vw] overflow-x-auto">
        {images.map((img, idx) => <button key={idx} onClick={e => {
        e.stopPropagation();
        onNavigate(idx);
      }} className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}>
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>)}
      </div>
    </div>;
};

/* ===================== Lazy Image ===================== */
const LazyImage = ({
  src,
  alt,
  className,
  priority = false,
  onClick
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, {
      rootMargin: '200px'
    });
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);
  return <div ref={imgRef} className={`relative overflow-hidden group cursor-pointer ${className}`} onClick={onClick}>
      {!isLoaded && <div className="absolute inset-0 bg-card animate-pulse" />}
      {isInView && <>
          <img src={src} alt={alt} className={`w-full h-auto object-contain transition-all duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setIsLoaded(true)} loading={priority ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </>}
    </div>;
};

/* ===================== Project Detail ===================== */
const ProjectDetail = ({
  projects,
  initialProjectIndex,
  onClose
}: ProjectDetailProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialProjectIndex);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentProject = projects[currentIndex];
  return <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* Close Button */}
      {lightboxIndex === null && <button onClick={onClose} className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-destructive/20 text-foreground hover:text-destructive transition-all">
          <X className="w-6 h-6" />
        </button>}

      {/* Scrollable Content */}
      <div ref={contentRef} className={`h-full ${lightboxIndex !== null ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <div className="container mx-auto px-6 py-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-gold text-primary-foreground">{currentProject.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{currentProject.title}</h1>
              {currentProject.subtitle && <p className="text-primary mt-2 text-lg">{currentProject.subtitle}</p>}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-3xl mb-6">{currentProject.description}</p>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentProject.tools.map((tool, index) => <span key={index} className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                {tool}
              </span>)}
          </div>

          {/* Masonry Images */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 my-[4px] px-[120px] py-[2px] mx-[77px]">
            {currentProject.images.map((img, idx) => <LazyImage key={`${currentProject.id}-${idx}`} src={img.src} alt={img.alt || `${currentProject.title} - Image ${idx + 1}`} className="rounded-xl break-inside-avoid shadow-card hover:shadow-gold transition-shadow duration-300" priority={idx < 3} onClick={() => setLightboxIndex(idx)} />)}
          </div>
        </div>
      </div>

      {/* ✅ Lightbox - 固定在最外层 */}
      {lightboxIndex !== null && <Lightbox images={currentProject.images} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
    </div>;
};
export default ProjectDetail;