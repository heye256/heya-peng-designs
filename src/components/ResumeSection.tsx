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
    <section ref={sectionRef} className="relative py-24 min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-gold mb-6">
              <FileText className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-gold">个人简历</span>
            </h2>
            <p className="text-muted-foreground text-lg">了解更多关于我的专业背景与工作经历</p>
          </div>

          {/* Resume Preview Card */}
          <div className="bg-gradient-card rounded-2xl p-8 shadow-card mb-12">
            <div className="aspect-[3/4] max-h-[560px] rounded-xl overflow-hidden mb-8 mx-auto max-w-md bg-muted/20 border border-border">
              <img
                src={resumePreviewImage}
                alt="个人简历预览图片"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-elevated"
              >
                <Eye className="w-5 h-5" />
                预览简历
              </button>

              <a href={resumePdf} download="何亚鹏_简历.pdf" className="hero-button">
                <span className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  下载简历
                </span>
              </a>
            </div>
          </div>

          {/* Skills Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['PS', 'AI', 'ZBrush', 'Nuke'].map((skill) => (
              <div
                key={skill}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-primary font-semibold">{skill}</span>
              </div>
            ))}
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
            className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-card rounded-xl border border-border shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resumePreviewImage}
              alt="个人简历大图预览"
              className="w-full h-auto"
            />
          </div>

          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-card hover:bg-muted text-foreground transition-all"
            aria-label="关闭预览"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ResumeSection;
