import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

/**
 * Theme toggle component that switches between dark and light modes
 * Features a smooth rotation animation and icon transition
 */
export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <AnimatePresence mode="wait" initial={false}>
        <motion.button
          onClick={toggleTheme}
          key={theme === 'dark' ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-110"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-primary" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};