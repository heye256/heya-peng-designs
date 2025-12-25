import { useState } from 'react';
import { Layers, Palette, Box, PenTool } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

interface SubCategory {
  id: string;
  title: string;
  images: { src: string; alt?: string; type?: 'image' | 'video' | 'bilibili' }[];
}

interface Category {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  images: { src: string; alt?: string; type?: 'image' | 'video' | 'bilibili' }[];
  description: string;
  tools: string[];
  subCategories?: SubCategory[];
}

const categories: Category[] = [
  {
    id: 'game-ui',
    title: '游戏UI设计',
    icon: <Layers className="w-8 h-8" />,
    description: '专注于游戏界面设计，打造沉浸式用户体验。从概念设计到最终实现，每一个像素都经过精心打磨，确保视觉与功能的完美融合。',
    tools: ['Figma', 'Photoshop', 'After Effects', 'Unity'],
    images: [
      { src: '/image/works/youxi/001.webp', alt: '游戏场景' },
      { src: '/image/works/youxi/002.webp', alt: '游戏元素' },
      { src: '/image/works/youxi/003.webp', alt: '界面设计' },
      { src: '/image/works/youxi/004.webp', alt: '界面设计' },
      { src: '/image/works/youxi/005.webp', alt: '界面设计' },
      { src: '/image/works/youxi/006.webp', alt: '界面设计' },
      { src: '/image/works/youxi/007.webp', alt: '界面设计' },
      { src: '/image/works/youxi/008.webp', alt: '界面设计' },
      { src: '/image/works/youxi/009.webp', alt: '界面设计' },
      { src: '/image/works/youxi/010.webp', alt: '界面设计' },
    ],
  },
  {
    id: 'painting',
    title: '绘画',
    icon: <PenTool className="w-8 h-8" />,
    description: '数字绘画与插画创作，融合传统技法与现代数字工具，创造富有表现力的视觉作品。',
    tools: ['Procreate', 'Photoshop', 'Clip Studio Paint', 'Wacom'],
    images: [
      { src: '/image/works/huihua/002.webp' },
      { src: '/image/works/huihua/003.webp', alt: '概念艺术' },
      { src: '/image/works/huihua/004.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/005.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/006.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/008.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/009.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/010.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/014.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/015.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/016.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/017.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/018.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/019.webp', alt: '传统绘画' },
      { src: '/image/works/huihua/020.webp', alt: '传统绘画' },
      { src: '/011.webp', alt: '传统绘画' },
      { src: '/012.webp', alt: '传统绘画' },
      { src: '/013.webp', alt: '传统绘画' },
      
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
    ],
    subCategories: [
      {
        id: 'modeling',
        title: '建模作品',
        images: [
          { src: '/image/works/3d/mode/001.webp' },
          { src: '/image/works/3d/mode/002.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/003.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/004.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/005.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/006.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/007.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/008.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/010.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/011.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/012.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/013.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/014.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/015.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/016.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/017.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/018.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/019.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/020.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/021.webp', alt: '角色建模' },
          { src: '/image/works/3d/mode/022.webp', alt: '角色建模' },
          
          
          
          
          
        ],
      },
      {
        id: 'texturing',
        title: '材质贴图',
        images: [
           { src: '/image/works/3d/caizhi/001.webp', alt: '材质贴图' },
          { src: '/image/works/3d/caizhi/002.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/003.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/004.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/005.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/006.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/007.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/008.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/009.webp', alt: 'PBR材质' },
          { src: '/image/works/3d/caizhi/010.webp', alt: 'PBR材质' },
        ],
      },
      {
        id: 'lighting',
        title: '灯光渲染',
        images: [
          { src: '/image/works/3d/xuanran/001.webp', alt: '灯光渲染' },
          { src: '/image/works/3d/xuanran/002.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/003.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/004.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/005.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/006.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/007.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/008.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/009.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/010.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/011.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/012.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/013.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/014.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/015.webp', alt: '场景渲染' },
          { src: '/image/works/3d/xuanran/016.webp', alt: '场景渲染' },
        ],
      },
      {
        id: 'animation',
        title: '三维动画',
        images: [
          { src: '/videos/001.mp4', alt: '三维动画', type: 'video' },
          { src: '/videos/002.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/003.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/004.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/005.mp4', alt: '动态效果', type: 'video' },
          { src: 'bilibili:BV1ZzB2BdE9R', alt: '三维动画作品', type: 'bilibili' },
          { src: '/videos/007.mp4', alt: '动态效果', type: 'video' },
          { src: 'bilibili:BV1BBB2B4EoL', alt: '三维动画作品', type: 'bilibili' },
          { src: '/videos/009.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/010.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/011.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/012.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/013.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/014.mp4', alt: '动态效果', type: 'video' },
          { src: '/videos/015.mp4', alt: '动态效果', type: 'video' },
        ],
      },
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
      { src: '/image/works/pinmian/001.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/002.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/003.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/004.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/005.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/006.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/007.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/008.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/009.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/010.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/011.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/012.webp', alt: '品牌设计' },
      { src: '/image/works/pinmian/013.webp', alt: '品牌设计' },
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
    <section ref={sectionRef} className="relative py-12 md:py-24 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-gradient-gold">作品展示</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">点击任意板块查看详情</p>
        </div>

        {/* Category Cards */}
        <div className="flex flex-col gap-4 md:gap-8 max-w-[1400px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => openProject(index)}
              className="section-card cursor-pointer group h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
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
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                  <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-primary/20 text-primary backdrop-blur-sm">
                    <div className="w-5 h-5 md:w-8 md:h-8 [&>svg]:w-full [&>svg]:h-full">
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-primary text-xs md:text-sm mt-0.5 md:mt-1">{category.subtitle}</p>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base line-clamp-2">{category.description}</p>
                
                {/* Tools Preview */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
                  {category.tools.slice(0, 3).map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-card/50 backdrop-blur-sm text-[10px] md:text-xs text-muted-foreground border border-border/50"
                    >
                      {tool}
                    </span>
                  ))}
                  {category.tools.length > 3 && (
                    <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-card/50 backdrop-blur-sm text-[10px] md:text-xs text-primary">
                      +{category.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Indicator - 隐藏在移动端 */}
              <div className="hidden md:block absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
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
