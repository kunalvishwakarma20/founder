'use client';

import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useBooks } from "@/hooks/use-books"; // Create this hook

export function BookGrid() {
  const { books, isLoading, error } = useBooks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Link href={`/dashboard/book/${book._id}`} key={book._id}>
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="relative h-48 w-full">
              <Image
                src={book.coverImageUrl}
                alt={book.title}
                fill
                className="object-cover rounded-t-lg w-40"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{book.author}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{book.tags}</span>
                <Link 
                  href={`/dashboard/chat?bookId=${book._id}&title=${encodeURIComponent(book.title)}`}
                  className="inline-flex"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat about this book</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 