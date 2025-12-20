import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={`w-5 h-5 text-gray-600 dark:text-gray-400 absolute inset-0 transition-all duration-300 ${
          isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        <Moon className={`w-5 h-5 text-gray-600 dark:text-gray-400 absolute inset-0 transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`} />
      </div>
    </button>
  );
}
