import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, Github, Twitter, Linkedin, Facebook, Download } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Have a project in mind or want to collaborate? Feel free to reach out to me
            through the contact form or using the information below.
          </p>
        </motion.div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <motion.a
            href="/resume.pdf"
            download="Kapil_Niure_Resume.pdf"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-kapil-red to-kapil-red/80 hover:from-kapil-red/90 hover:to-kapil-red text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-5 w-5" />
            Download Resume
          </motion.a>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-kapil-blue-medium border-kapil-blue-light/20 hover:border-kapil-red/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Feel free to reach out using any of these methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: MapPin, label: "Location", value: "Kiyose, Tokyo, Japan" },
                    { icon: Mail, label: "Email", value: "kapilniure4@gmail.com", href: "mailto:kapilniure4@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+81 70 2247 2273", href: "tel:+817022472273" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-10 h-10 bg-kapil-blue-dark rounded-lg p-2.5 text-kapil-red mr-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon className="w-full h-full" />
                      </motion.div>
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-muted-foreground hover:text-kapil-red transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-kapil-blue-medium border-kapil-blue-light/20 hover:border-kapil-red/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Let's Connect</CardTitle>
                  <CardDescription>
                    Follow me on social media for updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: "https://github.com/Kaepilz", label: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/kapil-niure", label: "LinkedIn" },
                      { icon: Facebook, href: "https://www.facebook.com/niure.kapil", label: "Facebook" }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 bg-kapil-blue-dark rounded-lg flex items-center justify-center text-muted-foreground hover:text-kapil-red transition-colors"
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
          </motion.div>
          
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-kapil-blue-medium border-kapil-blue-light/20 hover:border-kapil-red/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Send Me a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                        { id: "email", label: "Your Email", placeholder: "john@example.com", type: "email" }
                      ].map((field, index) => (
                        <motion.div
                          key={field.id}
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        >
                          <label htmlFor={field.id} className="text-sm font-medium">
                            {field.label}
                          </label>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id={field.id}
                              name={field.id}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.id as keyof typeof formData]}
                              onChange={handleInputChange}
                              required
                              className="bg-kapil-blue-dark border-kapil-blue-light/30 focus:border-kapil-red transition-all duration-200"
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Project Inquiry"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="bg-kapil-blue-dark border-kapil-blue-light/30 focus:border-kapil-red transition-all duration-200"
                        />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="message" className="text-sm font-medium">
                        Your Message
                      </label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="min-h-[150px] bg-kapil-blue-dark border-kapil-blue-light/30 focus:border-kapil-red transition-all duration-200"
                        />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-kapil-red hover:bg-kapil-red/90 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <motion.div 
                              className="flex items-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.svg 
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </motion.svg>
                              Sending...
                            </motion.div>
                          ) : (
                            <div className="flex items-center">
                              <span>Send Message</span>
                              <Send className="ml-2 h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
