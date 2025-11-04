import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Facebook, User, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

// Input sanitization
const sanitizeInput = (input: string) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+=/gi, '')
              .trim();
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  purpose: string;
  rating: number;
}

const formPurposes = [
  { id: 'hire', label: 'Hire Me', icon: User },
  { id: 'collaboration', label: 'Collaboration', icon: MessageSquare },
  { id: 'feedback', label: 'Feedback', icon: Star },
  { id: 'general', label: 'General Inquiry', icon: Mail },
];

export const UnifiedContact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    purpose: '',
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<number>(0);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    if (typeof value === 'string') {
      value = sanitizeInput(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting - prevent spam (1 submission per 30 seconds)
    const now = Date.now();
    if (now - lastSubmission < 30000) {
      toast({
        title: 'Too Many Requests',
        description: 'Please wait 30 seconds before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    // Validation
    if (!formData.name || !formData.message) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in your name and message.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.message.length < 10) {
      toast({
        title: 'Message Too Short',
        description: 'Please provide a more detailed message (at least 10 characters).',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine which table to use based on purpose
      const isfeedback = formData.purpose === 'feedback';
      
      if (isfeedback) {
        // Insert into feedback_messages table
        const { error } = await supabase
          .from('feedback_messages')
          .insert({
            name: formData.name,
            email: formData.email || null,
            rating: formData.rating || null,
            category: 'general',
            message: formData.message,
            user_agent: navigator.userAgent,
            metadata: {
              purpose: formData.purpose,
              subject: formData.subject,
              timestamp: new Date().toISOString(),
              source: 'unified_contact_form',
              language: localStorage.getItem('language') || 'en'
            }
          });

        if (error) throw error;
      } else {
        // For other purposes, we could create a general contacts table
        // For now, let's also use feedback_messages with different category
        const { error } = await supabase
          .from('feedback_messages')
          .insert({
            name: formData.name,
            email: formData.email || null,
            rating: null,
            category: formData.purpose || 'general',
            message: formData.message,
            user_agent: navigator.userAgent,
            metadata: {
              purpose: formData.purpose,
              subject: formData.subject,
              timestamp: new Date().toISOString(),
              source: 'unified_contact_form',
              language: localStorage.getItem('language') || 'en'
            }
          });

        if (error) throw error;
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        purpose: '',
        rating: 0,
      });

      setLastSubmission(now);

      toast({
        title: t('messages.messageSent'),
        description: t('messages.messageDescription'),
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Error',
        description: 'Failed to submit your message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.location'),
      value: "Kiyose, Tokyo, Japan",
      href: "https://maps.google.com/?q=Kiyose,Tokyo,Japan"
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: "kapilniure4@gmail.com",
      href: "mailto:kapilniure4@gmail.com"
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: "+81 070-2247-2273",
      href: "tel:+81-070-2247-2273"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Kaepilz", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/kapil-niure", label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/niure.kapil", label: "Facebook" }
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.contactInfo')}</CardTitle>
                <CardDescription>
                  {t('contact.contactDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-primary/10 rounded-lg p-2.5 text-primary mr-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-full h-full" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <a 
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.connect')}</CardTitle>
                <CardDescription>
                  {t('contact.socialDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.sendMessage')}</CardTitle>
                <CardDescription>
                  {t('contact.formDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Purpose Selection */}
                  <div className="space-y-3">
                    <Label>Purpose of Contact</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formPurposes.map((purpose) => {
                        const Icon = purpose.icon;
                        return (
                          <motion.button
                            key={purpose.id}
                            type="button"
                            onClick={() => handleInputChange('purpose', purpose.id)}
                            className={`p-3 rounded-lg border transition-all text-left ${
                              formData.purpose === purpose.id
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50 hover:bg-primary/5'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{purpose.label}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        maxLength={100}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                    <Input
                      id="subject"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      maxLength={200}
                    />
                  </div>

                  {/* Rating for feedback */}
                  {formData.purpose === 'feedback' && (
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Overall Rating (Optional)
                      </Label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            className={`w-8 h-8 ${
                              star <= formData.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-muted-foreground hover:text-yellow-400'
                            } transition-colors`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Star className="w-full h-full" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      className="min-h-[150px]"
                      maxLength={2000}
                    />
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          {t('contact.form.sending')}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span>{t('contact.form.send')}</span>
                          <Send className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};