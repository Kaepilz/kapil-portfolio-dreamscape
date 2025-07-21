import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-105"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Light</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Dark</span>
            </>
          )}
        </motion.div>
      </Button>
    </div>
  );
};