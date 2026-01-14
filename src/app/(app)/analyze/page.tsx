"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Video, Upload, Camera, Loader2, Info, Film } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const analysisSteps = [
  "Initializing analysis...",
  "Scanning gait and posture...",
  "Analyzing tail position...",
  "Checking eyes and ears...",
  "Detecting vocal cues...",
  "Finalizing report...",
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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(analysisSteps[0]);

    let progress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      progress += 100 / (analysisSteps.length * 2); 
      if (progress > 100) progress = 100;
      setAnalysisProgress(progress);

      if (progress >= ((stepIndex + 1) * 100) / analysisSteps.length) {
        stepIndex++;
        if (stepIndex < analysisSteps.length) {
          setCurrentStep(analysisSteps[stepIndex]);
        }
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          router.push(`/report/1`);
        }, 500);
      }
    }, 1000);
  };
  
  const handleRecordPress = () => {
    if (!hasCameraPermission) {
        toast({ variant: 'destructive', title: 'Camera not available' });
        return;
    }
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 15) {
          handleRecordRelease();
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleRecordRelease = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
    if (recordingTime >= 2) { 
      handleStartAnalysis();
    }
    setRecordingTime(0);
  };
  
  const handleUploadClick = () => {
    // This would trigger a file input
    // For this mock, we'll just start the analysis
    handleStartAnalysis();
  }

  if (isAnalyzing) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <h1 className="text-2xl font-bold">Analyzing your pup...</h1>
        <p className="text-muted-foreground">{currentStep}</p>
        <Progress value={analysisProgress} className="w-full max-w-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Analysis Lab</h1>
      <Card className="relative aspect-video w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
        />
        {hasCameraPermission === false && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                <Camera className="h-12 w-12 mb-4" />
                <h2 className="text-xl font-bold">Camera Access Denied</h2>
                <p className="text-center">Please enable camera permissions in your browser settings.</p>
            </div>
        )}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5/6 w-11/12 rounded-3xl border-4 border-dashed border-yellow-400 opacity-75" />
        </div>
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-destructive px-3 py-1 text-white">
            <Film className="h-4 w-4" />
            <span className="font-mono text-sm">REC {String(recordingTime).padStart(2, '0')}:00</span>
          </div>
        )}
      </Card>

      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle>Pro Tip</AlertTitle>
        <AlertDescription>
          Good lighting and a clear view of your dog's full body helps improve analysis accuracy. Aim for a 10-15 second clip.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button
            size="lg"
            className="h-auto py-6 text-lg"
            onMouseDown={handleRecordPress}
            onMouseUp={handleRecordRelease}
            onTouchStart={handleRecordPress}
            onTouchEnd={handleRecordRelease}
            disabled={!hasCameraPermission}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
                <Video className="h-6 w-6" />
                <span>{isRecording ? "Recording..." : "Record Video"}</span>
            </div>
            <span className="text-xs font-normal">Hold to record (min 2s)</span>
            {isRecording && <Progress value={(recordingTime/15)*100} className="w-24 h-1 mt-1 bg-primary-foreground/20" indicatorClassName="bg-white" />}
          </div>
        </Button>
        <Button variant="secondary" size="lg" className="h-auto py-6 text-lg" onClick={handleUploadClick}>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                <span>Upload from Gallery</span>
            </div>
            <span className="text-xs font-normal">.mp4, .mov, .jpg, .png</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
