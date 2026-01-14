"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Video, Upload, Camera, Loader2, Info, Film, Sparkles, Dog, FileVideo, Image as ImageIcon } from "lucide-react";
import { generateInsightsReport, GenerateInsightsReportInput } from "@/ai/flows/generate-insights-report";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";

const analysisSteps = [
  "Warming up the AI... sniffing out the details.",
  "Analyzing gait and posture for happy wiggles.",
  "Decoding tail wags and ear positions.",
  "Listening for barks, yips, and woofs.",
  "Checking for zoomies and play bows.",
  "Translating findings into human speak.",
  "Generating your Pawsight report...",
];

export default function AnalyzePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [mediaChunks, setMediaChunks] = useState<Blob[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // This would come from the user's profile, but we'll use a default for now.
  const dogProfile = { breed: "Mixed Breed", age: 5 };

  const startAnalysis = async (mediaDataUri: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(analysisSteps[0]);

    let progressInterval: NodeJS.Timeout;

    try {
      let progress = 0;
      let stepIndex = 0;
      progressInterval = setInterval(() => {
        progress += 10;
        if (progress > 100) progress = 100;
        setAnalysisProgress(progress);

        const currentStepIndex = Math.floor((progress / 100) * (analysisSteps.length - 1));
        if (currentStepIndex > stepIndex) {
          stepIndex = currentStepIndex;
          setCurrentStep(analysisSteps[stepIndex]);
        }
      }, 500);

      const input: GenerateInsightsReportInput = {
        mediaDataUri: mediaDataUri,
        breed: dogProfile.breed,
        age: dogProfile.age,
      };

      const report = await generateInsightsReport(input);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      const reportId = Date.now().toString();
      localStorage.setItem(`report-${reportId}`, JSON.stringify(report));

      toast({
        title: "Analysis Complete!",
        description: "Your Pawsight report is ready.",
      });

      router.push(`/report/${reportId}`);

    } catch (error) {
      console.error("Analysis failed:", error);
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "We couldn't analyze your media. Please try again.",
      });
    }
  };

  const handleStartRecording = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setMediaChunks((prev) => [...prev, event.data]);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const mediaBlob = new Blob(mediaChunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          startAnalysis(base64String);
        };
        reader.readAsDataURL(mediaBlob);
        setMediaChunks([]);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 15) {
            handleStopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    }
  }, [mediaChunks]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
    if (recordingTime < 2) {
       toast({
          variant: "destructive",
          title: "Recording too short",
          description: "Please record for at least 2 seconds.",
        });
        setIsAnalyzing(false);
    }
    setRecordingTime(0);
  }, [recordingTime, toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        startAnalysis(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const requestCamera = async () => {
    if (hasCameraPermission) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this app.',
      });
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  

  if (isAnalyzing) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-6 text-center p-4">
        <div className="relative h-24 w-24">
            <Loader2 className="absolute inset-0 h-full w-full animate-spin text-primary" />
            <Dog className="absolute inset-0 m-auto h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Analyzing your pup...</h1>
        <p className="text-muted-foreground max-w-sm">{currentStep}</p>
        <Progress value={analysisProgress} className="w-full max-w-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Analysis Lab</h1>
        <p className="text-muted-foreground">Capture or upload a moment to decode your dog's feelings.</p>
      </div>
      
      <Tabs defaultValue="record" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record"><Video className="mr-2 h-4 w-4" />Record</TabsTrigger>
          <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4" />Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="record">
          <Card>
            <CardContent className="p-4 md:p-6 text-center">
                <Card className="relative aspect-video w-full overflow-hidden border-2 border-dashed mb-4">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  {hasCameraPermission === null && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 text-center">
                          <Camera className="h-12 w-12 mb-4 text-primary" />
                          <h2 className="text-xl font-bold">Ready to Record?</h2>
                          <p className="mb-4">Click below to enable your camera.</p>
                          <Button onClick={requestCamera}>Enable Camera</Button>
                      </div>
                  )}
                  {hasCameraPermission === false && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 text-center">
                          <Camera className="h-12 w-12 mb-4 text-destructive" />
                          <h2 className="text-xl font-bold">Camera Access Denied</h2>
                          <p>Please enable camera permissions in your browser settings.</p>
                      </div>
                  )}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-destructive px-3 py-1 text-white animate-pulse">
                      <Film className="h-4 w-4" />
                      <span className="font-mono text-sm">REC {String(recordingTime).padStart(2, '0')}s</span>
                    </div>
                  )}
                </Card>
                <Button
                  size="lg"
                  className="h-auto py-4 text-base w-full"
                  onMouseDown={handleStartRecording}
                  onMouseUp={handleStopRecording}
                  onTouchStart={handleStartRecording}
  onTouchEnd={handleStopRecording}
                  disabled={!hasCameraPermission || isAnalyzing}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      <span>{isRecording ? "Recording..." : (hasCameraPermission ? "Hold to Record" : "Record Video")}</span>
                  </div>
                  {hasCameraPermission && <span className="text-xs font-normal text-primary-foreground/80">Hold for at least 2s</span>}
                </div>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardContent className="p-4 md:p-6 text-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-muted rounded-lg p-12 flex flex-col items-center justify-center hover:bg-muted/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="font-semibold">Click to upload</p>
                  <p className="text-sm text-muted-foreground">or drag and drop a file</p>
                  <p className="text-xs text-muted-foreground mt-2">Video (MP4, MOV) or Photo (JPG, PNG)</p>
                </div>
                <input id="file-upload" type="file" accept="video/*,image/*" className="hidden" onChange={handleFileUpload} disabled={isAnalyzing} />
              </label>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Alert variant="default" className="bg-primary/5 border-primary/10">
        <Sparkles className="h-4 w-4 text-primary" />
        <AlertTitle>Analysis Tip</AlertTitle>
        <AlertDescription>
          For best results, make sure your dog is clearly visible. Good lighting and a 5-10 second clip work wonders!
        </AlertDescription>
      </Alert>
    </div>
  );
}

    