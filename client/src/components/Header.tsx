import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  onChatToggle: () => void;
}

export default function Header({ onChatToggle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm dark:shadow-gray-800' : 'bg-transparent'} z-50 py-4 transition-all duration-300`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary dark:text-blue-400">
          <span className="sr-only">Manan Sharma</span>
          <i className="fas fa-code mr-2"></i>Manan
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="font-medium hover:text-primary dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="font-medium hover:text-primary dark:hover:text-blue-400 transition-colors">Skills</a>
            <a href="#resume" className="font-medium hover:text-primary dark:hover:text-blue-400 transition-colors">Resume</a>
            <a href="#contact" className="font-medium hover:text-primary dark:hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="fas fa-moon"></i>
            ) : (
              <i className="fas fa-sun"></i>
            )}
          </button>

          {/* Chat Toggle Button */}
          <button
            onClick={onChatToggle}
            className="bg-primary text-white dark:bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center"
          >
            <i className="fas fa-comment-alt mr-2"></i>
            <span className="hidden md:inline">Chat</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white dark:bg-gray-900 shadow-md ${mobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 absolute w-full`}>
        <nav className="container mx-auto px-6 py-3 flex flex-col space-y-3">
          <a
            href="#about"
            className="py-2 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
            onClick={closeMobileMenu}
          >
            About
          </a>
          <a
            href="#skills"
            className="py-2 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
            onClick={closeMobileMenu}
          >
            Skills
          </a>
          <a
            href="#resume"
            className="py-2 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
            onClick={closeMobileMenu}
          >
            Resume
          </a>
          <a
            href="#contact"
            className="py-2 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
