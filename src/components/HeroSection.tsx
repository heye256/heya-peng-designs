import { ChevronDown } from 'lucide-react';
interface HeroSectionProps {
  onBrowseWorks: () => void;
}
const HeroSection = ({
  onBrowseWorks
}: HeroSectionProps) => {
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* 左侧深色渐隐遮罩（关键） */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mr-[240px] px-0 pr-[240px] ml-0 pl-0">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {/* 标题 */}
            <h1 className="font-bold leading-tight mb-6 text-5xl md:text-6xl lg:text-7xl">
              <span className="text-white">你好，我是</span>
              <span className="text-gradient-gold">何亚鹏</span>
            </h1>

            {/* AI 技术亮点 */}
            <p className="text-xl md:text-2xl font-semibold text-primary mb-6 animate-pulse mx-[65px]">
              能够熟练的使用 AI 最新技术高效的完成工作内容
            </p>

            {/* 描述文字 */}
            <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl text-white mx-0 text-left py-0 px-0 pb-0 my-[11px]">
              专注
              <span className="text-primary font-medium"> 平面设计 </span>
              与
              <span className="text-primary font-medium"> 3D美术 </span>。
              <br />
              熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke
              等平面设计软件和三维动画制作软件。
            </p>

            {/* 按钮 */}
            <button onClick={onBrowseWorks} className="inline-flex items-center gap-3 bg-primary text-black font-bold px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition text-center mx-0">
              浏览作品
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>;
};
export default HeroSection;