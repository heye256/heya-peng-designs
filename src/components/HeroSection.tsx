
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onBrowseWorks: () => void;
}

const HeroSection = ({ onBrowseWorks }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* 可选：透明遮罩 */}
        <div className="absolute inset-0 bg-gradient-hero opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/0 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-float hidden md:block" />
      <div
        className="absolute bottom-1/4 right-1/3 w-40 h-40 md:w-64 md:h-64 bg-primary/5 rounded-full blur-2xl animate-float hidden md:block"
        style={{ animationDelay: '2s' }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-foreground block">你好，我是
            <span className="text-gradient-gold block">何亚鹏
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-8 max-w-xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            专注<span className="text-primary font-medium">平面设计</span>与<span className="text-primary font-medium">3D美术</span>。
            熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke 等平面设计软件和三维动画制作软件。
          </p>

          <div
            className="animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={onBrowseWorks}
              className="hero-button group"
            >
              <span className="flex items-center gap-2">
                浏览作品
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </div>
    </section>
  );
};

export default HeroSection;
