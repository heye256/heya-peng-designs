import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onBrowseWorks: () => void;
}

const HeroSection = ({ onBrowseWorks }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* 深色渐隐遮罩 - 移动端全覆盖，桌面端从左侧渐变 */}
        <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-0 md:mr-[240px] md:pr-[240px]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            {/* 标题 */}
            <h1 className="font-bold leading-tight mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-white">你好，我是</span>
              <span className="text-gradient-gold">何亚鹏</span>
            </h1>

            {/* AI 技术亮点 */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-4 md:mb-6 animate-pulse">
              能够熟练的使用 AI 最新技术高效的完成工作内容
            </p>

            {/* 描述文字 */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-10 max-w-2xl text-white/90">
              专注
              <span className="text-primary font-medium"> 平面设计 </span>
              与
              <span className="text-primary font-medium"> 3D美术 </span>。
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke
              等平面设计软件和三维动画制作软件。
            </p>

            {/* 按钮 */}
            <button
              onClick={onBrowseWorks}
              className="inline-flex items-center gap-2 md:gap-3 bg-primary text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg hover:opacity-90 transition"
            >
              浏览作品
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white/60" />
      </div>
    </section>
  );
};

export default HeroSection;