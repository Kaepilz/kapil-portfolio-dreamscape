import React, { createContext, useContext, useState, useEffect } from 'react';

export type AnimationMode = 'normal' | 'animated';

interface AnimationModeContextType {
  mode: AnimationMode;
  toggleMode: () => void;
  isAnimated: boolean;
}

const AnimationModeContext = createContext<AnimationModeContextType | undefined>(undefined);

export const useAnimationMode = () => {
  const context = useContext(AnimationModeContext);
  if (!context) {
    throw new Error('useAnimationMode must be used within an AnimationModeProvider');
  }
  return context;
};

export const AnimationModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AnimationMode>(() => {
    const saved = localStorage.getItem('animation-mode');
    return (saved as AnimationMode) || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('animation-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'normal' ? 'animated' : 'normal');
  };

  const isAnimated = mode === 'animated';

  return (
    <AnimationModeContext.Provider value={{ mode, toggleMode, isAnimated }}>
      {children}
    </AnimationModeContext.Provider>
  );
};