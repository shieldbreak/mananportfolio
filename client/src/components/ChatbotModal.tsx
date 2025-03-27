import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi there! I'm John's Resume Assistant. I can answer questions about his experience, skills, education, and more. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    // Make API request to chat endpoint
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/chat", { message: userMessage });
      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the chatbot. Please try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBotResponse = (text: string) => {
    // Convert URLs to links
    let formattedText = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-primary dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Handle markdown-style lists
    formattedText = formattedText.replace(/\n- /g, '<br/>• ');
    
    // Handle line breaks
    formattedText = formattedText.replace(/\n/g, '<br/>');
    
    return formattedText;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center md:items-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div
            className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-xl md:rounded-xl shadow-xl transition-all max-h-[85vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h3 className="font-bold">Resume Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Groq Cloud AI</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex items-start ${message.role === 'user' ? 'justify-end' : ''} mb-4`}
                >
                  {message.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
                      <i className="fas fa-robot"></i>
                    </div>
                  )}
                  
                  <div 
                    className={`${
                      message.role === "user" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 dark:bg-gray-800"
                    } rounded-lg p-3 max-w-[80%]`}
                  >
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: formatBotResponse(message.content) }} />
                    )}
                  </div>
                  
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs ml-2 flex-shrink-0">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-600 dark:bg-gray-800" 
                  placeholder="Ask about my skills, experience, etc."
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-primary hover:bg-blue-600 text-white p-3 rounded-r-lg disabled:opacity-70"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
