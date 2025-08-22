import React, { useEffect } from 'react';

// Content Security Policy configuration
const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https: http:",
  "media-src 'self' data: blob:",
  "connect-src 'self' https://api.github.com https://api.openai.com https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com",
  "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
  "worker-src 'self' blob:",
  "child-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join('; ');

export const SecurityHeaders: React.FC = () => {
  useEffect(() => {
    // Set Content Security Policy via meta tag (backup for server headers)
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = CSP_POLICY;
    document.head.appendChild(cspMeta);

    // Additional security measures
    
    // Disable right-click context menu in production (optional)
    if (process.env.NODE_ENV === 'production') {
      const disableRightClick = (e: MouseEvent) => {
        if (e.button === 2) {
          e.preventDefault();
          return false;
        }
      };
      document.addEventListener('contextmenu', disableRightClick);
      
      // Disable common keyboard shortcuts for viewing source
      const disableKeyboardShortcuts = (e: KeyboardEvent) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
          return false;
        }
      };
      document.addEventListener('keydown', disableKeyboardShortcuts);

      return () => {
        document.removeEventListener('contextmenu', disableRightClick);
        document.removeEventListener('keydown', disableKeyboardShortcuts);
      };
    }

    // CSRF protection for forms
    const addCSRFToken = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        if (!form.querySelector('input[name="csrf_token"]')) {
          const csrfInput = document.createElement('input');
          csrfInput.type = 'hidden';
          csrfInput.name = 'csrf_token';
          csrfInput.value = generateCSRFToken();
          form.appendChild(csrfInput);
        }
      });
    };

    // Generate a simple CSRF token
    const generateCSRFToken = (): string => {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    // Add CSRF tokens to forms
    addCSRFToken();

    // Monitor for new forms added dynamically
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'FORM' || element.querySelector('form')) {
                addCSRFToken();
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      document.head.removeChild(cspMeta);
    };
  }, []);

  return null;
};

// Rate limiting hook for API calls and form submissions
export const useRateLimit = (maxRequests: number = 10, windowMs: number = 60000) => {
  const requests = React.useRef<number[]>([]);

  const isAllowed = React.useCallback((): boolean => {
    const now = Date.now();
    const window = now - windowMs;
    
    // Remove old requests outside the time window
    requests.current = requests.current.filter(timestamp => timestamp > window);
    
    // Check if we're within the rate limit
    if (requests.current.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    requests.current.push(now);
    return true;
  }, [maxRequests, windowMs]);

  const getRemainingRequests = React.useCallback((): number => {
    const now = Date.now();
    const window = now - windowMs;
    const validRequests = requests.current.filter(timestamp => timestamp > window);
    return Math.max(0, maxRequests - validRequests.length);
  }, [maxRequests, windowMs]);

  const getResetTime = React.useCallback((): number => {
    if (requests.current.length === 0) return 0;
    const oldestRequest = Math.min(...requests.current);
    return Math.max(0, (oldestRequest + windowMs) - Date.now());
  }, [windowMs]);

  return {
    isAllowed,
    getRemainingRequests,
    getResetTime
  };
};

// XSS protection utility
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Secure local storage wrapper
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encrypted = btoa(encodeURIComponent(value)); // Simple encoding
      localStorage.setItem(`secure_${key}`, encrypted);
    } catch (error) {
      console.warn('Secure storage setItem failed:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const encrypted = localStorage.getItem(`secure_${key}`);
      if (!encrypted) return null;
      return decodeURIComponent(atob(encrypted));
    } catch (error) {
      console.warn('Secure storage getItem failed:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(`secure_${key}`);
  },
  
  clear: (): void => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
  }
};

// Input validation utilities
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
  },
  
  name: (name: string): boolean => {
    return name.length >= 2 && name.length <= 100 && /^[a-zA-Z\s\-\'\.]+$/.test(name);
  },
  
  message: (message: string): boolean => {
    return message.length >= 10 && message.length <= 5000;
  },
  
  sanitizeInput: (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
};