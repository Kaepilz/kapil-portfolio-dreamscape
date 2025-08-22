import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQItem {
  question: string;
  answer: string;
  count: number;
}

// Kapil's information database
const KAPIL_INFO = {
  name: "Niure Kapil",
  age: "16 (born July 22, 2009)",
  school: "Nerima Technical High School, Japan",
  location: "Kiyose, Tokyo, Japan",
  email: "kapilniure4@gmail.com",
  phone: "07022472273",
  skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Node.js"],
  skillLevel: "beginner to intermediate",
  availability: "2–4 days/week, 3–4 hours/day, including weekends",
  interests: ["coding", "football", "entrepreneurship", "AI development"],
  goals: "become a software engineer, later product manager and CEO",
  projects: [
    { name: "E-Commerce Platform", description: "Modern shopping platform with React and payment integration" },
    { name: "Travel Agency Website", description: "Beautiful travel booking site with destination showcase" },
    { name: "Finance Dashboard", description: "Data visualization dashboard with charts and analytics" },
    { name: "Coffee Brand Identity", description: "Complete branding package for premium coffee company" },
    { name: "Fitness App Interface", description: "Mobile UI design for workout tracking app" },
    { name: "Portfolio Website Template", description: "Customizable portfolio template for creatives" }
  ],
  socialLinks: {
    github: "https://github.com/Kapilz",
    linkedin: "https://www.linkedin.com/in/kapil-niure/?originalSubdomain=jp",
    facebook: "https://www.facebook.com/niure.kapil"
  }
};

// FAQ tracking - in a real app, this would be stored in a database
const FAQ_STORAGE_KEY = 'kapil_portfolio_faq';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm Kapil's AI assistant. I can tell you everything about Kapil Niure - his skills, projects, availability, and goals. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState<'en' | 'jp'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load FAQ data from localStorage
  useEffect(() => {
    const savedFAQ = localStorage.getItem(FAQ_STORAGE_KEY);
    if (savedFAQ) {
      // In a real app, you'd display this data in an admin dashboard
      console.log('FAQ Analytics:', JSON.parse(savedFAQ));
    }
  }, []);

  // Simple AI response logic based on Kapil's info
  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Detect language (simple check)
    const isJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(userMessage);
    const currentLang = isJapanese ? 'jp' : 'en';
    
    if (currentLang !== language) {
      setLanguage(currentLang);
    }

    // Track FAQ for analytics
    trackFAQ(userMessage);

    if (currentLang === 'jp') {
      // Japanese responses
      if (msg.includes('名前') || msg.includes('誰')) {
        return `私は${KAPIL_INFO.name}です。16歳の高校生で、東京の練馬工業高等学校に通っています。`;
      }
      if (msg.includes('年齢') || msg.includes('歳')) {
        return `私は${KAPIL_INFO.age}です。`;
      }
      if (msg.includes('スキル') || msg.includes('技術')) {
        return `私のスキル: ${KAPIL_INFO.skills.join('、')}。現在${KAPIL_INFO.skillLevel}レベルです。`;
      }
      if (msg.includes('仕事') || msg.includes('働く') || msg.includes('勤務')) {
        return `私の勤務可能時間: ${KAPIL_INFO.availability}。プロジェクトのご相談はいつでもお気軽にどうぞ！`;
      }
      if (msg.includes('連絡') || msg.includes('メール') || msg.includes('電話')) {
        return `連絡先: メール ${KAPIL_INFO.email}、電話 ${KAPIL_INFO.phone}。お気軽にご連絡ください！`;
      }
      if (msg.includes('プロジェクト') || msg.includes('作品')) {
        return `私の主要プロジェクト: ${KAPIL_INFO.projects.map(p => p.name).join('、')}。詳細はポートフォリオをご覧ください。`;
      }
      if (msg.includes('目標') || msg.includes('将来')) {
        return `将来の目標: ${KAPIL_INFO.goals}。技術を通じて世の中をより良くしたいです！`;
      }
      return `申し訳ございませんが、その質問についてはまだ学習中です。具体的には、私のスキル、プロジェクト、勤務可能時間、連絡先などについてお聞きください。また、メール ${KAPIL_INFO.email} で直接お問い合わせいただけます。`;
    } else {
      // English responses
      if (msg.includes('name') || msg.includes('who are you') || msg.includes('introduction')) {
        return `I'm ${KAPIL_INFO.name}, a 16-year-old web developer and designer from ${KAPIL_INFO.location}. I'm currently studying at ${KAPIL_INFO.school}.`;
      }
      if (msg.includes('age') || msg.includes('old')) {
        return `I'm ${KAPIL_INFO.age}. Young but passionate about technology and development!`;
      }
      if (msg.includes('skills') || msg.includes('technologies') || msg.includes('what can you do')) {
        return `My technical skills include: ${KAPIL_INFO.skills.join(', ')}. I'm currently at ${KAPIL_INFO.skillLevel} level and continuously learning new technologies.`;
      }
      if (msg.includes('work') || msg.includes('availability') || msg.includes('hire') || msg.includes('freelance')) {
        return `I'm available for work ${KAPIL_INFO.availability}. I love taking on new challenges and collaborating on interesting projects!`;
      }
      if (msg.includes('weekend') || msg.includes('saturday') || msg.includes('sunday')) {
        return `Yes, I can work on weekends! My availability is ${KAPIL_INFO.availability}, which includes weekend work.`;
      }
      if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach')) {
        return `You can reach me at: 📧 ${KAPIL_INFO.email} or 📱 ${KAPIL_INFO.phone}. I usually respond within 24 hours!`;
      }
      if (msg.includes('projects') || msg.includes('portfolio') || msg.includes('work examples')) {
        const projectList = KAPIL_INFO.projects.map(p => `• ${p.name}: ${p.description}`).join('\n');
        return `Here are my key projects:\n${projectList}\n\nCheck out my full portfolio for live demos and source code!`;
      }
      if (msg.includes('goals') || msg.includes('future') || msg.includes('career') || msg.includes('dreams')) {
        return `My career goals: ${KAPIL_INFO.goals}. I'm passionate about using technology to create positive impact in the world!`;
      }
      if (msg.includes('interests') || msg.includes('hobbies') || msg.includes('like')) {
        return `My interests include: ${KAPIL_INFO.interests.join(', ')}. I believe in balancing technology with sports and entrepreneurial thinking!`;
      }
      if (msg.includes('location') || msg.includes('where') || msg.includes('live')) {
        return `I'm based in ${KAPIL_INFO.location}. I'm open to both local and remote opportunities.`;
      }
      if (msg.includes('school') || msg.includes('education') || msg.includes('study')) {
        return `I'm currently studying at ${KAPIL_INFO.school}, where I'm developing both technical and practical skills for my career in technology.`;
      }
      if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('budget')) {
        return `I offer competitive rates for students and small businesses. Let's discuss your project requirements and budget - I'm flexible and want to help bring your ideas to life! Contact me at ${KAPIL_INFO.email}`;
      }
      if (msg.includes('github') || msg.includes('linkedin') || msg.includes('social')) {
        return `You can find me on:\n• GitHub: ${KAPIL_INFO.socialLinks.github}\n• LinkedIn: ${KAPIL_INFO.socialLinks.linkedin}\n• Facebook: ${KAPIL_INFO.socialLinks.facebook}`;
      }
    }

    return language === 'jp' 
      ? `申し訳ございませんが、その質問についてはまだ学習中です。私のスキル、プロジェクト、勤務可能時間、連絡先などについてお聞きください。また、メール ${KAPIL_INFO.email} で直接お問い合わせいただけます。`
      : `I'm still learning about that topic! Feel free to ask me about Kapil's skills, projects, availability, contact information, or career goals. For specific questions, you can also reach out directly at ${KAPIL_INFO.email}`;
  };

  const trackFAQ = (question: string) => {
    try {
      const savedFAQ = localStorage.getItem(FAQ_STORAGE_KEY);
      const faqData: FAQItem[] = savedFAQ ? JSON.parse(savedFAQ) : [];
      
      const existingItem = faqData.find(item => 
        item.question.toLowerCase().includes(question.toLowerCase().substring(0, 20))
      );
      
      if (existingItem) {
        existingItem.count++;
      } else {
        faqData.push({
          question: question.substring(0, 100), // Limit length
          answer: generateResponse(question),
          count: 1
        });
      }
      
      // Keep only top 50 FAQs
      faqData.sort((a, b) => b.count - a.count);
      const limitedFAQ = faqData.slice(0, 50);
      
      localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(limitedFAQ));
    } catch (error) {
      console.log('FAQ tracking error:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - 400, e.clientX - startX));
      const newY = Math.max(0, Math.min(window.innerHeight - 600, e.clientY - startY));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl z-50"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="h-6 w-6" />
            {/* Notification badge */}
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            className={`fixed bg-background border border-border rounded-lg shadow-2xl z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}
            style={{ left: position.x, top: position.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-t-lg cursor-move"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bot className="h-6 w-6 text-primary" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Kapil's AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help!</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 h-8 w-8"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[400px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`flex items-start space-x-2 max-w-[280px] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                        <div className={`p-2 rounded-full ${message.isBot ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>
                        <Card className={`p-3 ${message.isBot ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start space-x-2 max-w-[280px]">
                        <div className="p-2 rounded-full bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </div>
                        <Card className="p-3 bg-muted">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </Card>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={language === 'jp' ? "メッセージを入力..." : "Ask me anything about Kapil..."}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {language === 'jp' 
                      ? "カピルのスキル、プロジェクト、連絡先について何でもお聞きください！" 
                      : "Ask about Kapil's skills, projects, availability, or contact info!"
                    }
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
