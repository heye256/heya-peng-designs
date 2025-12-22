import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

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

const LazyImage = ({ 
  src, 
  alt, 
  className,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  priority?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-card animate-pulse" />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
};

const ProjectDetail = ({ projects, initialProjectIndex, onClose }: ProjectDetailProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialProjectIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const edgeScrollCount = useRef(0);
  const lastEdgeTime = useRef(0);

  const currentProject = projects[currentIndex];
  const totalProjects = projects.length;

  const goToProject = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return;
    lastScrollTime.current = now;

    if (direction === 'next' && currentIndex >= totalProjects - 1) return;
    if (direction === 'prev' && currentIndex <= 0) return;

    setIsTransitioning(true);
    setScrollDirection(direction === 'next' ? 'down' : 'up');

    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
      
      // Reset scroll position for new project
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      edgeScrollCount.current = 0;
      
      setTimeout(() => {
        setIsTransitioning(false);
        setScrollDirection(null);
      }, 100);
    }, 300);
  }, [currentIndex, totalProjects, isTransitioning]);

  // Check if at scroll boundaries
  const checkScrollBoundary = useCallback(() => {
    const content = contentRef.current;
    if (!content) return { atTop: true, atBottom: true };
    
    const atTop = content.scrollTop <= 5;
    const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 5;
    
    return { atTop, atBottom };
  }, []);

  // Wheel scroll handler - scroll content first, then switch projects
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const content = contentRef.current;
      if (!content || isTransitioning) return;

      const { atTop, atBottom } = checkScrollBoundary();
      const now = Date.now();

      // Scrolling down at bottom = next project
      if (e.deltaY > 20 && atBottom && currentIndex < totalProjects - 1) {
        e.preventDefault();
        
        // Need multiple edge scrolls to trigger project switch
        if (now - lastEdgeTime.current < 500) {
          edgeScrollCount.current += 1;
        } else {
          edgeScrollCount.current = 1;
        }
        lastEdgeTime.current = now;

        if (edgeScrollCount.current >= 2) {
          goToProject('next');
          edgeScrollCount.current = 0;
        }
        return;
      }

      // Scrolling up at top = previous project
      if (e.deltaY < -20 && atTop && currentIndex > 0) {
        e.preventDefault();
        
        if (now - lastEdgeTime.current < 500) {
          edgeScrollCount.current += 1;
        } else {
          edgeScrollCount.current = 1;
        }
        lastEdgeTime.current = now;

        if (edgeScrollCount.current >= 2) {
          goToProject('prev');
          edgeScrollCount.current = 0;
        }
        return;
      }

      // Reset edge count if not at boundary
      if (!atTop && !atBottom) {
        edgeScrollCount.current = 0;
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (content) {
        content.removeEventListener('wheel', handleWheel);
      }
    };
  }, [goToProject, checkScrollBoundary, isTransitioning, currentIndex, totalProjects]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const { atTop, atBottom } = checkScrollBoundary();

    if (Math.abs(diff) > 80) {
      if (diff > 0 && atBottom) {
        goToProject('next');
      } else if (diff < 0 && atTop) {
        goToProject('prev');
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Page Down / End to go to next project when at bottom
      if (e.key === 'End' || e.key === 'PageDown') {
        const { atBottom } = checkScrollBoundary();
        if (atBottom) {
          goToProject('next');
        }
      }
      // Page Up / Home to go to prev project when at top
      if (e.key === 'Home' || e.key === 'PageUp') {
        const { atTop } = checkScrollBoundary();
        if (atTop) {
          goToProject('prev');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToProject, onClose, checkScrollBoundary]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const getTransitionClass = () => {
    if (!isTransitioning) return 'opacity-100 translate-y-0';
    if (scrollDirection === 'down') return 'opacity-0 -translate-y-8';
    if (scrollDirection === 'up') return 'opacity-0 translate-y-8';
    return '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-destructive/20 text-foreground hover:text-destructive transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Progress Indicator */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
        <div className="px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm">
          <span className="text-primary font-semibold">{currentIndex + 1}</span>
          <span className="text-muted-foreground"> / {totalProjects}</span>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button
          onClick={() => goToProject('prev')}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full bg-card/80 backdrop-blur-sm transition-all ${
            currentIndex === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-primary/20 text-foreground hover:text-primary'
          }`}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={() => goToProject('next')}
          disabled={currentIndex === totalProjects - 1}
          className={`p-3 rounded-full bg-card/80 backdrop-blur-sm transition-all ${
            currentIndex === totalProjects - 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-primary/20 text-foreground hover:text-primary'
          }`}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true);
                setScrollDirection(index > currentIndex ? 'down' : 'up');
                setTimeout(() => {
                  setCurrentIndex(index);
                  if (contentRef.current) {
                    contentRef.current.scrollTop = 0;
                  }
                  setTimeout(() => {
                    setIsTransitioning(false);
                    setScrollDirection(null);
                  }, 100);
                }, 300);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-muted hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      {/* Main Scrollable Content */}
      <div 
        ref={contentRef}
        className={`h-full overflow-y-auto scroll-smooth transition-all duration-300 ease-out ${getTransitionClass()}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container mx-auto px-6 py-24">
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-gold text-primary-foreground">
                {currentProject.icon}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {currentProject.title}
                </h1>
                {currentProject.subtitle && (
                  <p className="text-primary mt-2 text-lg">{currentProject.subtitle}</p>
                )}
              </div>
            </div>

            {/* Project Description */}
            <p className="text-muted-foreground text-lg max-w-3xl mb-6">
              {currentProject.description}
            </p>

            {/* Tools Tags */}
            <div className="flex flex-wrap gap-2">
              {currentProject.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Masonry Image Grid - Adaptive Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {currentProject.images.map((image, index) => (
              <LazyImage
                key={`${currentProject.id}-${index}`}
                src={image.src}
                alt={image.alt || `${currentProject.title} - Image ${index + 1}`}
                className="rounded-xl break-inside-avoid shadow-card hover:shadow-gold transition-shadow duration-300"
                priority={index < 3}
              />
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="mt-16 pb-8 text-center">
            {currentIndex < totalProjects - 1 ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-sm">滚动到底部后继续向下滚动查看下一个项目</span>
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </div>
            ) : (
              <div className="text-muted-foreground">
                <span className="text-sm">已是最后一个项目</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
