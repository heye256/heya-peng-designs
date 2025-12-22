import { useState } from 'react';
import { Layers, Palette, Box, PenTool } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

interface Category {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  images: { src: string; alt?: string }[];
  description: string;
  tools: string[];
}

const categories: Category[] = [
  {
    id: 'game-ui',
    title: '游戏UI设计',
    icon: <Layers className="w-8 h-8" />,
    description: '专注于游戏界面设计，打造沉浸式用户体验。从概念设计到最终实现，每一个像素都经过精心打磨，确保视觉与功能的完美融合。',
    tools: ['Figma', 'Photoshop', 'After Effects', 'Unity'],
    images: [
      { src: '/image/works/ui.png', alt: '游戏UI主界面' },
      { src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', alt: '游戏场景' },
      { src: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80', alt: '游戏元素' },
      { src: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=800&q=80', alt: '界面设计' },
    ],
  },
  {
    id: 'painting',
    title: '绘画',
    icon: <PenTool className="w-8 h-8" />,
    description: '数字绘画与插画创作，融合传统技法与现代数字工具，创造富有表现力的视觉作品。',
    tools: ['Procreate', 'Photoshop', 'Clip Studio Paint', 'Wacom'],
    images: [
      { src: '/image/works/huihua.png', alt: '数字绘画作品' },
      { src: '/image/works/huihua/002.jpg' },
      { src: '/image/works/huihua/003.jpg', alt: '概念艺术' },
      { src: '/image/works/huihua/004.jpg', alt: '传统绘画' },
      { src: '/image/works/huihua/005.jpg', alt: '传统绘画' },
      { src: '/image/works/huihua/006.jpg', alt: '传统绘画' },
      { src: '/image/works/huihua/008.png', alt: '传统绘画' },
      { src: '/image/works/huihua/009.png', alt: '传统绘画' },
      { src: '/image/works/huihua/010.jpg', alt: '传统绘画' },
      { src: '/image/works/huihua/014.png', alt: '传统绘画' },
      { src: '/image/works/huihua/015.png', alt: '传统绘画' },
      { src: '/image/works/huihua/016.png', alt: '传统绘画' },
      { src: '/image/works/huihua/017.png', alt: '传统绘画' },
      { src: '/image/works/huihua/018.png', alt: '传统绘画' },
      { src: '/image/works/huihua/019.png', alt: '传统绘画' },
      { src: '/image/works/huihua/020.png', alt: '传统绘画' },
      { src: '/011.jpg', alt: '传统绘画' },
      { src: '/012.png', alt: '传统绘画' },
      { src: '/013.jpg', alt: '传统绘画' },
      
    ],
  },
  {
    id: '3d-design',
    title: '3D设计',
    subtitle: '建模 · 材质贴图 · 渲染 · 三维动画',
    icon: <Box className="w-8 h-8" />,
    description: '三维建模、材质贴图、渲染及动画制作。从角色到场景，从产品到建筑，全方位的3D视觉解决方案。',
    tools: ['Blender', 'Cinema 4D', 'Substance Painter', 'ZBrush', 'Unreal Engine'],
    images: [
      { src: '/image/works/3d.png', alt: '3D角色建模' },
      { src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', alt: '3D渲染' },
      { src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', alt: '材质贴图' },
      { src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80', alt: '三维动画' },
    ],
  },
  {
    id: 'graphic-design',
    title: '平面设计',
    icon: <Palette className="w-8 h-8" />,
    description: '品牌视觉、海报设计与排版。将创意转化为引人注目的视觉传达，提升品牌价值与识别度。',
    tools: ['Illustrator', 'InDesign', 'Photoshop', 'Canva'],
    images: [
      { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', alt: '品牌设计' },
      { src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', alt: '海报设计' },
      { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', alt: '排版设计' },
      { src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80', alt: '视觉传达' },
    ],
  },
];

interface WorksSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const WorksSection = ({ sectionRef }: WorksSectionProps) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const openProject = (index: number) => {
    setActiveProjectIndex(index);
  };

  const closeProject = () => {
    setActiveProjectIndex(null);
  };

  return (
    <section ref={sectionRef} className="relative py-24 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">作品展示</span>
          </h2>
          <p className="text-muted-foreground text-lg">点击任意板块查看详情</p>
        </div>

        {/* Category Cards */}
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => openProject(index)}
              className="section-card cursor-pointer group h-[450px] md:h-[500px] relative overflow-hidden rounded-xl shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.images[0].src}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-primary text-sm mt-1">{category.subtitle}</p>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground line-clamp-2">{category.description}</p>

                {/* Tools Preview */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {category.tools.slice(0, 3).map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 rounded-full bg-card/50 backdrop-blur-sm text-xs text-muted-foreground border border-border/50"
                    >
                      {tool}
                    </span>
                  ))}
                  {category.tools.length > 3 && (
                    <span className="px-3 py-1 rounded-full bg-card/50 backdrop-blur-sm text-xs text-primary">
                      +{category.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm backdrop-blur-sm">
                  点击查看详情
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProjectIndex !== null && (
        <ProjectDetail
          projects={categories}
          initialProjectIndex={activeProjectIndex}
          onClose={closeProject}
        />
      )}
    </section>
  );
};

export default WorksSection;
