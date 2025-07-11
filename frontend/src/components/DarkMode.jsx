// ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react' // Usa Moon e Sun di Bootstrap Icons (o quelli che vuoi)

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button className="icon-button" onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
