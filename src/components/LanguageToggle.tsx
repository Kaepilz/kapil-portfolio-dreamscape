
import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'jp' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
      >
        <Globe className="h-4 w-4 mr-2" />
        <motion.span
          key={i18n.language}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {i18n.language === 'en' ? '日本語' : 'English'}
        </motion.span>
      </Button>
    </motion.div>
  );
};
