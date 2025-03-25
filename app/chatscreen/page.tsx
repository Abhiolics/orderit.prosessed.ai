"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  User,
  Bot,
  FilePlus,
  ShoppingCart,
  UserPlus,
  Info,
  X,
} from "lucide-react";

// Define types for the feature objects
interface Feature {
  icon: React.ReactNode;
  text: string;
  prompt: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ShoppingCart className="w-6 h-6 text-purple-700" />,
    text: "Create Order",
    prompt: "Create order for customer jaspreetfoods with Parle Milk Shakti 350gm 14 carton, delivery on 30th March 2025",
    description: "Generate orders quickly",
  },
  {
    icon: <FilePlus className="w-6 h-6 text-purple-700" />,
    text: "Create an Item",
    prompt: 'Create an Item - "XYZ NAME"',
    description: "Add new products",
  },
  {
    icon: <UserPlus className="w-6 h-6 text-purple-700" />,
    text: "Create a Customer",
    prompt: 'Create a Customer - "XYZ"',
    description: "Add customer profiles",
  },
  {
    icon: <Info className="w-6 h-6 text-purple-700" />,
    text: "About Prosessed",
    prompt: "About Prosessed",
    description: "Learn about our platform",
  },
];

// Define a type for the message structure
interface Message {
  text: React.ReactNode | string;
  isUser: boolean;
  timestamp: Date;
  attachment?: File;
  isTable?: boolean;
  isProcessStep?: boolean;
  stepIndex?: number;
  isLoading?: boolean;
}

// Define a type for the rows in message.text (order rows)
interface OrderRow {
  name: string;
  rate: string;
  uom: string;
  info: string;
}

const simulateAssistantSteps = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const formattedText = nextDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

  const steps = [
    { text: "📂 Fetching customer details", animClass: "loading-dots" },
    { text: "🛒 Getting your items ready, putting them in the cart", animClass: "loading-dots" },
    { text: `📅 Setting delivery date to: ${formattedText}`, animClass: "loading-dots" },
    { text: "🏢 Setting default warehouse", animClass: "loading-dots" },
    { text: "✅ Creating your order", animClass: "loading-dots" },
  ];

  let chain = Promise.resolve();

  // Clear previous loading messages to avoid duplication
  setMessages((prev) => prev.filter((msg) => !msg.isLoading));

  // Staggered display of messages with loading dots
  steps.forEach((step, index) => {
    chain = chain.then(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev.filter((msg) => !msg.isProcessStep || msg.stepIndex !== index),
            {
              text: (
                <span className={`${step.animClass} loading-step`}>
                  {step.text}
                </span>
              ),
              isUser: false,
              timestamp: new Date(),
              isProcessStep: true,
              stepIndex: index,
              isLoading: true,
            },
          ]);

          // Show "Hold on" message after the last step
          if (index === steps.length - 1) {
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  text: <span className="shimmer-text">Hold on</span>,
                  isUser: false,
                  timestamp: new Date(),
                  isLoading: true,
                },
              ]);
              
              setIsProcessing(true);
            }, 1000);
          }

          resolve();
        }, 1200); // Staggered timing for natural flow
      });
    });
  });

  return chain;
};

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return;
    }

    setCurrentAttachment(file);
    handleSendMessage(""); // trigger message send on file select
  };

  const handleAttachmentClick = () => {
    if (!isProcessing) fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setCurrentAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (message: string) => {
    if (message.trim() === "" && !currentAttachment) return;

    const file = currentAttachment;

    const userMsg: Message = {
      text: message || (file ? "📎 Uploaded PDF" : ""),
      isUser: true,
      timestamp: new Date(),
      attachment: file || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsChatOpen(true);
    setCurrentAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // ✅ PDF Upload
    if (file) {
      setIsProcessing(true);

      setMessages((prev) => [
        ...prev,
        {
          text: (
            <span className="loading-dots">
              📤 Uploading and analyzing your file
            </span>
          ),
          isUser: false,
          timestamp: new Date(),
          isLoading: true,
        },
      ]);

      try {
        await simulateAssistantSteps(setMessages, setIsProcessing);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          "https://orderit-ai-85232016121.us-central1.run.app/api/parse_pdf",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Upload failed");

        const result = await res.json();
        const items = result?.data?.items || [];

        const formatted = items.map((item: { item_name: string, rate: string, uom: string, description: string }) => ({
          name: item.item_name,
          rate: item.rate,
          uom: item.uom,
          info: item.description || "—",
        }));

        // Remove all loading messages before showing final result
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          {
            text: "✅ Order created successfully!",
            isUser: false,
            timestamp: new Date(),
          },
          {
            text: "*Here is your order summary:",
            isUser: false,
            timestamp: new Date(),
          },
          {
            text: formatted,
            isUser: false,
            isTable: true,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        console.error("PDF Upload Error:", err);
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          {
            text: "⚠️ Failed to process PDF. Please try again.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsProcessing(false);
      }

      return;
    }

    // ✅ Text Message Handling
    setTimeout(() => {
      const randomResponse = "Let me help with that. What exactly would you like to do?";
      setMessages((prev) => [
        ...prev,
        { text: randomResponse, isUser: false, timestamp: new Date() },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
              <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`chat-avatar ${message.isUser ? "ml-3 bg-gradient-to-r from-purple-500 to-indigo-500" : "mr-3 bg-gradient-to-r from-green-500 to-blue-500"}`}>
                    {message.isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>
                  <div className={`message-bubble ${message.isUser ? "bg-gray-200 text-gray-800 rounded-lg p-3" : "bg-white border border-gray-200 text-gray-800 rounded-lg p-3"}`}>
                    {message.isTable ? (
                      <div className="overflow-x-auto text-sm table-shimmer">
                        <table className="min-w-full border border-gray-200 text-left text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 py-2">Item Name</th>
                              <th className="px-3 py-2">Rate</th>
                              <th className="px-3 py-2">UOM</th>
                              <th className="px-3 py-2">Important Info</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(message.text) &&
                              (message.text as OrderRow[]).map((row, i) => (
                                <tr key={i} className="border-t">
                                  <td className="px-3 py-2">{row.name}</td>
                                  <td className="px-3 py-2">{row.rate}</td>
                                  <td className="px-3 py-2">{row.uom}</td>
                                  <td className="px-3 py-2">{row.info}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-sm whitespace-pre-line">{message.text}</div>
                    )}
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
                <div key={index} onClick={() => handleSendMessage(feature.prompt)} className="w-64 h-36 rounded-xl feature-card hover:cursor-pointer border border-gray-300 flex flex-col items-center justify-center p-4 text-center">
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
                <button onClick={removeAttachment} className="text-gray-500 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center">
              <button onClick={handleAttachmentClick} className={`pl-3 py-3 ${isProcessing ? "opacity-50 cursor-not-allowed" : "text-gray-500 hover:text-purple-600"}`} disabled={isProcessing}>
                <Paperclip className="w-5 h-5" />
              </button>

              <textarea ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask anything..." className="flex-1 py-3 text-gray-700 pl-2 pr-12 bg-transparent outline-none resize-none min-h-[48px] max-h-[120px]" rows={1} />

              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />

              <button onClick={() => handleSendMessage(inputValue)} disabled={(inputValue.trim() === "" && !currentAttachment) || isProcessing} className={`mr-2 rounded-full p-2 ${inputValue.trim() !== "" || currentAttachment ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg" : "bg-gray-200 text-gray-400"}`}>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2 text-center">Press Enter to send, Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  );
};

export default Index;

