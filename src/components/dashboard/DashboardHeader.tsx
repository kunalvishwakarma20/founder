'use client'

import { Search } from "lucide-react"
import { useState } from "react"

interface DashboardHeaderProps {
  title: string
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  return (
    <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h1>
      <div className={`relative w-full sm:w-64 ${isSearchVisible ? 'block' : 'hidden sm:block'}`}>
        <input
          type="text"
          placeholder="Books, Collection, Summaries"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <button 
        className="sm:hidden absolute right-4 top-4"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      >
        <Search className="h-5 w-5 text-gray-400" />
      </button>
    </header>
  )
} 