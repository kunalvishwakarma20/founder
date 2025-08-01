import { useState, useEffect, useCallback } from 'react';
import { baseUrl } from '@/base_url';
import { useUser } from '@clerk/nextjs';

interface Chat {
  _id: string;
  title: string;
  createdAt: string;
}

export function useChatHistory() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const fetchChats = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`${baseUrl}/api/v1/chat/user/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setChats(data.data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Set up polling for updates
  useEffect(() => {
    const interval = setInterval(fetchChats, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [fetchChats]);

  return { chats, isLoading, refetch: fetchChats };
} 