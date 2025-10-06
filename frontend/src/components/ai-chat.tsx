"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface AIChatProps {
  className?: string
}

export function AIChat({ className }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am your AI assistant specialized in NASA environmental and meteorological data. How can I help you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to the last message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate AI response
  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      'Based on NASA data, I can provide information about climate patterns, air quality, and meteorological phenomena. What specifically would you like to know?',
      'Environmental data shows interesting trends. I can analyze information about temperature, humidity, winds, and atmospheric pressure for you.',
      'Excellent question! NASA satellites collect real-time data on various environmental aspects. I can explain any specific metric you are interested in.',
      'Based on available meteorological data, I can help you understand climate patterns, forecasts, and detailed environmental analyses.',
      'NASA data reveals valuable information about climate change and atmospheric conditions. What type of analysis do you need?'
    ]
    
    // More specific response based on content
    if (userMessage.toLowerCase().includes('temperature') || userMessage.toLowerCase().includes('temperatura')) {
      return 'NASA temperature data shows significant variations. Currently, global average temperature is being monitored through multiple satellites. I can provide detailed analyses on warming or cooling trends in specific regions.'
    }
    
    if (userMessage.toLowerCase().includes('humidity') || userMessage.toLowerCase().includes('umidade')) {
      return 'Relative humidity is a crucial indicator for weather forecasting. NASA data shows that humidity varies between 30-80% depending on region and season. I can analyze specific humidity patterns for you.'
    }
    
    if (userMessage.toLowerCase().includes('wind') || userMessage.toLowerCase().includes('vento')) {
      return 'Wind patterns are continuously monitored by NASA satellites. Speeds vary from 5-25 km/h under normal conditions, but can reach extreme values during storms. I can provide detailed analyses on air currents.'
    }
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000) // Delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-sm">AI Assistant - NASA</h2>
            <p className="text-xs text-muted-foreground">Environmental data specialist</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 text-green-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 max-w-[80%]',
              message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className={cn(
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-primary text-primary-foreground'
              )}>
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
            
            <div className={cn(
              'flex flex-col gap-1',
              message.role === 'user' ? 'items-end' : 'items-start'
            )}>
              <Card className={cn(
                'p-3 max-w-full',
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-muted'
              )}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </Card>
              <span className="text-xs text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="p-3 bg-muted">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">Typing...</span>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me a question or request an action"
              className="pr-12"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  )
}