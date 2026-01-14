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
  RefreshCw,
  Share2,
  Thermometer,
  Wind,
  HeartPulse,
  Watch,
  Eye,
  Bone,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const mockReport = {
  id: "1",
  emotion: "Playful",
  confidence: 92,
  translation: "I'm ready for fun! Let's play!",
  bodyLanguage: {
    tail: { label: "High wag", insight: "Excitement", icon: <Watch className="h-5 w-5 text-accent" /> },
    ears: { label: "Relaxed, forward", insight: "Curious", icon: <Watch className="h-5 w-5 text-accent" /> },
    posture: { label: "Play bow", insight: "Invitation", icon: <Bone className="h-5 w-5 text-accent" /> },
    eyes: { label: "Soft gaze", insight: "Trust", icon: <Eye className="h-5 w-5 text-accent" /> },
  },
  healthVitals: {
    gait: { label: "Gait Analysis", value: "Normal stride", status: "green", icon: <HeartPulse className="h-5 w-5 text-accent" /> },
    eyeClarity: { label: "Eye Clarity", value: "Clear, no redness", status: "green", icon: <Eye className="h-5 w-5 text-accent" /> },
    breathing: { label: "Breathing", value: "Normal rate", status: "green", icon: <Wind className="h-5 w-5 text-accent" /> },
    skin: { label: "Skin Condition", value: "No visible irritation", status: "green", icon: <Thermometer className="h-5 w-5 text-accent" /> },
  },
  urgency: { level: "green", percentage: 10 },
  actionItems: [
    "Perfect time for a walk or a game of fetch! 🐾",
    "Try interactive puzzle toys to channel their playful energy.",
    "Introduce a new trick or command during a training session.",
  ],
};

const UrgencyMeter = ({ level, value }: { level: 'green' | 'yellow' | 'red', value: number }) => {
  const colorClass = {
    green: "bg-accent",
    yellow: "bg-yellow-500",
    red: "bg-destructive",
  }[level];

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Urgency Meter</span>
        <span className={`text-sm font-bold uppercase ${level === 'green' ? 'text-accent' : level === 'yellow' ? 'text-yellow-500' : 'text-destructive'}`}>{level}</span>
      </div>
      <Progress value={value} indicatorClassName={colorClass} />
    </div>
  );
};


export default function ReportPage({ params }: { params: { id: string } }) {
  const report = mockReport;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <section className="text-center space-y-2">
        <div className="flex justify-center items-center gap-2">
            <span className="text-6xl">😊</span>
            <div>
                <h1 className="font-headline text-4xl font-bold uppercase">{report.emotion}</h1>
                <Badge variant="outline">{report.confidence}% Confidence</Badge>
            </div>
        </div>
        <p className="text-lg text-primary font-semibold">"{report.translation}"</p>
      </section>

      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" size="sm"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        <Button size="sm" asChild><Link href={`/chat/${report.id}`}><MessageSquare className="mr-2 h-4 w-4" /> Ask AI</Link></Button>
        <Button variant="outline" size="sm" asChild><Link href="/analyze"><RefreshCw className="mr-2 h-4 w-4" /> New Analysis</Link></Button>
      </div>
      
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Body Language */}
        <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle className="font-headline">Body Language</CardTitle>
            <CardDescription>Understanding the non-verbal cues.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.values(report.bodyLanguage).map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.insight}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Health Vitals */}
        <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle className="font-headline">Health & Vitals</CardTitle>
            <CardDescription>A quick check on key health indicators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.values(report.healthVitals).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
                {item.status === 'green' ? <CheckCircle2 className="h-6 w-6 text-accent" /> : <AlertTriangle className="h-6 w-6 text-yellow-500" />}
              </div>
            ))}
            <Separator className="my-4" />
            <UrgencyMeter level={report.urgency.level as 'green' | 'yellow' | 'red'} value={report.urgency.percentage} />
          </CardContent>
        </Card>
      </div>

      <Card className="card-neumorphic">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Lightbulb /> Actionable Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 list-disc list-inside text-primary">
            {report.actionItems.map((tip, index) => (
              <li key={index}><span className="text-foreground">{tip}</span></li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
