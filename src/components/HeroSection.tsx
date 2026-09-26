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
        {/* 微信兼容：添加 webkit-playsinline, x5-video-player-type, x5-video-player-fullscreen */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          // @ts-ignore - 微信/QQ浏览器专用属性
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portrait"
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* 深色渐隐遮罩 - 移动端全覆盖，桌面端从左侧渐变 */}
        
      {/* 如果前面有背景/特效容器，则保留该闭合标签，否则请删除 */}
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
              能够将AI与自身技术结合高效地完成工作内容
            </p>

            {/* 描述文字：已补齐开标签 <p> 并添加行高与正文字色 */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              专注影视与广告领域的 AIGC 视觉创作者，擅长融合 3D 制作流程与生成式 AI 技术，
              依托扎实的美术绘画功底与审美把控，提供高完成度的商业视觉方案。
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
    </section>;
};
export default HeroSection;
