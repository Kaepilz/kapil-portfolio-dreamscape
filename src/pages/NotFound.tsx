import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-kapil-blue-medium to-kapil-blue-dark flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-kapil-red rounded-full opacity-30"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Large 404 Text */}
          <motion.h1
            className="text-9xl md:text-[12rem] font-bold text-kapil-red mb-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            4
            <motion.span
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              0
            </motion.span>
            4
          </motion.h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for seems to have vanished into the digital void. 
              Let's get you back on track!
            </p>
          </motion.div>

          {/* Floating Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-kapil-blue-medium rounded-full flex items-center justify-center"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-12 h-12 text-kapil-red" />
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/">
                <Button
                  size="lg"
                  className="bg-kapil-red hover:bg-kapil-red/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="border-kapil-blue-light/30 hover:border-kapil-red hover:text-kapil-red px-8 py-3 text-lg font-semibold"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Help Text */}
          <motion.p
            className="text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            If you believe this is an error, please{" "}
            <Link 
              to="/#contact" 
              className="text-kapil-red hover:underline"
            >
              contact me
            </Link>
          </motion.p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-kapil-red/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-kapil-red/30 rounded-full"
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
