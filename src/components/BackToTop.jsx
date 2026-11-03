import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-zinc-900/90 text-cyan-400 border border-zinc-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:bg-zinc-800 transition-all duration-200 group cursor-pointer backdrop-blur-md"
    >
      <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
