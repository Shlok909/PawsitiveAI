import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Heart,
  Smile,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Mock Data
const dogProfile = {
  name: "Buddy",
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
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <section className="relative flex flex-col items-center justify-center space-y-4 rounded-2xl bg-primary/10 p-8 text-center">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src={dogProfile.avatarUrl} alt={dogProfile.name} data-ai-hint="golden retriever" />
            <AvatarFallback>{dogProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 -m-2 animate-pulse rounded-full border-4 border-accent" />
          <Badge
            variant="default"
            className="absolute bottom-0 right-0 border-2 border-background bg-accent text-accent-foreground"
          >
            <Heart className="mr-1 h-3 w-3" />
            {lastAnalysis.emotion}
          </Badge>
        </div>
        <h1 className="font-headline text-3xl font-bold text-foreground">
          {dogProfile.name} is feeling {lastAnalysis.emotion}
        </h1>
        <p className="text-muted-foreground">
          Based on the latest analysis with {lastAnalysis.confidence}% confidence.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="card-neumorphic">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Analysis</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastAnalysis.emotion} ({lastAnalysis.confidence}%)
            </div>
            <p className="text-xs text-muted-foreground">{lastAnalysis.date}</p>
          </CardContent>
        </Card>
        <Card className="card-neumorphic">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Mood</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <weeklyMood.icon className="h-6 w-6 text-accent" />
              {weeklyMood.mood}
            </div>
            <p className="text-xs text-muted-foreground">Your pup's mood has been consistent.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <Button size="lg" className="w-full max-w-md bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" asChild>
          <Link href="/analyze">
            Start New Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
      
      <section>
        <h2 className="mb-4 font-headline text-2xl font-bold">Recent Reports</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {recentReports.map((report) => (
              <CarouselItem key={report.id} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/report/${report.id}`}>
                  <Card className="overflow-hidden card-neumorphic group">
                    <CardContent className="relative h-40 w-full p-0">
                      <Image
                        src={report.thumbnail}
                        alt={`Report from ${report.date}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint="dog playing"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge variant="secondary">{report.emotion} ({report.confidence}%)</Badge>
                        <p className="mt-1 text-sm font-semibold text-white">{report.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    </div>
  );
}
