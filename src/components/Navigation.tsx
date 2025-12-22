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
  return <nav style={{
    backgroundColor: 'transparent',
    // 删除背景
    backdropFilter: 'none'
  }} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-0 py-[2px] bg-[#030303]/[0.57]">
      
    </nav>;
};
export default Navigation;