import useSWR from 'swr';
import { baseUrl } from '@/base_url';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  description: string;
  tags: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await res.json();
  return data.data;
};

export function useBooks() {
  const { data, error, isLoading } = useSWR<Book[]>(
    `${baseUrl}/api/v1/books`,
    fetcher
  );

  return {
    books: data || [],
    isLoading,
    error,
  };
} 