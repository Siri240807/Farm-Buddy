import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { initializeModel, analyzeImage } from "@/services/mlService";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onBack: () => void;
  onAnalyze: (results: any, image: string) => void;
  cropType: string;
}

export function ImageUpload({ onBack, onAnalyze, cropType }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(imageDataUrl);
        setShowCamera(false);
        // Stop all video streams
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleAnalyze = async () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      try {
        await initializeModel(cropType);
        const results = await analyzeImage(selectedImage);
        onAnalyze(results, selectedImage);
      } catch (error) {
        console.error("Error during analysis:", error);
        toast({
          title: "Analysis Failed",
          description: "There was an error analyzing the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <CardTitle className="text-2xl">Upload {cropType} Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
          {showCamera ? (
            <div className="space-y-4 w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="flex justify-center gap-4">
                <Button onClick={() => {
                  setShowCamera(false);
                  if (videoRef.current) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream?.getTracks().forEach(track => track.stop());
                  }
                }}>
                  Cancel
                </Button>
                <Button onClick={captureImage}>
                  Capture Photo
                </Button>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="space-y-4 w-full">
              <img
                src={selectedImage}
                alt="Selected crop"
                className="max-w-full h-auto rounded-lg mx-auto"
              />
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                >
                  Remove
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  ref={fileInputRef}
                />
                <div className="flex gap-4">
                  <Button onClick={handleUploadClick}>
                    <Upload className="mr-2" />
                    Upload Image
                  </Button>
                  <Button variant="outline" onClick={startCamera}>
                    <Camera className="mr-2" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload a clear image of the affected {cropType} plant
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
