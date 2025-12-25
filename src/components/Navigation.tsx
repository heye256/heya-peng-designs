import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${isScrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-black/50'}
      `}
    >
      <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-gradient-gold font-bold text-lg md:text-xl">
          作品集
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => handleNavigate('works')}
            className="text-white underline underline-offset-4 hover:text-primary transition text-sm lg:text-base"
          >
            作品展示
          </button>

          <button
            onClick={() => handleNavigate('resume')}
            className="text-white underline underline-offset-4 hover:text-primary transition text-sm lg:text-base"
          >
            查看简历
          </button>

          <button
            onClick={() => handleNavigate('practice')}
            className="text-white underline underline-offset-4 hover:text-primary transition text-sm lg:text-base"
          >
            联系方式
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-primary transition"
          aria-label="菜单"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-border/20">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => handleNavigate('works')}
              className="text-white text-left py-3 px-4 rounded-lg hover:bg-white/10 transition"
            >
              作品展示
            </button>

            <button
              onClick={() => handleNavigate('resume')}
              className="text-white text-left py-3 px-4 rounded-lg hover:bg-white/10 transition"
            >
              查看简历
            </button>

            <button
              onClick={() => handleNavigate('practice')}
              className="text-white text-left py-3 px-4 rounded-lg hover:bg-white/10 transition"
            >
              联系方式
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
