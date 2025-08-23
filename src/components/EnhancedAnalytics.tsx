import React, { useEffect, useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConsentSettings {
  analytics: boolean;
  chatbot: boolean;
  marketing: boolean;
}

interface AnalyticsEvent {
  event_type: string;
  event_category: string;
  event_action: string;
  event_label?: string;
  event_value?: number;
  page_url: string;
  user_agent: string;
  referrer?: string;
  metadata?: Record<string, any>;
}

interface EnhancedAnalyticsProps {
  consents: ConsentSettings;
}

export const EnhancedAnalytics: React.FC<EnhancedAnalyticsProps> = ({ consents }) => {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [startTime] = useState(() => Date.now());
  const [pageViews, setPageViews] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);

  // Device detection
  const getDeviceInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    let browser = 'unknown';
    let os = 'unknown';

    // Device type detection
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      deviceType = 'mobile';
    }

    // Browser detection
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // OS detection
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    return { deviceType, browser, os };
  }, []);

  // Track analytics event
  const trackEvent = useCallback(async (
    category: string,
    action: string,
    label?: string,
    value?: number,
    metadata?: Record<string, any>
  ) => {
    if (!consents.analytics) return;

    try {
      const deviceInfo = getDeviceInfo();
      const event: AnalyticsEvent = {
        event_type: 'custom',
        event_category: category,
        event_action: action,
        event_label: label,
        event_value: value,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || undefined,
        metadata: metadata
      };

      await supabase
        .from('analytics_events')
        .insert({
          session_id: sessionId,
          ...event,
          ...deviceInfo
        });

      console.log('Analytics event tracked:', { category, action, label });
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }, [consents.analytics, sessionId, getDeviceInfo]);

  // Initialize session tracking
  useEffect(() => {
    if (!consents.analytics) return;

    const initSession = async () => {
      try {
        const deviceInfo = getDeviceInfo();
        await supabase
          .from('user_sessions')
          .insert({
            session_id: sessionId,
            page_views: 1,
            messages_sent: 0,
            referrer: document.referrer || null,
            ...deviceInfo
          });

        // Track initial page view
        await trackEvent('navigation', 'page_view', window.location.pathname);
        setPageViews(1);
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    initSession();
  }, [consents.analytics, sessionId, getDeviceInfo, trackEvent]);

  // Track page views on route changes
  useEffect(() => {
    if (!consents.analytics) return;

    const handleRouteChange = () => {
      trackEvent('navigation', 'page_view', window.location.pathname);
      setPageViews(prev => prev + 1);
    };

    // Listen for history changes (SPA navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(handleRouteChange, 0);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(handleRouteChange, 0);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [consents.analytics, trackEvent]);

  // Track scroll depth
  useEffect(() => {
    if (!consents.analytics) return;

    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            trackEvent('engagement', 'scroll_depth', `${threshold}_percent`, threshold);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [consents.analytics, trackEvent]);

  // Track time on page and clicks
  useEffect(() => {
    if (!consents.analytics) return;

    // Track clicks on important elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Track external links
      if (target.matches('a[href^="http"]')) {
        const href = target.getAttribute('href');
        trackEvent('outbound', 'click', href || 'unknown');
      }

      // Track button clicks
      if (target.matches('button') || target.closest('button')) {
        const button = target.matches('button') ? target : target.closest('button');
        const buttonText = button?.textContent?.trim() || 'unknown';
        trackEvent('interaction', 'button_click', buttonText);
      }

      // Track navigation clicks
      if (target.matches('nav a') || target.closest('nav a')) {
        const link = target.matches('a') ? target : target.closest('a');
        const linkText = link?.textContent?.trim() || 'unknown';
        trackEvent('navigation', 'nav_click', linkText);
      }
    };

    document.addEventListener('click', handleClick);

    // Track session end
    const handleBeforeUnload = async () => {
      const sessionDuration = Math.round((Date.now() - startTime) / 1000);
      
      try {
        await supabase
          .from('user_sessions')
          .update({
            ended_at: new Date().toISOString(),
            duration_seconds: sessionDuration,
            page_views: pageViews,
            messages_sent: messagesSent
          })
          .eq('session_id', sessionId);

        // Track session end event
        await trackEvent('engagement', 'session_end', 'page_unload', sessionDuration);
      } catch (error) {
        console.error('Error updating session:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [consents.analytics, trackEvent, sessionId, startTime, pageViews, messagesSent]);

  // Expose analytics function globally for other components
  useEffect(() => {
    (window as any).trackAnalytics = trackEvent;
    
    return () => {
      delete (window as any).trackAnalytics;
    };
  }, [trackEvent]);

  // Component doesn't render anything
  return null;
};

// Hook for using analytics in other components
export const useAnalytics = () => {
  const trackEvent = useCallback((
    category: string,
    action: string,
    label?: string,
    value?: number,
    metadata?: Record<string, any>
  ) => {
    if ((window as any).trackAnalytics) {
      (window as any).trackAnalytics(category, action, label, value, metadata);
    }
  }, []);

  return { trackEvent };
};