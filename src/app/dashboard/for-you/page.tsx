import { Suspense } from "react";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { BookGrid } from "@/components/dashboard/BookGrid";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default async function ForYou() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">For you</h1>
        <SearchBar />
      </header>

      <ErrorBoundary fallback={<div>Error loading books</div>}>
        <Suspense fallback={<div>Loading books...</div>}>
          <BookGrid />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}