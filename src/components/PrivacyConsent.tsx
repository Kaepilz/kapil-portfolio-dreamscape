import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cookie, BarChart3, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';

interface ConsentSettings {
  analytics: boolean;
  chatbot: boolean;
  marketing: boolean;
}

interface PrivacyConsentProps {
  onConsentChange: (consents: ConsentSettings) => void;
}

export const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consents, setConsents] = useState<ConsentSettings>({
    analytics: false,
    chatbot: false,
    marketing: false
  });
  const [sessionId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('privacy-consent');
    if (!hasConsent) {
      // Show banner after a delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      // Load existing consents
      try {
        const savedConsents = JSON.parse(hasConsent);
        setConsents(savedConsents);
        onConsentChange(savedConsents);
      } catch (error) {
        console.error('Error parsing saved consents:', error);
      }
    }
  }, [onConsentChange]);

  const handleConsentToggle = (type: keyof ConsentSettings) => {
    setConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveConsent = async (finalConsents: ConsentSettings) => {
    try {
      await supabase
        .from('privacy_consent')
        .insert({
          session_id: sessionId,
          analytics_consent: finalConsents.analytics,
          chatbot_consent: finalConsents.chatbot,
          marketing_consent: finalConsents.marketing,
          ip_address: '0.0.0.0', // Will be filled by server
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error saving consent:', error);
    }
  };

  const handleAcceptAll = async () => {
    const allConsents = { analytics: true, chatbot: true, marketing: true };
    setConsents(allConsents);
    localStorage.setItem('privacy-consent', JSON.stringify(allConsents));
    await saveConsent(allConsents);
    onConsentChange(allConsents);
    setIsVisible(false);
  };

  const handleAcceptSelected = async () => {
    localStorage.setItem('privacy-consent', JSON.stringify(consents));
    await saveConsent(consents);
    onConsentChange(consents);
    setIsVisible(false);
  };

  const handleRejectAll = async () => {
    const noConsents = { analytics: false, chatbot: false, marketing: false };
    setConsents(noConsents);
    localStorage.setItem('privacy-consent', JSON.stringify(noConsents));
    await saveConsent(noConsents);
    onConsentChange(noConsents);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className="max-w-4xl mx-auto bg-background/95 backdrop-blur-sm border shadow-xl">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Privacy & Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We respect your privacy. This website uses cookies and tracking to improve your experience and understand how you interact with our content. You can customize your preferences below.
                </p>

                {!showDetails ? (
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleAcceptAll} className="bg-primary hover:bg-primary/90">
                      Accept All
                    </Button>
                    <Button variant="outline" onClick={() => setShowDetails(true)}>
                      Customize Settings
                    </Button>
                    <Button variant="ghost" onClick={handleRejectAll}>
                      Reject All
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {/* Analytics Consent */}
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-blue-500" />
                          <div>
                            <h4 className="font-medium">Analytics</h4>
                            <p className="text-sm text-muted-foreground">
                              Help us understand how visitors use our website to improve your experience.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={consents.analytics}
                          onCheckedChange={() => handleConsentToggle('analytics')}
                        />
                      </div>

                      {/* Chatbot Consent */}
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-green-500" />
                          <div>
                            <h4 className="font-medium">Chatbot Interaction</h4>
                            <p className="text-sm text-muted-foreground">
                              Save your chat conversations to improve responses and track frequently asked questions.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={consents.chatbot}
                          onCheckedChange={() => handleConsentToggle('chatbot')}
                        />
                      </div>

                      {/* Marketing Consent */}
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Cookie className="w-5 h-5 text-orange-500" />
                          <div>
                            <h4 className="font-medium">Marketing & Personalization</h4>
                            <p className="text-sm text-muted-foreground">
                              Personalize content and remember your preferences across visits.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={consents.marketing}
                          onCheckedChange={() => handleConsentToggle('marketing')}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button onClick={handleAcceptSelected}>
                        Save Preferences
                      </Button>
                      <Button variant="outline" onClick={() => setShowDetails(false)}>
                        Back
                      </Button>
                      <Button variant="ghost" onClick={handleRejectAll}>
                        Reject All
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRejectAll}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};