import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailProps {
  projects: {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    images: { src: string; alt?: string }[];
    description: string;
    tools: string[];
  }[];
  initialProjectIndex: number;
  onClose: () => void;
}

const ProjectDetail = ({
  projects,
  initialProjectIndex,
  onClose,
}: ProjectDetailProps) => {
  const [currentIndex] = useState(initialProjectIndex);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const project = projects[currentIndex];

  /** 放大时禁止页面滚动 */
  useEffect(() => {
    if (zoomIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomIndex]);

  const showPrev = () => {
    if (zoomIndex === null) return;
    setZoomIndex(
      zoomIndex === 0 ? project.images.length - 1 : zoomIndex - 1
    );
  };

  const showNext = () => {
    if (zoomIndex === null) return;
    setZoomIndex(
      zoomIndex === project.images.length - 1 ? 0 : zoomIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center">
      {/* 主内容 */}
      <div className="relative max-w-6xl w-full mx-4 bg-background rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 左侧信息 */}
          <div className="md:w-1/3 p-6 space-y-4">
            <h2 className="text-3xl font-bold">{project.title}</h2>
            {project.subtitle && (
              <p className="text-primary">{project.subtitle}</p>
            )}
            <p className="text-muted-foreground">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs bg-card border"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧图片 */}
          <div className="md:w-2/3 p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt || ''}
                className="cursor-pointer rounded-lg object-cover hover:scale-105 transition"
                onClick={() => setZoomIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 放大查看层 */}
      {zoomIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center"
          onClick={() => setZoomIndex(null)}
        >
          {/* 阻止点到图片时关闭 */}
          <div
            className="relative flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 左按钮（贴近图片） */}
            <button
              onClick={showPrev}
              className="absolute -left-14 text-white/80 hover:text-white transition"
            >
              <ChevronLeft size={48} />
            </button>

            {/* 图片 */}
            <img
              src={project.images[zoomIndex].src}
              alt=""
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />

            {/* 右按钮（贴近图片） */}
            <button
              onClick={showNext}
              className="absolute -right-14 text-white/80 hover:text-white transition"
            >
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
