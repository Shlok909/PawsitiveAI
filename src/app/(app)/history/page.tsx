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
import { ArrowRight, Filter } from "lucide-react";

const mockHistory = [
  { id: 1, date: "2024-07-20", emotion: "Playful", confidence: 92, action: "Played fetch" },
  { id: 2, date: "2024-07-19", emotion: "Anxious", confidence: 78, action: "Gave calming treat" },
  { id: 3, date: "2024-07-18", emotion: "Relaxed", confidence: 95, action: "Cuddled on couch" },
  { id: 4, date: "2024-07-17", emotion: "Happy", confidence: 89, action: "Went for a walk" },
  { id: 5, date: "2024-07-16", emotion: "Neutral", confidence: 91, action: "Napped" },
];

const emotionColors: { [key: string]: string } = {
  Playful: "bg-green-100 text-green-800",
  Anxious: "bg-yellow-100 text-yellow-800",
  Relaxed: "bg-blue-100 text-blue-800",
  Happy: "bg-pink-100 text-pink-800",
  Neutral: "bg-gray-100 text-gray-800",
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-headline text-3xl font-bold">Analysis History</h1>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="shrink-0"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            <Badge variant="default" className="cursor-pointer shrink-0">All</Badge>
            <Badge variant="secondary" className="cursor-pointer shrink-0">Happy</Badge>
            <Badge variant="secondary" className="cursor-pointer shrink-0">Anxious</Badge>
            <Badge variant="destructive" className="cursor-pointer shrink-0">Health Alerts</Badge>
        </div>
      </div>

      <div className="space-y-6">
        {mockHistory.map((item) => (
          <Card key={item.id} className="card-neumorphic overflow-hidden">
             <div className="relative">
              <div className={`h-2 ${emotionColors[item.emotion] || 'bg-gray-200'}`}></div>
             </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{item.date}</span>
                <Badge className={`${emotionColors[item.emotion] || 'bg-gray-200'}`}>{item.emotion}</Badge>
              </CardTitle>
              <CardDescription>Confidence: {item.confidence}%</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Action taken:</span> {item.action}
              </p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <Button variant="ghost" size="sm" asChild className="ml-auto">
                <Link href={`/report/${item.id}`}>
                  View Full Report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
