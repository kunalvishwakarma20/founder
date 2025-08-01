import Header from "@/components/header/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, MessageSquare, BookOpen, LineChart, MessageCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up and Set Up Your Profile",
      description: "Create a free account in minutes using our simple sign-up process. Tell us about your startup's stage, industry, and key challenges so we can personalize advice tailored specifically to your business.",
      icon: <UserPlus className="w-10 h-10" />,
    },
    {
      title: "Ask Questions, Get Expert Answers",
      description: "Whether you're dealing with growth strategies, funding challenges, or team-building, simply type in your query, and FoundrGuide's AI engine will scan through its vast library of business books and generate tailored, actionable advice. It's like having a mentor in your pocket.",
      icon: <MessageSquare className="w-10 h-10" />,
    },
    {
      title: "Explore Book Insights and Deep Dives",
      description: "FoundrGuide connects your questions to real, insightful business literature. Want to know which books and chapters support the advice? We offer references to help you dive deeper and read further.",
      icon: <BookOpen className="w-10 h-10 " />,
    },
    {
      title: "Track Your Learning Journey",
      description: "As you ask more questions and receive advice, FoundrGuide keeps a record of your interactions. This helps you track your startup's growth, revisit important advice, and measure your progress over time.",
      icon: <LineChart className="w-10 h-10" />,
    },
    {
      title: "Real-Time Conversations",
      description: "Not just static answers—FoundrGuide engages in real-time, dynamic conversations with you. Ask follow-up questions, clarify doubts, or get recommendations on what to explore next. It's interactive and adjusts to your unique needs.",
      icon: <MessageCircle className="w-10 h-10" />,
    },
  ]

  const benefits = [
    {
      title: "Tailored to Your Startup",
      description: "Our AI tailors advice based on your specific queries, ensuring you get actionable steps that are relevant to your business.",
    },
    {
      title: "Trusted Insights",
      description: "All the advice provided is grounded in leading business books and thought leadership from successful founders, so you can trust the guidance.",
    },
    {
      title: "Always Available",
      description: "FoundrGuide is ready to assist you anytime, whether you're facing an urgent decision or simply exploring new ideas.",
    },
  ]

  return (
    <>
      <Header />
    <div className="container mx-auto px-4 py-12">
      <div className="mb-4"></div>
      <h1 className="text-4xl font-bold text-center mb-8">How It Works</h1>
      <p className="text-xl text-center mb-20 max-w-3xl mx-auto">
        FoundrGuide is designed to help startup founders get personalized advice and insights from the world&apos;s best business minds. We simplify the process of finding answers to your toughest startup questions, so you can focus on what matters most—building your business.
      </p>

      <h2 className="text-3xl font-semibold text-center mb-4">How FoundrGuide Works for You</h2>
      <div className="grid gap-8 mb-16 px-44 py-16">
        {steps.map((step, index) => (
          <Card key={index} className="flex bg-gradient-to-bl from-blue-500 to-blue-700 bg-clip-text text-transparent flex-col md:flex-row items-start md:items-center gap-6 p-6">
            <div className="flex-shrink-0 text-blue-600">{step.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8">Why FoundrGuide?</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-12 px-20 py-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <CheckCircle className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/sign-up">
          <Button size="lg" className="text-lg px-8 py-6 border bg-transparent text-blue-600 border-blue-600 hover:bg-blue-700 hover:text-white">
            Get Started with FoundrGuide
          </Button>
        </Link>
      </div>
    </div>
    </>
  )
}