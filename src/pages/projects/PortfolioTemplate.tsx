import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Download, Copy, Check, Laptop, Tablet, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const PORTFOLIO_SECTIONS = [
  {
    id: "hero",
    title: "Hero Section",
    description: "Full-screen introduction with your name, title, and a brief tagline.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470",
  },
  {
    id: "about",
    title: "About Section",
    description: "Share your professional background, skills, and personal story.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470",
  },
  {
    id: "projects",
    title: "Projects Gallery",
    description: "Showcase your best work with descriptions and links.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1455",
  },
  {
    id: "skills",
    title: "Skills & Expertise",
    description: "Highlight your technical and professional capabilities.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470",
  },
  {
    id: "contact",
    title: "Contact Form",
    description: "Allow visitors to easily reach out to you.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470",
  },
];

const COLOR_THEMES = [
  { name: "Dark Mode", primary: "#6366f1", background: "#0f172a" },
  { name: "Light Mode", primary: "#8b5cf6", background: "#f8fafc" },
  { name: "Forest", primary: "#22c55e", background: "#0a0f0d" },
  { name: "Ocean", primary: "#0ea5e9", background: "#0c1a27" },
  { name: "Sunset", primary: "#f59e0b", background: "#18181b" },
];

const TEMPLATE_FEATURES = [
  "Responsive design works on all devices",
  "Fast loading performance",
  "SEO optimized",
  "Customizable sections",
  "Dark & light modes",
  "Contact form integration",
  "Social media links",
  "Project showcase",
  "Blog ready",
  "Analytics integration"
];

const CODE_SNIPPET = `
// Example React component for the Hero section
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Name
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Web Developer & Designer
        </p>
        <button className="px-6 py-3 bg-primary text-white rounded-md">
          View Projects
        </button>
      </div>
    </motion.section>
  );
};

export default Hero;
`;

const PortfolioTemplate = () => {
  const [activeDevice, setActiveDevice] = useState("desktop");
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied to clipboard",
      description: "Code snippet has been copied to your clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-kapil-blue-medium to-kapil-blue-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          
          <Button className="bg-kapil-red hover:bg-kapil-red/90">
            <Download className="mr-2 h-4 w-4" /> Get Template
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Portfolio Website Template</h1>
              <p className="text-muted-foreground">
                A modern, customizable portfolio template for creative professionals, built with React and Tailwind CSS.
              </p>
            </div>
            
            <div className="bg-kapil-blue-medium/50 p-4 rounded-lg border border-kapil-blue-light/20">
              <div className="flex items-center justify-between mb-4 border-b border-kapil-blue-light/20 pb-4">
                <div className="flex gap-2">
                  <Button 
                    variant={activeDevice === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDevice("desktop")}
                  >
                    <Laptop className="h-4 w-4 mr-2" />
                    Desktop
                  </Button>
                  <Button 
                    variant={activeDevice === "tablet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDevice("tablet")}
                  >
                    <Tablet className="h-4 w-4 mr-2" />
                    Tablet
                  </Button>
                  <Button 
                    variant={activeDevice === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </Button>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="preview">
                  <TabsList>
                    <TabsTrigger 
                      value="preview" 
                      className={activeTab === "preview" ? "bg-kapil-red" : ""}
                    >
                      Preview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="code" 
                      className={activeTab === "code" ? "bg-kapil-red" : ""}
                    >
                      Code
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <TabsContent value="preview">
                <div className={`
                  overflow-hidden rounded-md border border-kapil-blue-light/20 bg-background
                  ${activeDevice === "desktop" ? "w-full h-[400px]" : ""}
                  ${activeDevice === "tablet" ? "w-[768px] h-[400px] mx-auto" : ""}
                  ${activeDevice === "mobile" ? "w-[375px] h-[600px] mx-auto" : ""}
                `}>
                  <iframe
                    src="https://portfolio-template-demo.web.app"
                    title="Portfolio Template Preview"
                    className="w-full h-full"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="code">
                <div className="relative">
                  <pre className="bg-kapil-blue-dark/80 p-4 rounded-md overflow-x-auto text-sm">
                    <code className="text-white">{CODE_SNIPPET}</code>
                  </pre>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleCopyCode}
                  >
                    {!copied ? (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-kapil-blue-medium/50 border-kapil-blue-light/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Template Features</h2>
                <ul className="space-y-2">
                  {TEMPLATE_FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-kapil-blue-medium/50 border-kapil-blue-light/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {["React", "Tailwind CSS", "TypeScript", "Framer Motion", "Vite"].map((tech, i) => (
                    <Badge key={i} className="bg-kapil-blue-dark">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
              <Button className="w-full bg-kapil-red hover:bg-kapil-red/90">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Color Themes</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {COLOR_THEMES.map((theme, i) => (
              <div 
                key={i}
                className={`
                  rounded-md p-4 cursor-pointer transition-all
                  ${selectedTheme === i ? 'ring-2 ring-kapil-red' : 'hover:ring-1 hover:ring-kapil-blue-light'}
                `}
                style={{ background: theme.background }}
                onClick={() => setSelectedTheme(i)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium" style={{ color: theme.primary }}>{theme.name}</h3>
                  <div className="w-4 h-4 rounded-full" style={{ background: theme.primary }}></div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-3/4 rounded-sm" style={{ background: theme.primary, opacity: 0.8 }}></div>
                  <div className="h-2 w-1/2 rounded-sm bg-gray-400 opacity-30"></div>
                  <div className="h-2 w-5/6 rounded-sm bg-gray-400 opacity-30"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Template Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_SECTIONS.map((section) => (
              <Card key={section.id} className="bg-kapil-blue-medium/50 overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Card className="bg-kapil-blue-medium/50 border-kapil-blue-light/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to create your professional portfolio?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Get started with this template today and showcase your work to potential clients and employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-kapil-red hover:bg-kapil-red/90">
                <Download className="mr-2 h-4 w-4" /> Download Template
              </Button>
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" /> View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioTemplate;
