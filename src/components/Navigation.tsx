
import { useState, useEffect } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // 滚动超过50px触发背景
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6"
      style={{
        // 黑色半透明背景，滚动前后一致，也可改为透明
    
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
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
    </nav>
  );
};

export default Navigation;
