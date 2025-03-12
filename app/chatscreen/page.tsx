"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, User, Bot } from "lucide-react"
import Image from "next/image"

export default function ChatScreen() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; timestamp: Date }[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }, [inputValue])

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const newMessages = [...messages, { text: inputValue, isUser: true, timestamp: new Date() }]
    setMessages(newMessages)
    setInputValue("")
    setIsChatOpen(true)

    
    setTimeout(() => {
      const responses = [
        "I can help you with that! What specific information do you need?",
        "Thanks for your question. Let me find that information for you.",
        "I understand what you're looking for. Here's what I found...",
        "That's a great question! The answer depends on a few factors...",
        "I'd be happy to assist with your request. Could you provide more details?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages([...newMessages, { text: randomResponse, isUser: false, timestamp: new Date() }])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 ">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="text-green-700 font-medium">OrderIt.prosessed.ai</div>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/profile.avif"
            alt="User profile"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {isChatOpen ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isUser ? "ml-3 bg-blue-500" : "mr-3 bg-green-600"}`}
                  >
                    {message.isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${message.isUser ? "bg-gray-200 text-white" : "bg-white border border-gray-200"}`}
                  >
                    <div className="text-sm text-black">{message.text}</div>
                    <div className={`text-xs mt-1 ${message.isUser ? "text-black" : "text-black"}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl font-bold text-gray-800">What can I help with?</h1>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 text-black">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="w-full py-3 pl-12 pr-12 bg-transparent outline-none resize-none min-h-[48px] max-h-[120px]"
              rows={1}
            />
            <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600">
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ""}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-3 transition-all ${
                inputValue.trim()
                  ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">Press Enter to send, Shift+Enter for a new line</div>
        </div>
      </div>
    </div>
  )
}

