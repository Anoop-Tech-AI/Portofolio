import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.6)] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
