import React, { useEffect } from 'react';

// Simple analytics tracker - in production, integrate with Google Analytics, Mixpanel, etc.
interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  url: string;
  userAgent: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.setupPageTracking();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private setupPageTracking() {
    // Track page views
    this.track('page_view', 'navigation', 'page_load');
    
    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.startTime;
      this.track('engagement', 'time_on_page', 'page_exit', timeOnPage);
      this.flushEvents();
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          this.track('engagement', 'scroll_depth', `${scrollPercent}_percent`);
        }
      }
    });

    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('a[href^="mailto:"], a[href^="tel:"]')) {
        this.track('contact', 'click', target.getAttribute('href') || 'unknown');
      }
      if (target.matches('a[download]')) {
        this.track('download', 'click', target.getAttribute('href') || 'resume');
      }
      if (target.matches('[data-analytics]')) {
        const category = target.dataset.analyticsCategory || 'interaction';
        const action = target.dataset.analyticsAction || 'click';
        const label = target.dataset.analyticsLabel || target.textContent || 'unknown';
        this.track(category, action, label);
      }
    });
  }

  public track(category: string, action: string, label?: string, value?: number) {
    const event: AnalyticsEvent = {
      event: `${category}_${action}`,
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.events.push(event);
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('analytics_events', JSON.stringify(this.events.slice(-100))); // Keep last 100 events
    } catch (e) {
      console.warn('Could not store analytics events:', e);
    }

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalyticsService(event);
    } else {
      console.log('Analytics Event:', event);
    }
  }

  private async sendToAnalyticsService(event: AnalyticsEvent) {
    // Example: Send to Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_session_id: this.sessionId
      });
    }

    // Example: Send to custom analytics endpoint
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.warn('Analytics service unavailable:', error);
    }
  }

  public getStats() {
    const stored = localStorage.getItem('analytics_events');
    const events = stored ? JSON.parse(stored) : this.events;
    
    return {
      totalEvents: events.length,
      sessionDuration: Date.now() - this.startTime,
      pageViews: events.filter((e: AnalyticsEvent) => e.category === 'navigation').length,
      contactClicks: events.filter((e: AnalyticsEvent) => e.category === 'contact').length,
      downloads: events.filter((e: AnalyticsEvent) => e.category === 'download').length,
      projectViews: events.filter((e: AnalyticsEvent) => e.category === 'project').length,
      mostViewedProjects: this.getMostViewedProjects(events),
      popularSections: this.getPopularSections(events)
    };
  }

  private getMostViewedProjects(events: AnalyticsEvent[]) {
    const projectEvents = events.filter(e => e.category === 'project' && e.action === 'view');
    const counts: { [key: string]: number } = {};
    
    projectEvents.forEach(event => {
      if (event.label) {
        counts[event.label] = (counts[event.label] || 0) + 1;
      }
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }

  private getPopularSections(events: AnalyticsEvent[]) {
    const sectionEvents = events.filter(e => e.category === 'navigation' && e.action === 'section_view');
    const counts: { [key: string]: number } = {};
    
    sectionEvents.forEach(event => {
      if (event.label) {
        counts[event.label] = (counts[event.label] || 0) + 1;
      }
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }

  private flushEvents() {
    if (this.events.length === 0) return;
    
    // Send batch to analytics service
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.events
        })
      }).catch(() => {
        // Ignore errors on page unload
      });
    }
  }
}

// Global analytics instance
const analytics = new AnalyticsService();

// React hooks for analytics
export const useAnalytics = () => {
  const trackEvent = React.useCallback((category: string, action: string, label?: string, value?: number) => {
    analytics.track(category, action, label, value);
  }, []);

  const trackPageView = React.useCallback((page: string) => {
    analytics.track('navigation', 'page_view', page);
  }, []);

  const trackProjectView = React.useCallback((projectName: string) => {
    analytics.track('project', 'view', projectName);
  }, []);

  const trackContactAction = React.useCallback((action: string, method?: string) => {
    analytics.track('contact', action, method);
  }, []);

  const getAnalyticsStats = React.useCallback(() => {
    return analytics.getStats();
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackProjectView,
    trackContactAction,
    getAnalyticsStats
  };
};

// Performance monitoring
export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) return; // Prevent duplicate monitoring

    // First Contentful Paint (FCP)
    const paintObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          analytics.track('performance', 'fcp', 'timing', Math.round(entry.startTime));
        }
      });
    });
    
    try {
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Observer not supported
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      analytics.track('performance', 'lcp', 'timing', Math.round(lastEntry.startTime));
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Observer not supported
    }

    // Cumulative Layout Shift (CLS)
    let cumulativeLayoutShiftScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          cumulativeLayoutShiftScore += entry.value;
        }
      });
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Observer not supported
    }

    // Send CLS score when page is hidden
    const sendCLS = () => {
      analytics.track('performance', 'cls', 'score', Math.round(cumulativeLayoutShiftScore * 1000));
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendCLS();
      }
    });

    // Resource loading performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          analytics.track('performance', 'page_load_time', 'timing', Math.round(navigation.loadEventEnd - navigation.fetchStart));
          analytics.track('performance', 'dom_content_loaded', 'timing', Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart));
        }
      }, 0);
    });

    // Mark as initialized
    (window as any)['web-vital'] = true;
  }, []);

  return null;
};

// User behavior tracking
export const BehaviorTracker: React.FC = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track device and browser info
    const deviceInfo = {
      screen: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio,
      touchSupport: 'ontouchstart' in window,
      language: navigator.language,
      platform: navigator.platform
    };

    trackEvent('device_info', 'session_start', JSON.stringify(deviceInfo));

    // Track form interactions
    const trackFormInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea, select')) {
        const form = target.closest('form');
        const formName = form?.dataset.form || form?.id || 'unknown';
        const fieldName = target.getAttribute('name') || target.getAttribute('id') || 'unknown';
        trackEvent('form_interaction', e.type, `${formName}_${fieldName}`);
      }
    };

    document.addEventListener('focus', trackFormInteraction, true);
    document.addEventListener('blur', trackFormInteraction, true);

    return () => {
      document.removeEventListener('focus', trackFormInteraction, true);
      document.removeEventListener('blur', trackFormInteraction, true);
    };
  }, [trackEvent]);

  return null;
};

export { analytics };