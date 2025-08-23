import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Personal information about Kapil
const KAPIL_INFO = {
  name: "Kapil",
  age: 16,
  school: "Nerima Technical High School",
  location: "Tokyo, Japan",
  hobbies: ["Web Development", "UI/UX Design", "Programming", "Learning new technologies", "Creating digital experiences"],
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Node.js", "Python", "UI/UX Design", "Figma", "Photoshop"],
  workAvailability: "Available for freelance projects and internships",
  languages: ["English", "Japanese"],
  experience: "2+ years of web development experience",
  currentProjects: ["Personal Portfolio", "E-commerce Platform", "Mobile Apps"],
  contact: {
    email: "kapil@example.com",
    social: ["GitHub", "LinkedIn", "Twitter"]
  },
  education: "Currently studying at Nerima Technical High School in Tokyo, focusing on web development and computer science"
};

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onAnalyticsEvent?: (category: string, action: string, label?: string) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onAnalyticsEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm Kapil's AI assistant. I can answer questions about Kapil's background, skills, experience, and work availability. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveMessage = async (messageType: 'user' | 'bot', content: string) => {
    try {
      await supabase
        .from('chatbot_messages')
        .insert({
          session_id: sessionId,
          message_type: messageType,
          content: content,
          metadata: { timestamp: new Date().toISOString() }
        });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const trackFAQ = async (question: string) => {
    try {
      const questionHash = btoa(question.toLowerCase().trim()).slice(0, 50);
      
      // Check if question exists
      const { data: existing } = await supabase
        .from('faq_tracking')
        .select('*')
        .eq('question_hash', questionHash)
        .single();

      if (existing) {
        // Update count
        await supabase
          .from('faq_tracking')
          .update({
            count: existing.count + 1,
            last_asked: new Date().toISOString()
          })
          .eq('id', existing.id);
      } else {
        // Insert new question
        await supabase
          .from('faq_tracking')
          .insert({
            question: question,
            question_hash: questionHash,
            count: 1
          });
      }
    } catch (error) {
      console.error('Error tracking FAQ:', error);
    }
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm here to help you learn more about Kapil. Feel free to ask about his background, skills, projects, or availability for work.`;
    }

    // Name questions
    if (message.includes('name') || message.includes('who are you') || message.includes('who is kapil')) {
      return `I'm ${KAPIL_INFO.name}'s AI assistant. Kapil is a ${KAPIL_INFO.age}-year-old web developer and designer from ${KAPIL_INFO.location}.`;
    }

    // Age questions
    if (message.includes('age') || message.includes('old')) {
      return `Kapil is ${KAPIL_INFO.age} years old.`;
    }

    // School/Education questions
    if (message.includes('school') || message.includes('education') || message.includes('study')) {
      return `Kapil is currently studying at ${KAPIL_INFO.school} in ${KAPIL_INFO.location}. ${KAPIL_INFO.education}`;
    }

    // Skills questions
    if (message.includes('skills') || message.includes('technologies') || message.includes('programming')) {
      return `Kapil has expertise in: ${KAPIL_INFO.skills.join(', ')}. He has ${KAPIL_INFO.experience} and specializes in modern web development and UI/UX design.`;
    }

    // Hobbies questions
    if (message.includes('hobbies') || message.includes('interests') || message.includes('passion')) {
      return `Kapil's hobbies and interests include: ${KAPIL_INFO.hobbies.join(', ')}. He's passionate about creating beautiful and functional digital experiences.`;
    }

    // Work availability
    if (message.includes('work') || message.includes('hire') || message.includes('available') || message.includes('freelance')) {
      return `${KAPIL_INFO.workAvailability}. He's open to discussing new opportunities and collaborations. Feel free to reach out through the contact form!`;
    }

    // Location questions
    if (message.includes('location') || message.includes('where') || message.includes('from')) {
      return `Kapil is from ${KAPIL_INFO.location}. He's currently studying and working on various web development projects.`;
    }

    // Contact questions
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return `You can contact Kapil through the contact form on this website. He's also active on ${KAPIL_INFO.contact.social.join(', ')}.`;
    }

    // Projects questions
    if (message.includes('projects') || message.includes('portfolio') || message.includes('work examples')) {
      return `Kapil is currently working on: ${KAPIL_INFO.currentProjects.join(', ')}. You can see more of his work in the Projects section of this portfolio.`;
    }

    // Languages questions
    if (message.includes('languages') || message.includes('speak')) {
      return `Kapil speaks ${KAPIL_INFO.languages.join(' and ')}. He can communicate effectively in both languages for international projects.`;
    }

    // Default response
    return `I can help you learn about Kapil's background, skills, education, hobbies, work availability, and more. Try asking specific questions like "What are Kapil's skills?" or "Is Kapil available for work?"`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Save user message and track FAQ
    await Promise.all([
      saveMessage('user', userMessage),
      trackFAQ(userMessage)
    ]);

    // Analytics tracking
    onAnalyticsEvent?.('chatbot', 'message_sent', 'user_question');

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = generateResponse(userMessage);

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      await saveMessage('bot', botResponse);
      onAnalyticsEvent?.('chatbot', 'response_sent', 'bot_answer');
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => {
            setIsOpen(true);
            onAnalyticsEvent?.('chatbot', 'opened', 'chat_widget');
          }}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Card className={`bg-background border shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Kapil's Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me anything!</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                onAnalyticsEvent?.('chatbot', 'closed', 'chat_widget');
              }}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-2 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-2 rounded-lg text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Kapil..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
};