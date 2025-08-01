'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { baseUrl } from '@/base_url';
import { useUser } from '@clerk/nextjs';
import ChatInterface, { ChatMessage, ChatInterfaceProps } from '@/components/chat/ChatInterface';
import { useChatHistory } from '@/hooks/use-chat-history';

interface ChatData {
  _id: string;
  title: string;
  messages: ChatMessage[];
}

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const searchParams = useSearchParams();
  const bookId = searchParams.get('bookId');
  const bookTitle = searchParams.get('title');
  const { refetch } = useChatHistory();

  useEffect(() => {
    async function fetchChat() {
      if (!user) return;
      try {
        const response = await fetch(`${baseUrl}/api/v1/chat/single/${params.chatId}`);
        const data = await response.json();
        if (data.success) {
          setChatData(data.data);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChat();
  }, [params.chatId, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!chatData || !Array.isArray(chatData.messages)) {
    return <div>Chat not found</div>;
  }

  const formattedMessages: ChatMessage[] = chatData.messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp), // Ensures correct type for timestamp
  }));

  const chatProps: ChatInterfaceProps = {
    initialMessages: formattedMessages,
    bookId: bookId ?? undefined,
    bookTitle: bookTitle ?? undefined,
    onChatCreated: refetch,
  };
  
  return <ChatInterface {...chatProps} />;
}  
