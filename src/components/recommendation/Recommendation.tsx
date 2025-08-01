"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react"
import zeroToOne from '@/public/cover-pages/zerotoone.jpg'
import theinnovatorsdilemma from '@/public/cover-pages/theinnovatorsdilemma.jpg'
import goodtpgreat from '@/public/cover-pages/goodtpgreat.jpg'
import theleanstartup from '@/public/cover-pages/theleanstartup.jpg'
import Image from "next/image"

const bookCover = [
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    description: "Learn how to build a company that is both more capital efficient and that leverages human creativity more effectively.",
    readTime: "8 min read",
    image: theleanstartup
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    description: "Discover how to build a better future by creating something entirely new, going from zero to one.",
    readTime: "7 min read",
    image: zeroToOne
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    description: "Explore what it takes for a company to make the transition from being good to being great.",
    readTime: "9 min read",
    image: goodtpgreat
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    description: "Understand why great companies fail and how to avoid their fate by embracing disruptive innovation.",
    readTime: "10 min read",
    image: theinnovatorsdilemma
  }
]

export default function BookCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bookCover.length)
    }, 2000) // Change slide every 2 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bookCover.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bookCover.length) % bookCover.length)
  }

  return (
    <div className="relative w-full mx-auto py-6 md:py-10 px-4 md:px-40 bg-blue-50 rounded-xl">
      <h2 className="text-xl md:text-2xl items-center text-blue-800 mb-8 md:mb-16 text-center">
        <span className="bg-blue-100 rounded-3xl px-3 py-1 md:px-4 md:py-1.5">
          Featured Book Summaries
        </span>
      </h2>
      
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bookCover.map((book, index) => (
            <Card key={index} className="w-full select-none flex-shrink-0 bg-white">
              <div className="flex flex-col md:flex-row">
                <Image 
                  src={book.image} 
                  alt={book.title} 
                  width={1000} 
                  height={1000} 
                  className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none" 
                />
                <div className="flex flex-col justify-between p-4 md:p-6 md:w-2/3">
                  <div>
                    <CardHeader className="p-0 mb-2 md:mb-4">
                      <CardTitle className="text-xl md:text-2xl text-blue-900">
                        {book.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm md:text-base text-blue-700 mb-4">
                        {book.description}
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter className="p-0 flex flex-wrap gap-4 md:gap-0 md:flex-nowrap items-center justify-between text-xs md:text-sm text-blue-500">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-5 h-5 md:w-6 md:h-6">
                        <AvatarFallback>{book.author[0]}</AvatarFallback>
                      </Avatar>
                      <span>{book.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{book.readTime}</span>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 md:h-10 md:w-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 md:h-10 md:w-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex justify-center mt-4 space-x-2">
        {bookCover.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full p-0 ${
              index === currentIndex ? 'bg-blue-600' : 'bg-blue-200'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="text-center mt-6 md:mt-11">
        <Link href="/book-summaries" passHref>
          <Button variant="outline" className="text-sm md:text-base border-blue-500 text-blue-500 hover:bg-blue-50">
            View More
            <BookOpen className="ml-2 h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}