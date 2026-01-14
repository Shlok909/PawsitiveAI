"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Video, Upload, Camera, Loader2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Attempt to get camera access when component mounts
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        // Handle camera permission denied or other errors
      }
    }
    getCamera();

    // Cleanup function to stop camera stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(analysisSteps[0]);

    let progress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      progress += 100 / (analysisSteps.length * 2); // 2 seconds per step
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
          // Mock report ID
          router.push(`/report/1`);
        }, 500);
      }
    }, 1000);
  };
  
  const handleRecordPress = () => {
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
    if (recordingTime >= 2) { // minimum record time
      handleStartAnalysis();
    }
    setRecordingTime(0);
  };

  if (isAnalyzing) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <h1 className="font-headline text-2xl font-bold">Analyzing your pup...</h1>
        <p className="text-muted-foreground">{currentStep}</p>
        <Progress value={analysisProgress} className="w-full max-w-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <h1 className="font-headline text-3xl font-bold">Analysis Lab</h1>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5/6 w-11/12 rounded-lg border-2 border-dashed border-yellow-400" />
        </div>
        <div className="pointer-events-none absolute top-4 left-4 rounded-lg bg-black/50 p-2 text-xs text-white">
          Keep your dog centered in the frame
        </div>
      </div>

      <Alert variant="default" className="bg-primary/10">
        <Info className="h-4 w-4" />
        <AlertTitle>Pro Tip</AlertTitle>
        <AlertDescription>
          Good lighting and a clear view of your dog's full body helps improve analysis accuracy. Aim for a 10-15 second clip.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button
            size="lg"
            className="flex h-20 flex-col gap-1"
            onMouseDown={handleRecordPress}
            onMouseUp={handleRecordRelease}
            onTouchStart={handleRecordPress}
            onTouchEnd={handleRecordRelease}
        >
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            <span className="text-lg font-semibold">{isRecording ? `Recording... (${recordingTime}s)` : "Record Video"}</span>
          </div>
          <p className="text-xs font-normal">Hold to record for up to 15s</p>
          {isRecording && <Progress value={(recordingTime/15)*100} className="w-full h-1 mt-1 bg-primary/50" />}
        </Button>
        <Button variant="secondary" size="lg" className="flex h-20 flex-col gap-1" onClick={handleStartAnalysis}>
          <div className="flex items-center gap-2">
            <Upload className="h-6 w-6" />
            <span className="text-lg font-semibold">Upload from Gallery</span>
          </div>
          <p className="text-xs font-normal">.mp4, .jpg, .png</p>
        </Button>
      </div>
    </div>
  );
}
