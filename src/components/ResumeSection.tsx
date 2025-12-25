import { Download, Eye, FileText } from 'lucide-react';

interface ResumeSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const ResumeSection = ({ sectionRef }: ResumeSectionProps) => {
  const resumePdf = '/resume.pdf';

  const handlePreview = () => {
    window.open(resumePdf, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = '何亚鹏_简历.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <p className="text-muted-foreground text-lg">
              了解更多关于我的专业背景与工作经历
            </p>
          </div>

          {/* Resume Preview Card */}
          <div className="bg-gradient-card rounded-2xl p-8 shadow-card mb-12">
            <div className="aspect-[3/4] max-h-[500px] rounded-xl overflow-hidden mb-8 mx-auto max-w-md bg-muted/20 flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="w-24 h-24 text-primary/60 mx-auto mb-4" />
                <p className="text-muted-foreground">PDF 简历</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePreview}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-elevated"
              >
                <Eye className="w-5 h-5" />
                预览简历
              </button>
              
              <button
                onClick={handleDownload}
                className="hero-button"
              >
                <span className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  下载简历
                </span>
              </button>
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
    </section>
  );
};

export default ResumeSection;
