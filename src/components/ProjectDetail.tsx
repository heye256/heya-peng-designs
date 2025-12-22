// ProjectDetail.tsx
import { useState } from 'react';
import { X } from 'lucide-react';

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

const ProjectDetail = ({ projects, initialProjectIndex, onClose }: ProjectDetailProps) => {
  const [currentIndex] = useState(initialProjectIndex);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const project = projects[currentIndex];

  const handleImageClick = (src: string) => {
    setZoomedImage(src);
  };

  const handleZoomOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'zoom-overlay') {
      setZoomedImage(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-6xl w-full mx-4 bg-background rounded-xl overflow-hidden shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40 hover:bg-black/60"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Project Info */}
          <div className="md:w-1/3 p-6 flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{project.title}</h2>
            {project.subtitle && <p className="text-primary">{project.subtitle}</p>}
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-card/50 backdrop-blur-sm text-xs text-muted-foreground border border-border/50"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: Images */}
          <div className="md:w-2/3 p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt || project.title}
                className="cursor-pointer rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                onClick={() => handleImageClick(img.src)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Zoomed Image Overlay */}
      {zoomedImage && (
        <div
          id="zoom-overlay"
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 cursor-pointer"
          onClick={handleZoomOverlayClick}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
