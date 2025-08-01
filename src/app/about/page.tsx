import Header from "@/components/header/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8 mt-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Foundr<span className="text-blue-600">Guide</span></h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          At FoundrGuide, we understand that building a successful startup is no small feat. Founders often juggle numerous responsibilities while trying to navigate an ever-changing business landscape. That&apos;s where we come in. Our platform is designed to provide personalized, expert advice to entrepreneurs, helping them overcome the unique challenges of running and scaling a business.
        </p>
        <p className="text-lg">
          Whether you&apos;re just starting out or looking to level up your operations, FoundrGuide is here to be your trusted guide—powered by AI, but built with founders like you in mind.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Unique Value Proposition</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-lg">
              What sets FoundrGuide apart? We offer personalized, actionable advice that directly addresses your startup&apos;s needs—without the steep costs associated with traditional mentorship programs or seminars. Our AI-driven platform taps into a vast knowledge base, pulling insights from leading business strategies and books, and tailors them specifically to your challenges.
            </p>
            <p className="text-lg mt-4 font-semibold">
              With FoundrGuide, you get expert advice, tailored for you, when you need it most.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team Behind FoundrGuide</h2>
        <p className="text-lg mb-4">
          We&apos;re a small, passionate team of entrepreneurs, technologists, and business strategists who believe in empowering founders with the resources they need to succeed. Our collective experience in startups has shaped our mission to make expert-level guidance accessible to all.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 flex flex-col items-center">
                <Image
                  src={`/placeholder.svg?height=100&width=100`}
                  alt={`Team member ${i}`}
                  width={100}
                  height={100}
                  className="rounded-full mb-2"
                />
                <h3 className="font-semibold">Team Member {i}</h3>
                <p className="text-sm text-muted-foreground">Position</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg mb-4">
          The idea for FoundrGuide was born out of a frustration shared by many startup founders: finding reliable, tailored advice that doesn&apos;t cost a fortune or require countless hours of research. Having been through the highs and lows of entrepreneurship ourselves, we saw the need for a platform that could offer practical, insightful advice—fast.
        </p>
        <p className="text-lg">
          That&apos;s why we built FoundrGuide. From day one, our goal has been to provide startup founders with a resource that offers valuable, real-world guidance—without the fluff or hefty price tags.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Behind the Scenes</h2>
        <p className="text-lg mb-4">
          At FoundrGuide, innovation drives everything we do. Our platform uses advanced AI algorithms to deliver personalized advice, but it&apos;s the constant iteration and real-world testing that make our service truly unique. Every piece of advice is vetted and aligned with the latest insights from the business world.
        </p>
        <p className="text-lg">
          We&apos;re continually improving and evolving our platform based on feedback from founders like you, ensuring that you always have access to the most relevant and impactful strategies for your business.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join the FoundrGuide Community</h2>
        <p className="text-lg mb-6">
          Let us help you navigate your entrepreneurial journey with confidence. Whether you&apos;re looking for book summaries, expert advice, or deep-dive insights, FoundrGuide is your personal AI-powered mentor.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="border bg-transparent text-blue-600 border-blue-600 hover:bg-blue-700 hover:text-white">Get Started Today</Button>
        </Link>
      </section>
    </div>
    </>
  )
}