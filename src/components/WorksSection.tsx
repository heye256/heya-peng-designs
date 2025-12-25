import { useState, lazy, Suspense } from 'react';
import { Layers, Palette, Box, PenTool } from 'lucide-react';

/** ======================
 * 懒加载 ProjectDetail
 ====================== */
const ProjectDetail = lazy(() => import('./ProjectDetail'));

/** ======================
 * 类型定义
 ====================== */
interface ImageItem {
  src: string;
  alt?: string;
  type?: 'image' | 'video' | 'bilibili';
  poster?: string;
}

interface SubCategory {
  id: string;
  title: string;
  images: ImageItem[];
}

interface Category {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  cover: string;              // ✅ 新增：封面小图
  images: ImageItem[];
  description: string;
  tools: string[];
  subCategories?: SubCategory[];
}

/** ======================
 * 分类数据（示例：仅展示结构）
 * ⚠️ 实际使用时，你只需要把 cover 改成 webp 小图即可
 ====================== */
const categories: Category[] = [
  {
    id: 'game-ui',
    title: '游戏UI设计',
    icon: <Layers className="w-8 h-8" />,
    cover: '/image/works/youxi/cover.webp',
    description:
      '专注于游戏界面设计，打造沉浸式用户体验。从概念设计到最终实现，每一个像素都经过精心打磨。',
    tools: ['Figma', 'Photoshop', 'After Effects', 'Unity'],
    images: [
      { src: '/image/works/youxi/000.webp' },
      { src: '/image/works/youxi/001.webp' },
    ],
  },
  {
    id: 'painting',
    title: '绘画',
    icon: <PenTool className="w-8 h-8" />,
    cover: '/image/works/huihua/cover.webp',
    description: '数字绘画与插画创作，融合传统技法与现代数字工具。',
    tools: ['Procreate', 'Photoshop'],
    images: [
      { src: '/image/works/huihua/002.webp' },
      { src: '/image/works/huihua/003.webp' },
    ],
  },
  {
    id: '3d-design',
    title: '3D设计',
    subtitle: '建模 · 材质 · 渲染 · 动画',
    icon: <Box className="w-8 h-8" />,
    cover: '/image/works/3d/cover.webp',
    description: '三维建模、渲染及动画制作。',
    tools: ['Blender', 'Substance Painter'],
    images: [{ src: '/image/works/3d/preview.webp' }],
  },
  {
    id: 'graphic-design',
    title: '平面设计',
    icon: <Palette className="w-8 h-8" />,
    cover: '/image/works/pinmian/cover.webp',
    description: '品牌视觉、海报与排版设计。',
    tools: ['Illustrator', 'Photoshop'],
    images: [{ src: '/image/works/pinmian/001.webp' }],
  },
];

/** ======================
 * 组件
 ====================== */
interface WorksSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const WorksSection = ({ sectionRef }: WorksSectionProps) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 min-h-screen">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">作品展示</span>
          </h2>
          <p className="text-muted-foreground">点击任意板块查看详情</p>
        </div>

        {/* 分类卡片 */}
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => setActiveProjectIndex(index)}
              className="section-card cursor-pointer group h-[320px] md:h-[460px]"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* 封面图（只加载小图） */}
              <div className="absolute inset-0">
                <img
                  src={category.cover}
                  alt={category.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* 内容 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-primary text-sm mt-1">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                  {category.description}
                </p>

                {/* 工具 */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {category.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full bg-card/60 backdrop-blur text-xs border border-border/50"
                    >
                      {tool}
                    </span>
                  ))}
                  {category.tools.length > 3 && (
                    <span className="px-3 py-1 text-xs text-primary">
                      +{category.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover 提示 */}
              <div className="hidden md:block absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm backdrop-blur">
                  点击查看详情
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详情弹窗（懒加载） */}
      {activeProjectIndex !== null && (
        <Suspense fallback={<div className="py-20 text-center">加载中...</div>}>
          <ProjectDetail
            projects={categories}
            initialProjectIndex={activeProjectIndex}
            onClose={() => setActiveProjectIndex(null)}
          />
        </Suspense>
      )}
    </section>
  );
};

export default WorksSection;
