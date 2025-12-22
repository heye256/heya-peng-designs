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
        ${isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-black/30'}
      `}
    >
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gradient-gold tracking-wider">
          作品集
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('works')}
            className="text-white underline underline-offset-4 text-lg font-medium hover:text-primary transition-colors"
          >
            作品展示
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="text-white underline underline-offset-4 text-lg font-medium hover:text-primary transition-colors"
          >
            查看简历
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="text-white underline underline-offset-4 text-lg font-medium hover:text-primary transition-colors"
          >
            练习方式
          </button>
        </div>
      </div>
    </nav>
  );
};

export default
