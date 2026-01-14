import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockHistory = [
  { id: 1, date: "July 20, 2024", time: "2:30 PM", emotion: "Playful", confidence: 92 },
  { id: 2, date: "July 19, 2024", time: "10:15 AM", emotion: "Anxious", confidence: 78 },
  { id: 3, date: "July 18, 2024", time: "6:00 PM", emotion: "Relaxed", confidence: 95 },
  { id: 4, date: "July 17, 2024", time: "8:45 AM", emotion: "Happy", confidence: 89 },
  { id: 5, date: "July 16, 2024", time: "4:20 PM", emotion: "Neutral", confidence: 91 },
  { id: 6, date: "July 15, 2024", time: "1:00 PM", emotion: "Pain", confidence: 70 },
];

const emotionConfig: { [key: string]: { color: string, emoji: string } } = {
  Playful: { color: "bg-green-500", emoji: "🎾" },
  Anxious: { color: "bg-yellow-500", emoji: "😟" },
  Relaxed: { color: "bg-blue-500", emoji: "😌" },
  Happy: { color: "bg-pink-500", emoji: "😊" },
  Pain: { color: "bg-red-500", emoji: "😣" },
  Neutral: { color: "bg-gray-500", emoji: "😐" },
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Analysis History</h1>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Emotion</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Happy</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Anxious</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pain</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link href="/analyze">New Analysis <Plus className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {mockHistory.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{item.date}</CardTitle>
                  <CardDescription>{item.time}</CardDescription>
                </div>
                <Badge variant={item.emotion === 'Pain' ? 'destructive' : 'secondary'}>
                  <span className={`mr-2 text-lg`}>{emotionConfig[item.emotion]?.emoji || '🐾'}</span>
                  {item.emotion}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <p>Confidence: <span className="font-semibold">{item.confidence}%</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button asChild>
                <Link href={`/report/${item.id}`}>
                  View Report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
