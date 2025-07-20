import { motion } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
import { useAnimationMode } from '@/contexts/AnimationModeContext';
import { Button } from '@/components/ui/button';

export const ModeToggle = () => {
  const { mode, toggleMode } = useAnimationMode();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleMode}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-200"
      >
        <motion.div
          initial={false}
          animate={{ rotate: mode === 'animated' ? 360 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          {mode === 'animated' ? (
            <>
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Animated</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Normal</span>
            </>
          )}
        </motion.div>
      </Button>
    </div>
  );
};