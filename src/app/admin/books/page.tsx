"use client";

import { useState, useEffect } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import { baseUrl } from "@/base_url";
import Image from "next/image";

// Types
interface Book {
  _id: string;
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  coverImageUrl: string;
}

interface BookFormData {
  title: string;
  author: string;
  description: string;
  tags: string;
  coverImageUrl: string;
}

const initialBookData: BookFormData = {
  title: "",
  author: "",
  description: "",
  tags: "",
  coverImageUrl: "",
};

export default function BooksManagementPage() {
  // State
  const [uploading, setUploading] = useState(false);
  const [bookData, setBookData] = useState<BookFormData>(initialBookData);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // API Calls
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/books`);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(Array.from(data.data));
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    }
  };

  const createBook = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create book: ${errorText}`);
      }

      toast.success("Book added successfully");
      setBookData(initialBookData);
      fetchBooks();
    } catch (error) {
      toast.error("Error adding book");
      console.error(error);
    }
  };

  const updateBook = async () => {
    if (!editingBook) return;

    try {
      const response = await fetch(`${baseUrl}/api/v1/books/${editingBook._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update book: ${errorText}`);
      }

      toast.success("Book updated successfully");
      setEditingBook(null);
      setBookData(initialBookData);
      fetchBooks();
    } catch (error) {
      toast.error("Failed to update book");
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`${baseUrl}/api/v1/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookData.coverImageUrl) {
      toast.error("Please upload a cover image");
      return;
    }

    setUploading(true);
    try {
      if (editingBook) {
        await updateBook();
      } else {
        await createBook();
      }
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setBookData({
      title: book.title,
      author: book.author,
      description: book.description,
      tags: book.tags?.join(",") || "",
      coverImageUrl: book.coverImageUrl,
    });
  };

  const cancelEdit = () => {
    setEditingBook(null);
    setBookData(initialBookData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-6">
          {editingBook ? "Edit Book" : "Upload New Book"}
        </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        

        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Book Title"
            value={bookData.title}
            onChange={handleInputChange}
            required
          />
          <Input
            name="author"
            placeholder="Author"
            value={bookData.author}
            onChange={handleInputChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Book Description"
            value={bookData.description}
            onChange={handleInputChange}
            required
          />
          <Input
            name="tags"
            placeholder="Tags (comma-separated)"
            value={bookData.tags}
            onChange={handleInputChange}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Cover Image</h3>
          <UploadButton
            endpoint="menuItemImage"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setBookData((prev) => ({ ...prev, coverImageUrl: res[0].url }));
                toast.success("Cover image uploaded!");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Error uploading cover image: ${error.message}`);
            }}
          />
          {bookData.coverImageUrl && (
            <p className="text-sm text-green-600 mt-2">✓ Cover image uploaded</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={uploading || !bookData.coverImageUrl}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editingBook ? "Updating Book..." : "Adding Book..."}
            </>
          ) : editingBook ? (
            "Update Book"
          ) : (
            "Add Book"
          )}
        </Button>

        {editingBook && (
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={cancelEdit}
          >
            Cancel Edit
          </Button>
        )}
      </form>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">All Books</h2>
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={book.coverImageUrl}
                  alt={book.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(book)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteBook(book._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
