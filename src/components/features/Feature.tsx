import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Lightbulb, MessageSquare, Rocket, Users } from "lucide-react"

export default function Feature() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: "Tailored AI-Powered Advice",
      description: "Get personalized guidance based on your questions, powered by AI and expert insights."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: "Actionable Book Summaries",
      description: "Save time with concise summaries of top business books, ready to apply to your startup."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
      title: "Problem-Specific Solutions",
      description: "Receive tailored advice that directly addresses your startup's unique challenges."
    },
    {
      icon: <Rocket className="h-8 w-8 text-blue-500" />,
      title: "Deep Dives into Key Topics",
      description: "Explore in-depth advice on leadership, scaling, and team management when you need more than a summary."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: "Curated Book Recommendations",
      description: "Get personalized book suggestions based on your specific business challenges."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "On-Demand Virtual Mentorship",
      description: "Access AI-powered mentorship anytime, with expert advice at your fingertips."
    }
  ]

  return (
    <section className="py-16 px-4 text-black mb-14">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xl tracking-tight mb-5 px-4 py-1">
            <span className="bg-blue-100 px-3 py-1 items-center text-blue-800 rounded-2xl">Features</span></h2>
          <p className="text-base max-w-2xl mx-auto mt-8">
            Get personalized mentorship with AI-driven insights and expert strategies.
            FoundrGuide helps you overcome challenges and scale your business with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className=" border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[1rem]">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black text-[0.875rem]">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}