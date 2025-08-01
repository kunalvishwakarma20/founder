'use client';

import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Books, Collection, Summaries" 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback((value: string) => {
    const handler = debounce((searchValue: string) => {
      onSearch?.(searchValue);
    }, 300);
    handler(value);
  }, [onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative mr-10">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
} 