import { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Palette,
  Box,
  PenTool
} from 'lucide-react';

interface Category {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  images: string[];
  description: string;
  tools?: string[];
}

const categories: Category[] = [
  {
    id: 'game-ui',
    title: '游戏 UI 设计',
    icon: <Layers className="w-8 h-8" />,
    description: '专注游戏界面与交互体验设计',
    tools: ['Figma', 'Photoshop', 'Unity'],
    images: ['/image/works/ui.png']
  },
  {
    id: 'painting',
    title: '绘画',
    icon: <PenTool className="w-8 h-8" />,
    description: '数字绘画与插画创作',
    tools: ['Photoshop', 'Procreate'],
    images: ['/image/works/huihua.png']
  },
  {
    id: '3d-design',
    title: '3D 设计',
    subtitle: '建模 · 材质 · 渲染 · 动画',
    icon: <Box className="w-8 h-8" />,
    description: '三维建模与动画制作',
    tools: ['Maya', 'ZBrush', 'Substance', 'Arnold'],
    images: ['/image/works/3d.png']
  },
  {
    id: 'graphic-design',
    title: '平面设计',
    icon: <Palette className="w-8 h-8" />,
    description: '品牌视觉与排版设计',
    tools: ['Illustrator', 'Photoshop'],
    images: ['/image/works/graphic.png']
  }
];

interface WorksSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const WorksSection = ({ sectionRef }: WorksSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const scrollLock = useRef(false);

  const activeCategory =
    activeIndex !== null ? categories[activeIndex] : null;

  /* 滚轮切换板块（上下） */
  useEffect(() => {
    const el = detailRef.current;
    if (!el || activeIndex === null) return;

    const onWheel = (e: WheelEvent) => {
      if (scrollLock.current) return;

      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
      const atTop = el.scrollTop <= 50;

      if (e.deltaY > 0 && atBottom && activeIndex < categories.length - 1) {
        scrollLock.current = true;
        setActiveIndex(activeIndex + 1);
      }

      if (e.deltaY < 0 && atTop && activeIndex > 0) {
        scrollLock.current = true;
        setActiveIndex(activeIndex - 1);
      }

      setTimeout(() => (scrollLock.current = false), 800);
    };

    el.addEventListener('wheel', onWheel);
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gradient-gold">
          作品展示
        </h2>

        {/* 分类卡片 */}
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => setActiveIndex(index)}
              className="relative h-[420px] cursor-pointer rounded-2xl overflow-hidden group"
            >
              <img
                src={cat.images[0]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详情页 */}
      {activeCategory && (
        <div
          ref={detailRef}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto animate-fade-in"
        >
          {/* 进度指示 */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
            {activeIndex! + 1} / {categories.length}
          </div>

          {/* 关闭 */}
          <button
            onClick={() => setActiveIndex(null)}
            className="fixed top-6 right-6 p-3 rounded-full bg-card"
          >
            <X />
          </button>

          <div className="container mx-auto px-6 py-24">
            <h2 className="text-4xl font-bold mb-4">
              {activeCategory.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {activeCategory.description}
            </p>

            {/* 工具标签 */}
            <div className="flex flex-wrap gap-3 mb-12">
              {activeCategory.tools?.map(tool => (
                <span
                  key={tool}
                  className="px-4 py-1 text-sm rounded-full bg-primary/10 text-primary"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* 图片 Masonry */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {activeCategory.images.map((img, i) => (
                <div
                  key={i}
                  className="mb-6 break-inside-avoid cursor-zoom-in"
                  onClick={() => setLightboxImage(img)}
                >
                  <img
                    src={img}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full h-auto rounded-xl hover:scale-[1.02] transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 灯箱 */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
};

export default WorksSection;
