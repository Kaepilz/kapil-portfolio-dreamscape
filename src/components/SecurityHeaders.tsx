import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Add security-related meta tags and headers via JavaScript
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Content Security Policy via meta tag (fallback)
    addMetaTag('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https: blob:; " +
      "connect-src 'self' https://api.openai.com https://*.supabase.co; " +
      "frame-src 'none'; " +
      "object-src 'none'; " +
      "base-uri 'self';"
    );

    // X-Frame-Options (prevent clickjacking)
    addMetaTag('X-Frame-Options', 'DENY');

    // X-Content-Type-Options (prevent MIME sniffing)
    addMetaTag('X-Content-Type-Options', 'nosniff');

    // Referrer Policy
    addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy
    addMetaTag('Permissions-Policy', 
      'geolocation=(), camera=(), microphone=(), payment=(), usb=(), bluetooth=()'
    );
  }, []);

  return null;
};