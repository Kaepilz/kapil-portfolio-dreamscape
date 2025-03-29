
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-kapil-blue-dark border-t border-kapil-blue-light/20 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold">
              <span className="text-kapil-red">K</span>apil
              <span className="text-kapil-red">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Web Developer & Designer
            </p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {currentYear} All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
