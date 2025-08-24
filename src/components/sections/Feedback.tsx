import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Star, User, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface FeedbackForm {
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
}

const categories = [
  { id: 'general', label: 'General Feedback', icon: MessageCircle },
  { id: 'design', label: 'Design & UI/UX', icon: Star },
  { id: 'technical', label: 'Technical Skills', icon: MessageSquare },
  { id: 'collaboration', label: 'Collaboration', icon: User },
];

const ratingLabels = {
  1: 'Poor',
  2: 'Fair', 
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
};

interface FeedbackProps {
  onAnalyticsEvent?: (category: string, action: string, label?: string) => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ onAnalyticsEvent }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FeedbackForm>({
    name: '',
    email: '',
    rating: 0,
    category: '',
    message: ''
  });

  const handleInputChange = (field: keyof FeedbackForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    onAnalyticsEvent?.('feedback', 'rating_selected', `${rating}_stars`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in your name and message.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save feedback to database
      const { error } = await supabase
        .from('feedback_messages')
        .insert({
          name: formData.name,
          email: formData.email || null,
          rating: formData.rating || null,
          category: formData.category || 'general',
          message: formData.message,
          ip_address: null, // Could be populated server-side
          user_agent: navigator.userAgent,
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'portfolio_website',
            language: localStorage.getItem('language') || 'en'
          }
        });

      if (error) throw error;

      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: ''
      });

      // Analytics tracking
      onAnalyticsEvent?.('feedback', 'form_submitted', formData.category);

      toast({
        title: 'Thank You!',
        description: 'Your feedback has been submitted successfully. I appreciate your input!'
      });

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Submission Error',
        description: 'Failed to submit feedback. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Share Your Feedback
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your feedback helps me improve and grow. I'd love to hear your thoughts about my work, skills, or potential collaboration opportunities.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-background border shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Rating */}
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
                    {formData.rating > 0 && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {ratingLabels[formData.rating as keyof typeof ratingLabels]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <Label>Feedback Category</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <motion.button
                          key={category.id}
                          type="button"
                          onClick={() => handleInputChange('category', category.id)}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            formData.category === category.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{category.label}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Your Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts, suggestions, or feedback..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="w-full resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Feedback
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Info Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">Why Your Feedback Matters</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Continuous Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      Your insights help me understand what works well and what can be improved in my projects and approach.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Better Collaboration</h4>
                    <p className="text-sm text-muted-foreground">
                      Understanding client perspectives helps me tailor my communication and work style for successful partnerships.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Professional Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Constructive feedback is essential for my development as a young professional in the tech industry.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>I'll read your feedback carefully within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>If you provided an email, I may reach out for clarification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Your feedback influences future projects and improvements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>All feedback is kept confidential and secure</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};