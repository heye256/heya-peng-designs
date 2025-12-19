import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WorksSection from '@/components/WorksSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const worksRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLElement>> = {
      works: worksRef,
      resume: resumeRef,
      contact: contactRef,
    };
    
    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrowseWorks = () => {
    worksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={scrollToSection} />
      <HeroSection onBrowseWorks={handleBrowseWorks} />
      <WorksSection sectionRef={worksRef} />
      <ResumeSection sectionRef={resumeRef} />
      <ContactSection sectionRef={contactRef} />
    </div>
  );
};

export default Index;
