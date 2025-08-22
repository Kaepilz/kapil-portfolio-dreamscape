import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load heavy components
const LazySkills = lazy(() => import('./sections/Skills').then(module => ({ default: module.Skills })));
const LazyProjects = lazy(() => import('./sections/Projects'));

// Component loading fallback
const LoadingFallback: React.FC<{ height?: string }> = ({ height = 'h-64' }) => (
  <div className={`flex items-center justify-center ${height} bg-muted/20 rounded-lg animate-pulse`}>
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary/60 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

// Image with lazy loading and WebP support
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  webpSrc?: string;
  avifSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  webpSrc,
  avifSrc 
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      </picture>
      
      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

// Intersection Observer Hook for lazy loading
export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
          callback();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [callback, hasIntersected, options]);

  return ref;
};

// Lazy section wrapper
interface LazySectionProps {
  children: React.ReactNode;
  fallbackHeight?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({ children, fallbackHeight }) => {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  
  const ref = useIntersectionObserver(() => {
    setShouldLoad(true);
  });

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <Suspense fallback={<LoadingFallback height={fallbackHeight} />}>
          {children}
        </Suspense>
      ) : (
        <LoadingFallback height={fallbackHeight} />
      )}
    </div>
  );
};

// Resource preloader
export const ResourcePreloader: React.FC = () => {
  React.useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/images/profile.jpg',
      '/icons/html5.svg',
      '/icons/css3.svg',
      '/icons/javascript.svg',
      '/icons/react.svg',
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload fonts
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    fonts.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

  }, []);

  return null;
};

// Code splitting exports
export { LazySkills, LazyProjects };