import { baseUrl } from "@/base_url";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import { MessageSquare, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  description: string;
  tags: string;
}

function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/dashboard/book/${book._id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="relative w-full h-full">
        <Image
            src={book.coverImageUrl}
            alt={book.title}
            width={100}
            height={100}
            className="object-cover rounded-md"
            priority
        />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">{book.author}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 line-clamp-1">{book.tags}</span>
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
                Chat with this book
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BookCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

export default async function ForYou() {
  const { userId } = await auth();
    
  if (!userId) {
    redirect("/sign-in");
  }

  async function getBooks() {
    try {
      const response = await fetch(`${baseUrl}/api/v1/books`, {
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  const books = await getBooks();

  return (
    <ErrorBoundary fallback={<div className="text-center p-4 text-red-600">Something went wrong. Please try again later.</div>}>
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">For you</h1>
          <div className="relative mr-10">
            <input
              type="text"
              placeholder="Books, Collection, Summaries"
              className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Search"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {!books ? (
              Array(8).fill(0).map((_, i) => <BookCardSkeleton key={i} />)
            ) : books.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No books found</p>
            ) : (
              books.map((book: Book) => (
                <BookCard key={book._id} book={book} />
              ))
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Recently Added</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {!books ? (
              Array(4).fill(0).map((_, i) => <BookCardSkeleton key={i} />)
            ) : (
              books.slice(0, 4).map((book: Book) => (
                <BookCard key={book._id} book={book} />
              ))
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {!books ? (
              Array(4).fill(0).map((_, i) => <BookCardSkeleton key={i} />)
            ) : (
              books.slice(0, 4).map((book: Book) => (
                <BookCard key={book._id} book={book} />
              ))
            )}
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}