import { Card } from "@/components/ui/card";
import { BookMarked, CheckCircle, MoreVertical, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Book {
  title: string;
  author: string;
  coverImage: string;
  duration: string;
  rating: number;
  subtitle: string;
}

export default function MyLibrary() {
  // Mock data - replace with actual data from your backend
  const savedBooks: Book[] = [
    {
      title: "The 5 Love Languages",
      author: "Gary Chapman",
      coverImage: "/books/5-love-languages.jpg",
      duration: "19 min",
      rating: 4.5,
      subtitle: "The Secret to Love That Lasts"
    },
    {
      title: "The 80/20 Principle",
      author: "Richard Koch",
      coverImage: "/books/80-20-principle.jpg",
      duration: "18 min",
      rating: 4.3,
      subtitle: "The Secret to Achieving More with Less"
    },
    // ... add more books
  ];

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Library</h1>
        <div className="relative mr-10">
          <input
            type="text"
            placeholder="Search your library"
            className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </header>

      {/* Saved Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Saved</h2>
            <span className="text-sm text-gray-500">({savedBooks.length} items)</span>
          </div>
          <Link href="/dashboard/my-library/saved" className="text-blue-600 text-sm">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {savedBooks.map((book, index) => (
            <Card key={index} className="relative">
              <Link href={`/dashboard/book/${book.title.toLowerCase().replace(/ /g, '-')}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <p className="text-gray-500 text-sm mb-2">{book.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{book.duration}</span>
                    <span className="text-sm text-gray-500">★ {book.rating}</span>
                  </div>
                </div>
              </Link>
              <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* Finished Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold">Finished</h2>
            <span className="text-sm text-gray-500">(0 items)</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Done and dusted!</h3>
          <p className="text-gray-600">When you finish a title, you can find it here later.</p>
        </div>
      </section>
    </main>
  );
}