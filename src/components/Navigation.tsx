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
  }} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 mx-0 my-0 px-0 mt-0 ml-0 mb-0 py-0 bg-[#0f0f0f]/40">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-bold text-gradient-gold tracking-wider">
          作品集
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('works')} className="text-white underline text-lg font-medium hover:text-primary transition-colors">
            作品展示
          </button>
          <button onClick={() => onNavigate('resume')} className="text-white underline text-lg font-medium hover:text-primary transition-colors">
            查看简历
          </button>
          <button onClick={() => onNavigate('practice')} className="text-white underline text-lg font-medium hover:text-primary transition-colors">
            练习方式
          </button>
        </div>
      </div>
    </nav>;
};
export default Navigation;