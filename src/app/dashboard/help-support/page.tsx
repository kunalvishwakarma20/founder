import { Search } from "lucide-react";

export default function HelpSupport(){
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
        <div className="relative mr-10">
          <input
            type="text"
            placeholder="Books, Collection, Summaries"
            className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </header>
    </main>
  )
} 