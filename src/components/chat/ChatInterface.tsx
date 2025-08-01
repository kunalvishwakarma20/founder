'use client'
import Link from "next/link"
import { toast } from 'sonner'
import { format } from 'date-fns'
import { baseUrl } from "@/base_url"
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { Card, CardHeader } from "@/components/ui/card"
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect } from "react"
import { Sparkles, BookOpen, Target, Lightbulb, Send, Smile, Paperclip, Mic, ImageIcon } from 'lucide-react'


const getSessionId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('chatSessionId') || Date.now().toString();
  }
  return Date.now().toString();
};

const setSessionId = (id: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatSessionId', id);
  }
};

const clearSessionId = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('chatSessionId');
  }
};

export interface ChatMessage {
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date | string;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatInterfaceProps {
  initialMessages: ChatMessage[];
  bookId?: string;
  bookTitle?: string;
  onChatCreated?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialMessages = [],
  onChatCreated,
  bookId: BookId = '',
  bookTitle: BookTitle = '',
}) => {
  const searchParams = useSearchParams();
  const bookId = BookId || searchParams.get('bookId') || '';
  const bookTitle = BookTitle || searchParams.get('title') || '';

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    if (!initialMessages) {
      const newSessionId = Date.now().toString()
      setSessionId(newSessionId)
    }
  }, [initialMessages])

  const sessionId = getSessionId()

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const tempMessage: ChatMessage = {
      sender: 'user',
      message,
      timestamp: new Date(),
      status: 'sending'
    }

    setIsLoading(true)
    setChatHistory(prev => [...prev, tempMessage])
    setMessage('')
    
    try {
      const response = await fetch(`${baseUrl}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          message: tempMessage.message,
          sessionId,
          bookId,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setChatHistory(data.data.messages)
        if (!initialMessages && onChatCreated) {
          onChatCreated()
        }
      } else {
        if (data.error === 'Chat not found' || data.error === 'Chat deleted') {
          clearSessionId()
          router.push('/dashboard/chat')
          return
        }
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to send message. Please try again.')
      setChatHistory(prev => prev.map(msg => 
        msg === tempMessage 
          ? { ...msg, status: 'error' }
          : msg
      ))
    } finally {
      setIsLoading(false)
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  const formatMessage = (text: string) => {
    return text.trim();
  };

  const MessageBubble = ({ chat }: { chat: ChatMessage }) => {
    const isUser = chat.sender === 'user';
    
    return (
      <div
      className={`group p-4 rounded-lg ${
        isUser 
          ? 'bg-blue-600 text-white ml-auto' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-100'
      } max-w-[80%] transition-all hover:shadow-md`}
    >
      <div className="flex flex-col gap-2">
        <div className={`whitespace-pre-wrap ${
          isUser ? 'text-white' : 'text-gray-800'
        }`}>
          {chat.sender === 'ai' ? (
            <ReactMarkdown 
              className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-li:my-1"
              components={{
                a: ({ ...props }) => (
                  <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />
                )
              }}
            >
                {formatMessage(chat.message)}
              </ReactMarkdown>
            ) : (
              chat.message
            )}
          </div>
          <div className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
            isUser ? 'text-blue-200' : 'text-gray-400'
          }`}>
            {format(new Date(chat.timestamp), 'HH:mm')}
          </div>
        </div>
      </div>
    );
  };

  const handleExampleClick = async (text: string) => {
    if (isLoading) return
    
    const cleanText = text.replace(/['"]/g, '')
    
    const tempMessage: ChatMessage = {
      sender: 'user',
      message: cleanText,
      timestamp: new Date(),
      status: 'sending'
    }

    setIsLoading(true)
    setChatHistory(prev => [...prev, tempMessage])
    
    try {
      const response = await fetch(`${baseUrl}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          message: cleanText,
          sessionId,
          bookId,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setChatHistory(data.data.messages)
        if (!initialMessages && onChatCreated) {
          onChatCreated()
        }
      } else {
        if (data.error === 'Chat not found' || data.error === 'Chat deleted') {
          clearSessionId()
          router.push('/dashboard/chat')
          return
        }
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to send message. Please try again.')
      setChatHistory(prev => prev.map(msg => 
        msg === tempMessage 
          ? { ...msg, status: 'error' }
          : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <header className="bg-white border-gray-100 p-4 fixed right-0 z-10">
        <div className="max-w-full mx-auto flex space-x-[65rem] items-center">
          <Link href={'/dashboard/chat'}>
          <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold text-blue-800 flex gap-1">
                {bookTitle && (
                  <span className="text-sm font-normal text-gray-600 fixed top-5 left-[18rem]">
                    • Discussing: {bookTitle}
                  </span>
                )}
              </h2>
            </div>
          </Link>
          <UserButton />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center mt-24 p-4 mb-[200px]">
        <div 
          ref={chatContainerRef}
          className="w-full max-w-3xl space-y-6"
        >
          {chatHistory.length === 0 ? (
            <Card className="bg-white/50 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">I&apos;m FoundrGuide AI – your startup companion</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Tell me your <span className="font-semibold">goal, challenge, or question</span>, and I&apos;ll provide
                  <span className="font-semibold"> personalized recommendations </span> from our extensive library of startup resources.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-blue-800 mb-2 font-medium">For better recommendations, be specific.</p>
                  <p className="text-blue-600 text-sm">I can&apos;t handle follow-up questions yet!</p>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-700 font-medium">Try something like:</p>
                  {[
                    { icon: <Target className="h-5 w-5" />, text: "How do I create a compelling pitch deck for seed funding?" },
                    { icon: <BookOpen className="h-5 w-5" />, text: "What are the key principles of product-market fit?" },
                    { icon: <Lightbulb className="h-5 w-5" />, text: "How can I implement effective OKRs in my startup?" }
                  ].map((example, index) => (
                    <Card 
                      key={index} 
                      className="bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleExampleClick(example.text)}
                    >
                      <CardHeader className="p-4 flex flex-row items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {example.icon}
                        </div>
                        <p className="text-gray-600">{example.text}</p>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ) : (
            chatHistory.map((chat, index) => (
              <MessageBubble key={index} chat={chat} />
            ))
          )}
          {isLoading && (
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                </div>
                <p className="text-gray-500">AI is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <div 
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 p-4 shadow-lg flex justify-center items-center w-full sm:ml-[8rem]"
      >
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-start bg-white/90 rounded-xl shadow-sm border border-gray-200">
              <button 
                type="button"
                className="p-4 hover:bg-gray-100 rounded-l-lg transition-colors flex-shrink-0"
                aria-label="Attach file"
              >
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              
              <div className="flex-grow min-h-[44px] flex items-center">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about starting or growing your business..."
                  className="w-full resize-none border-0 focus:ring-0 focus:outline-none bg-transparent px-3 py-3 max-h-[200px] overflow-y-auto"
                  style={{ minHeight: '24px' }}
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center space-x-1 p-2 flex-shrink-0">
                <button 
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Insert emoji"
                >
                  <Smile className="h-5 w-5 text-gray-500" />
                </button>
                <button 
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Upload image"
                >
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button 
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Voice input"
                >
                  <Mic className="h-5 w-5 text-gray-500" />
                </button>
                <Button 
                  type="submit"
                  className={`ml-2 rounded-lg px-4 py-2 flex items-center gap-2 transition-all
                    ${message.trim() && !isLoading
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  disabled={!message.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">{isLoading ? 'Sending...' : 'Send'}</span>
                </Button>
              </div>
            </div>
          </form>
          
          <div className="flex justify-between items-center mt-3 text-xs text-gray-500 px-2">
            <div>
              <span>{message.length}/4000 characters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline">Press</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
              <span className="hidden md:inline">to send</span>
              <span className="mx-2 hidden md:inline">•</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
              <span className="hidden md:inline">for new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface;

