'use client'
import { useSearchParams } from 'next/navigation'
import ChatInterface from '@/components/chat/ChatInterface'
import { useChatHistory } from '@/hooks/use-chat-history'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const bookId = searchParams.get('bookId')
  const bookTitle = searchParams.get('title')
  const { refetch } = useChatHistory()

  return (
    <ChatInterface 
      initialMessages={[]}
      bookId={bookId || undefined}
      bookTitle={bookTitle || undefined}
      onChatCreated={refetch}
    />
  )
}
