import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function BookPage({}: { params: { slug: string } }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data - replace with actual data fetch
  const book = {
    title: "Critical Thinking",
    author: "Richard Paul",
    coverImage: "/critical-thinking.jpg",
    duration: "16 min",
    rating: 4.2,
    description: "Tools for Taking Charge of Your Learning and Your Life",
    keyInsights: [
      "Understanding the fundamentals of critical thinking",
      "Developing analytical skills",
      "Applying critical thinking in daily life"
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex gap-8 mb-8">
        <div className="relative w-64 h-80 flex-shrink-0">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500">{book.duration}</span>
            <span className="text-sm text-gray-500">★ {book.rating}</span>
          </div>
          <p className="text-gray-700 mb-6">{book.description}</p>
          <Button className="w-full">Read Summary</Button>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
        <ul className="space-y-2">
          {book.keyInsights.map((insight, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              {insight}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
} 