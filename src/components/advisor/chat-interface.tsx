"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

type Message = {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI financial advisor. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses for demo purposes
  const sampleResponses = {
    savings:
      "Based on your current spending patterns, I recommend setting up an automatic transfer of 15% of your income to a high-yield savings account. This could help you save an additional $450 per month.",
    debt: "Looking at your financial profile, I suggest focusing on paying off your high-interest debt first. By allocating an extra $200 monthly to your credit card debt, you could be debt-free in approximately 14 months.",
    budget:
      "For your vacation budget, I recommend setting aside $150-200 per month for the next 6 months. Based on your current expenses, you could reduce dining out by 30% to free up these funds without impacting your other financial goals.",
    invest:
      "Given your risk profile and financial goals, a diversified portfolio with 70% index funds, 20% bonds, and 10% cash reserves might be appropriate. Consider maximizing your retirement contributions before exploring additional investment options.",
    expenses:
      "I've analyzed your spending patterns and identified potential savings of $320 monthly. Your subscription services ($85), dining out ($150), and transportation costs ($85) are areas where small adjustments could lead to significant savings.",
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let responseContent =
        "I'm not sure how to help with that specific question. Could you provide more details about your financial situation?"

      // Check for keywords in the user's message
      const lowerInput = input.toLowerCase()
      if (lowerInput.includes("save") || lowerInput.includes("saving")) {
        responseContent = sampleResponses.savings
      } else if (lowerInput.includes("debt") || lowerInput.includes("loan") || lowerInput.includes("credit")) {
        responseContent = sampleResponses.debt
      } else if (lowerInput.includes("budget") || lowerInput.includes("vacation")) {
        responseContent = sampleResponses.budget
      } else if (lowerInput.includes("invest") || lowerInput.includes("stock")) {
        responseContent = sampleResponses.invest
      } else if (lowerInput.includes("expense") || lowerInput.includes("spend") || lowerInput.includes("cost")) {
        responseContent = sampleResponses.expenses
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        content: responseContent,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your financial question..."
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

