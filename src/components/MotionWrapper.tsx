import { motion, HTMLMotionProps } from 'framer-motion';
import { useAnimationMode } from '@/contexts/AnimationModeContext';
import { ReactNode } from 'react';

interface MotionWrapperProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  direction = 'up',
  ...props
}) => {
  const { isAnimated } = useAnimationMode();

  const directionMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  if (!isAnimated) {
    return <div {...(props as any)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionMap[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};