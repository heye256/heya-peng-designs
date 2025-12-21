import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Layers, Palette, Box, PenTool } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  images: string[];
  description: string;
}

const categories: Category[] = [
  {
    id: 'game-ui',
    title: '游戏UI设计',
    icon: <Layers className="w-8 h-8" />,
    description: '专注于游戏界面设计，打造沉浸式用户体验',
    images: [
      '/image/works/ui.png',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=800&q=80',
    ],
  },
  {
    id: 'painting',
    title: '绘画',
    icon: <PenTool className="w-8 h-8" />,
    description: '数字绘画与插画创作',
    images: [
      '/image/works/huihua.png',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    ],
  },
  {
    id: '3d-design',
    title: '3D设计',
    subtitle: '建模 · 材质贴图 · 渲染 · 三维动画',
    icon: <Box className="w-8 h-8" />,
    description: '三维建模、材质贴图、渲染及动画制作',
    images: [
      '/image/works/3d.png',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    ],
  },
  {
    id: 'graphic-design',
    title: '平面设计',
    icon: <Palette className="w-8 h-8" />,
    description: '品牌视觉、海报设计与排版',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    ],
  },
];

interface WorksSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const WorksSection = ({ sectionRef }: WorksSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openCategory = (category: Category) => {
    setActiveCategory(category);
  };

  const closeCategory = () => {
    setActiveCategory(null);
  };

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (activeCategory) {
      const nextIndex = (currentImageIndex + 1) % activeCategory.images.length;
      setCurrentImageIndex(nextIndex);
      setLightboxImage(activeCategory.images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (activeCategory) {
      const prevIndex = (currentImageIndex - 1 + activeCategory.images.length) % activeCategory.images.length;
      setCurrentImageIndex(prevIndex);
      setLightboxImage(activeCategory.images[prevIndex]);
    }
  };

  const currentCategoryIndex = activeCategory 
    ? categories.findIndex(c => c.id === activeCategory.id)
    : -1;

  const goToCategory = (direction: 'prev' | 'next') => {
    if (currentCategoryIndex === -1) return;
    
    const newIndex = direction === 'prev'
      ? (currentCategoryIndex - 1 + categories.length) % categories.length
      : (currentCategoryIndex + 1) % categories.length;
    
    setActiveCategory(categories[newIndex]);
  };

  return (
    <section ref={sectionRef} className="relative py-24 min-h-screen">
      {/* Background */}
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
              onClick={() => openCategory(category)}
              className="section-card cursor-pointer group h-[450px] md:h-[500px]"
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.images[0]}
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
                <p className="text-muted-foreground">{category.description}</p>
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

      {/* Detail Modal */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto">
          {/* Navigation between categories */}
          <div className="fixed top-1/2 left-4 -translate-y-1/2 z-50">
            <button
              onClick={() => goToCategory('prev')}
              className="p-3 rounded-full bg-card hover:bg-primary/20 text-foreground hover:text-primary transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50">
            <button
              onClick={() => goToCategory('next')}
              className="p-3 rounded-full bg-card hover:bg-primary/20 text-foreground hover:text-primary transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={closeCategory}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card hover:bg-destructive/20 text-foreground hover:text-destructive transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="container mx-auto px-6 py-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 rounded-2xl bg-gradient-gold text-primary-foreground">
                {activeCategory.icon}
              </div>
              <div>
                <h2 className="text-4xl font-bold text-foreground">
                  {activeCategory.title}
                </h2>
                {activeCategory.subtitle && (
                  <p className="text-primary mt-2">{activeCategory.subtitle}</p>
                )}
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCategory.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(image, index)}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group"
                >
                  <img
                    src={image}
                    alt={`${activeCategory.title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </div>
              ))}
            </div>

            {/* Category Navigation Hint */}
            <div className="mt-12 text-center text-muted-foreground">
              <p>使用左右箭头或滚动鼠标浏览其他板块</p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[60] bg-background/98 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 p-3 rounded-full bg-card hover:bg-primary/20 text-foreground hover:text-primary transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <img
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 p-3 rounded-full bg-card hover:bg-primary/20 text-foreground hover:text-primary transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 rounded-full bg-card hover:bg-destructive/20 text-foreground hover:text-destructive transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export default WorksSection;
