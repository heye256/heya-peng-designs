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
        <div className="absolute inset-0 bg-gradient-hero opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/0 to-transparent bg-[#f2f2f2]/0" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{
      animationDelay: '2s'
    }} />

      {/* Content */}
      <div className="container relative z-10 my-0 px-[8px] mx-px">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{
          fontFamily: 'var(--font-display)'
        }}>
            <span className="text-foreground mx-0">你好，我是</span>
            <span className="text-gradient-gold">何亚鹏</span>
          </h1>
          
          <p style={{
          animationDelay: '0.2s'
        }} className="text-lg md:text-xl leading-relaxed mb-8 animate-slide-up max-w-2xl text-center text-white mx-[11px]">专注平面设计与3D美术。 熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke 等平面设计软件和三维动画制作软件。<span className="text-primary font-medium">平面设计</span>与<span className="text-primary font-medium">3D美术</span>。
  熟悉 PS、AI、Maya、Substance Painter、ZBrush、Marvelous Designer、Nuke 等平面设计软件和三维动画制作软件。
        </p>


          <div style={{
          animationDelay: '0.4s'
        }} className="animate-slide-up my-0 mx-[222px] border-0">
            <button onClick={onBrowseWorks} className="hero-button group font-bold shadow-sm opacity-100 my-0 mb-0 mr-0 text-center mx-0 px-[31px] py-[6px] text-2xl font-sans rounded-2xl">
              <span className="flex items-center gap-2 mx-[12px] my-[6px] text-center">
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
    </section>;
};
export default HeroSection;