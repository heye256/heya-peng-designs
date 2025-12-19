import { useState, useEffect } from 'react';
interface NavigationProps {
  onNavigate: (section: string) => void;
}
const Navigation = ({
  onNavigate
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-effect py-4' : 'py-6'}`}>
      <div className="container mx-auto items-center justify-between ml-0 mt-[9px] px-[38px] py-0 flex flex-row bg-[#04111f]/[0.59] pl-[39px] pr-[23px] text-primary-foreground rounded-md shadow-lg opacity-95">
        <div className="text-xl font-bold text-gradient-gold tracking-wider">
          作品集
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('works')} className="nav-link">
            作品展示
          </button>
          <button onClick={() => onNavigate('resume')} className="nav-link">
            查看简历
          </button>
          <button onClick={() => onNavigate('contact')} className="nav-link">
            联系方式
          </button>
        </div>
      </div>
    </nav>;
};
export default Navigation;