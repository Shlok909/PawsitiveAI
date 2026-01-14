import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Heart,
  Smile,
  Zap,
  Dog,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Mock Data
const dogProfile = {
  name: "Buddy",
  breed: "Golden Retriever",
  avatarUrl: PlaceHolderImages.find((img) => img.id === "dog-avatar")?.imageUrl || "https://picsum.photos/seed/1/100/100",
};

const lastAnalysis = {
  emotion: "Happy",
  confidence: 87,
  date: "Today, 2:15 PM",
};

const weeklyMood = {
  mood: "Stable",
  icon: Smile,
};

const recentReports = [
  { id: 1, emotion: "Playful", date: "2024-07-20", confidence: 92, thumbnail: PlaceHolderImages.find((img) => img.id === "report-thumb-1")?.imageUrl || "https://picsum.photos/seed/2/300/200" },
  { id: 2, emotion: "Anxious", date: "2024-07-19", confidence: 78, thumbnail: PlaceHolderImages.find((img) => img.id === "report-thumb-2")?.imageUrl || "https://picsum.photos/seed/3/300/200" },
  { id: 3, emotion: "Relaxed", date: "2024-07-18", confidence: 95, thumbnail: PlaceHolderImages.find((img) => img.id === "report-thumb-3")?.imageUrl || "https://picsum.photos/seed/4/300/200" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Hello, {dogProfile.name}'s friend!</h1>
          <Button asChild>
            <Link href="/analyze">
              New Analysis <Plus className="ml-2 h-4 w-4" />
            </Link>
          </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src={dogProfile.avatarUrl} alt={dogProfile.name} data-ai-hint="golden retriever" />
              <AvatarFallback>{dogProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{dogProfile.name}</CardTitle>
              <CardDescription>{dogProfile.breed}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Analysis</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastAnalysis.emotion}
            </div>
            <p className="text-xs text-muted-foreground">with {lastAnalysis.confidence}% confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Mood</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyMood.mood}</div>
            <p className="text-xs text-muted-foreground">Your pup's mood has been consistent</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Reports</h2>
            <Button variant="ghost" asChild>
                <Link href="/history">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentReports.map((report) => (
              <Link href={`/report/${report.id}`} key={report.id}>
                <Card className="overflow-hidden group w-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={report.thumbnail}
                        alt={`Report from ${report.date}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint="dog playing"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge variant="secondary">{report.emotion}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg">{report.date}</CardTitle>
                        <CardDescription>{report.confidence}% confidence</CardDescription>
                    </CardHeader>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
