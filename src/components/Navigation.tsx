import { useState, useEffect } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${isScrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-black/50'}
      `}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-gradient-gold font-bold text-xl">
          作品集
        </div>

        {/* Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('works')}
            className="text-white underline underline-offset-4 hover:text-primary transition"
          >
            作品展示
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="text-white underline underline-offset-4 hover:text-primary transition"
          >
            查看简历
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="text-white underline underline-offset-4 hover:text-primary transition"
          >
            联系方式
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
