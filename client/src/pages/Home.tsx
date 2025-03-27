import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatbotModal from "@/components/ChatbotModal";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Prevent body scrolling when chat is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isChatOpen]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onChatToggle={handleChatToggle} />
      
      <main>
        <HeroSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      <ChatbotModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
}
