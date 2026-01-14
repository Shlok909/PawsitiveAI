import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Share2,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mockReport = {
  id: "1",
  emotion: "Playful",
  confidence: 92,
  translation: "I'm bursting with energy and ready for some fun. Let's play a game!",
  bodyLanguage: {
    tail: { label: "Tail", value: "High wag", insight: "Excitement" },
    ears: { label: "Ears", value: "Relaxed, forward", insight: "Curious" },
    posture: { label: "Posture", value: "Play bow", insight: "Invitation to play" },
    eyes: { label: "Eyes", value: "Soft gaze", insight: "Trusting and happy" },
  },
  healthVitals: {
    gait: { label: "Gait Analysis", value: "Normal stride", status: "ok" },
    eyeClarity: { label: "Eye Clarity", value: "Clear, no redness", status: "ok" },
    breathing: { label: "Breathing", value: "Normal rate", status: "ok" },
    skin: { label: "Skin Condition", value: "No visible irritation", status: "warning" },
  },
  urgency: { level: "green", percentage: 10, summary: "No immediate concerns detected." },
  actionItems: [
    "It's a perfect time for a walk or a game of fetch! Your dog is eager to play.",
    "Try using interactive puzzle toys to challenge their mind and burn off energy.",
    "Introduce a new trick or command during a training session while they are engaged.",
    "Check the irritated skin area, it might be a minor allergy. Monitor for changes."
  ],
};

const emotionConfig = {
  Playful: { emoji: "🎾", color: "text-green-500" },
  Anxious: { emoji: "😟", color: "text-yellow-500" },
  Relaxed: { emoji: "😌", color: "text-blue-500" },
  Happy: { emoji: "😊", color: "text-pink-500" },
  Pain: { emoji: "😣", color: "text-red-500" },
  Neutral: { emoji: "😐", color: "text-gray-500" },
};

export default function ReportPage({ params }: { params: { id: string } }) {
  const report = mockReport;
  const reportImage = PlaceHolderImages.find((img) => img.id === 'report-thumb-1');
  const eConfig = emotionConfig[report.emotion as keyof typeof emotionConfig] || emotionConfig.Neutral;

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-1/3">
            {reportImage && 
              <Image 
                src={reportImage.imageUrl} 
                alt={report.emotion} 
                width={400} 
                height={400} 
                className="rounded-2xl object-cover aspect-square w-full"
                data-ai-hint="dog playing"
                priority
              />
            }
        </div>
        <div className="flex-1 space-y-4">
            <Badge variant="secondary">Report for July 21, 2024</Badge>
            <h1 className="text-5xl font-bold tracking-tighter">{report.emotion} <span className="text-4xl">{eConfig.emoji}</span></h1>
            <p className="text-xl text-muted-foreground italic">"{report.translation}"</p>
            <div className="flex items-center gap-2">
                <span className="font-semibold">Confidence:</span>
                <Progress value={report.confidence} className="w-32" />
                <span>{report.confidence}%</span>
            </div>
            <div className="flex gap-2 pt-4">
                <Button asChild><Link href={`/chat/${report.id}`}><MessageSquare className="mr-2 h-4 w-4" /> Ask AI Assistant</Link></Button>
                <Button variant="secondary"><Share2 className="mr-2 h-4 w-4" /> Share Report</Button>
            </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Body Language Breakdown</CardTitle>
                    <CardDescription>Understanding the non-verbal cues your dog is showing.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.values(report.bodyLanguage).map((item, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                        <p className="font-semibold text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-lg font-bold">{item.value}</p>
                        <p className="text-sm">{item.insight}</p>
                    </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-accent"/> Actionable Tips</CardTitle>
                    <CardDescription>Personalized recommendations based on this analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                <ul className="space-y-3">
                    {report.actionItems.map((tip, index) => (
                    <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-3 mt-1 text-primary shrink-0"/> 
                        <span>{tip}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Vitals Check</CardTitle>
                <CardDescription>A quick check on key health indicators.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(report.healthVitals).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                    {item.status === 'ok' ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <AlertTriangle className="h-6 w-6 text-yellow-500" />}
                  </div>
                ))}
                <Separator/>
                <div>
                  <p className="font-semibold text-sm mb-1">Urgency</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${report.urgency.level === 'green' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <p className="text-sm text-muted-foreground capitalize">{report.urgency.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
