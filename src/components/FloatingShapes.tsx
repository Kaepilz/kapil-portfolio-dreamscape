import { motion } from "framer-motion";

export const FloatingShapes = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute top-[5%] left-[10%] w-16 h-16 bg-blue-500/20 rounded-full"
      animate={{
        y: [-10, 10, -10],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-[20%] right-[15%] w-12 h-12 border-2 border-purple-500/30 rounded-xl"
      animate={{
        rotate: [0, 180, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <motion.div
      className="absolute top-[50%] left-[20%] w-24 h-24 bg-primary/10 rounded-full blur-xl"
      animate={{
        x: [-15, 15, -15],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-[10%] right-[10%] w-20 h-20 border-4 border-pink-500/20 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-[30%] left-[5%] w-10 h-10 bg-green-500/20 rounded-lg"
      animate={{
        y: [-10, 10, -10],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-[15%] right-[40%] w-8 h-8 bg-yellow-500/20 rounded-full"
      animate={{
        x: [-5, 5, -5],
        y: [-5, 5, -5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-[5%] left-[30%] w-14 h-14 border-2 border-red-500/30 rounded-full"
      animate={{
        rotate: [0, -180, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
); 