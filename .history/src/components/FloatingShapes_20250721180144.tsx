import { motion } from "framer-motion";

export const FloatingShapes = () => (
  <>
    <motion.div
      className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-xl"
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-lg"
      animate={{
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <motion.div
      className="absolute bottom-20 right-5 w-12 h-12 bg-gradient-to-br from-primary/40 to-pink-500/40 rounded-full"
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-10 left-10 w-24 h-24 border-2 border-primary/30 rounded-full"
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360] 
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity,
        ease: "linear" 
      }}
    />
    <motion.div 
      className="absolute bottom-1/2 left-1/4 w-16 h-16 border-2 border-blue-500/20 rounded-full"
      animate={{ 
        scale: [1.1, 1, 1.1],
        rotate: [360, 180, 0] 
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity,
        ease: "linear" 
      }}
    />
  </>
); 