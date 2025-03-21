"use client"

import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, User, Bot, FilePlus, ShoppingCart, UserPlus, Info, X } from "lucide-react";

const features = [
  { 
    icon: <ShoppingCart className="w-6 h-6 text-purple-700" />, 
    text: "Create Order", 
    prompt: "Create order for customer jaspreetfoods with Parle Milk Shakti 350gm 14 carton, delivery on 30th March 2025",
    description: "Generate orders quickly"
  },
  { 
    icon: <FilePlus className="w-6 h-6 text-purple-700" />, 
    text: "Create an Item", 
    prompt: "Create an Item - \"XYZ NAME\"",
    description: "Add new products"
  },
  { 
    icon: <UserPlus className="w-6 h-6 text-purple-700" />, 
    text: "Create a Customer", 
    prompt: "Create a Customer - \"XYZ\"",
    description: "Add customer profiles"
  },
  { 
    icon: <Info className="w-6 h-6 text-purple-700" />, 
    text: "About Prosessed", 
    prompt: "About Prosessed",
    description: "Learn about our platform"
  },
];

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; timestamp: Date; attachment?: File }[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentAttachment, setCurrentAttachment] = useState<File | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentAttachment(e.target.files[0]);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setCurrentAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = (message: string) => {
    if (message.trim() === "" && !currentAttachment) return;
    
    const newMessage = { 
      text: message, 
      isUser: true, 
      timestamp: new Date(),
      attachment: currentAttachment || undefined
    };
    
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputValue("");
    setCurrentAttachment(null);
    setIsChatOpen(true);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setTimeout(() => {
      const responses = [
        "I can help you with that! What specific information do you need?",
        "Thanks for your question. Let me find that information for you.",
        "I understand what you're looking for. Here's what I found...",
        "That's a great question! The answer depends on a few factors...",
        "I'd be happy to assist with your request. Could you provide more details?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages([...newMessages, { text: randomResponse, isUser: false, timestamp: new Date() }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex flex-col items-center justify-center py-4 bg-gradient-to-r from-purple-100 via-white to-purple-100 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">OrderIT</h1>
        <p className="text-sm text-gray-600">Powered by Prosessed.ai</p>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6">
        {isChatOpen ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div 
                    className={`chat-avatar ${
                      message.isUser 
                        ? "ml-3 bg-gradient-to-r from-purple-500 to-indigo-500" 
                        : "mr-3 bg-gradient-to-r from-green-500 to-blue-500"
                    }`}
                  >
                    {message.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div 
                    className={`message-bubble ${
                      message.isUser 
                        ? "bg-gray-200 text-gray-800" 
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="text-sm">{message.text}</div>
                    {message.attachment && (
                      <div className="mt-2 p-2 bg-gray-100 rounded-lg text-xs flex items-center">
                        <Paperclip className="w-3 h-3 mr-1" />
                        <span className="truncate">{message.attachment.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">What can I help with?</h1>
        
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                onClick={() => handleSendMessage(feature.prompt)}
                className="w-64 h-36 rounded-xl feature-card hover:cursor-pointer border border-gray-300 flex flex-col items-center justify-center p-4 text-center"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-1 text-gray-600">{feature.text}</h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-xl border border-gray-300 shadow-sm overflow-hidden">
            {currentAttachment && (
              <div className="mx-12 mt-2 p-2 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  <Paperclip className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="truncate">{currentAttachment.name}</span>
                </div>
                <button 
                  onClick={removeAttachment}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div className="flex items-center">
              <button 
                onClick={handleAttachmentClick}
                className="pl-3 py-3 text-gray-500 hover:text-purple-600 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 py-3 text-gray-700 pl-2 pr-12 bg-transparent outline-none resize-none min-h-[48px] max-h-[120px]"
                rows={1}
              />
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              <button 
                onClick={() => handleSendMessage(inputValue)} 
                disabled={inputValue.trim() === "" && !currentAttachment}
                className={`mr-2 rounded-full p-2 ${
                  inputValue.trim() !== "" || currentAttachment
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

