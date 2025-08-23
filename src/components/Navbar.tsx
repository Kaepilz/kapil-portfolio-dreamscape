
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Home, User, Code, Briefcase, Mail, Sun, Moon } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

const NAV_ITEMS = [
  { label: "Home", href: "#home", icon: <Home className="w-4 h-4 mr-2" /> },
  { label: "About", href: "#about", icon: <User className="w-4 h-4 mr-2" /> },
  { label: "Services", href: "#services", icon: <Code className="w-4 h-4 mr-2" /> },
  { label: "Projects", href: "#projects", icon: <Briefcase className="w-4 h-4 mr-2" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4 mr-2" /> },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight &&
          sectionId
        ) {
          setActiveSection(`#${sectionId}`);
        }
      });

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // On mount, sync theme from localStorage or system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setDarkMode(false);
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-kapil-blue-dark/90 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a 
            href="#home" 
            className="text-xl md:text-2xl font-bold flex items-center"
          >
            <span className="text-kapil-red">K</span>apil
            <span className="text-kapil-red ml-0.5">.</span>
          </a>
          
          {/* Language toggle on the left side */}
          <LanguageToggle />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium hover:text-kapil-red transition-colors",
                activeSection === item.href
                  ? "text-kapil-red"
                  : "text-foreground/80"
              )}
            >
              {item.label}
              {activeSection === item.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-kapil-red rounded-full" />
              )}
            </a>
          ))}
          {/* Dark/Light mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-full bg-kapil-blue-light/20 hover:bg-kapil-blue-light/40 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-foreground p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-kapil-blue-dark/98 backdrop-blur-lg z-40 flex flex-col justify-center transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-8 py-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={cn(
                "text-lg font-medium flex items-center hover:text-kapil-red transition-colors",
                activeSection === item.href
                  ? "text-kapil-red"
                  : "text-foreground/80"
              )}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
