import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, BookMarked, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // Mock data - replace with actual data from your API
  const stats = [
    {
      title: "Total Books",
      value: "156",
      icon: BookOpen,
      trend: "+12% from last month"
    },
    {
      title: "Active Users",
      value: "2,345",
      icon: Users,
      trend: "+5.2% from last month"
    },
    {
      title: "Books Read",
      value: "12,456",
      icon: BookMarked,
      trend: "+8.1% from last month"
    },
    {
      title: "Engagement Rate",
      value: "64%",
      icon: TrendingUp,
      trend: "+2.5% from last month"
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add more dashboard components here */}
    </div>
  );
} 