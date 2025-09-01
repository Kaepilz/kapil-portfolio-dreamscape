
import { Github, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
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
              {t('footer.description')}
            </p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="https://github.com/Kaepilz" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/kapil-niure" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:kapilniure4@gmail.com" 
              className="text-muted-foreground hover:text-kapil-red transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {currentYear} {t('footer.allRightsReserved')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
