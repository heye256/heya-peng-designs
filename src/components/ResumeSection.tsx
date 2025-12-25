import { Download, Eye, FileText, X } from 'lucide-react';
import { useState } from 'react';

interface ResumeSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const ResumeSection = ({ sectionRef }: ResumeSectionProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resumePdf = '/resume.pdf';
  const resumePreviewImage = '/resume-preview.jpg';

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-gold mb-4 md:mb-6">
              <FileText className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="text-gradient-gold">个人简历</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg">了解更多关于我的专业背景与工作经历</p>
          </div>

          {/* Resume Preview Card */}
          <div className="bg-gradient-card rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-card mb-8 md:mb-12">
            <div className="aspect-[3/4] max-h-[400px] sm:max-h-[480px] md:max-h-[560px] rounded-lg md:rounded-xl overflow-hidden mb-4 sm:mb-6 md:mb-8 mx-auto max-w-xs sm:max-w-sm md:max-w-md bg-muted/20 border border-border">
              <img src={resumePreviewImage} alt="个人简历预览图片" loading="lazy" className="w-full h-full object-cover" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={() => setIsPreviewOpen(true)} 
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-elevated"
              >
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
                预览简历
              </button>

              <a href={resumePdf} download="何亚鹏_简历.pdf" className="hero-button text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                <span className="flex items-center gap-2 md:gap-3">
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                  下载简历
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4" 
          onClick={() => setIsPreviewOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[85vh] md:max-h-[90vh] overflow-auto bg-card rounded-xl border border-border shadow-card" 
            onClick={e => e.stopPropagation()}
          >
            <img src={resumePreviewImage} alt="个人简历大图预览" className="w-full h-auto" />
          </div>

          <button 
            onClick={() => setIsPreviewOpen(false)} 
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-card hover:bg-muted text-foreground transition-all" 
            aria-label="关闭预览"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ResumeSection;