import { useState, useEffect } from 'react';
import { Mail, MessageCircle, Phone, ChevronDown, X, ChevronLeft, ChevronRight, Layers, Palette, Box, PenTool } from 'lucide-react';
interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
   const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };
    };
    window.addEventListener('scroll', handleScroll);
    const navItems = ['作品展示', '查看简历', '练习方式'];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all ${scrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">何亚鹏</div>
        <ul className="flex gap-8">
          {navItems.map(item => (
            <li key={item} className="text-white underline decoration-white underline-offset-4 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
