import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onBrowseWorks?: () => void;
}

export const HeroSection = ({ onBrowseWorks }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            {/* 标题 */}
            <h1 className="font-bold leading-tight mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-white">你好，我是</span>{' '}
              <span className="text-gradient-gold">何亚鹏</span>
            </h1>

            {/* AI 技术亮点 */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-4 md:mb-6 animate-pulse">
              能够将AI与自身技术结合高效地完成工作内容
            </p>

            {/* 描述文字 */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
              专注影视与广告领域的 AIGC 视觉创作者，擅长融合 3D 制作流程与生成式 AI 技术，
              依托扎实的美术绘画功底与审美把控，提供高完成度的商业视觉方案。
            </p>

            {/* 按钮 */}
            {onBrowseWorks && (
              <button 
                onClick={onBrowseWorks} 
                className="inline-flex items-center gap-2 md:gap-3 bg-primary text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg hover:opacity-90 transition"
              >
                浏览作品
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
