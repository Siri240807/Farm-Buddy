import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { initializeModel, analyzeImage } from "@/services/mlService";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/components/LanguageSelector";

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

  const translations = useLanguageStore((state) => state.translations);
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const t = (key: string) => translations[key] || key;

  // --- Speak instructions automatically ---
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(t("upload_instruction") || `Upload a clear image of the affected ${cropType}`);
    setLanguageForSpeech(utterance);
    window.speechSynthesis.speak(utterance);
  }, [currentLanguage]);

  const setLanguageForSpeech = (utterance: SpeechSynthesisUtterance) => {
    switch (currentLanguage) {
      case "en": utterance.lang = "en-US"; break;
      case "hi": utterance.lang = "hi-IN"; break;
      case "te": utterance.lang = "te-IN"; break;
      case "ta": utterance.lang = "ta-IN"; break;
      case "kn": utterance.lang = "kn-IN"; break;
      default: utterance.lang = "en-US";
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: t("camera_error"),
        description: t("analysis_failed"),
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
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    try {
      await initializeModel(cropType);
      const results = await analyzeImage(selectedImage);
      onAnalyze(results, selectedImage);

      // Speak after analysis
      const utterance = new SpeechSynthesisUtterance(t("analysis_done") || "Analysis completed. Please check the results.");
      setLanguageForSpeech(utterance);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: t("analysis_failed"),
        description: t("analysis_failed"),
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> {t("back")}
        </Button>
        <CardTitle className="text-2xl">{t("upload")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
          {showCamera ? (
            <div className="space-y-4 w-full">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
              <div className="flex justify-center gap-4">
                <Button onClick={() => {
                  setShowCamera(false);
                  const stream = videoRef.current?.srcObject as MediaStream;
                  stream?.getTracks().forEach(track => track.stop());
                }}>{t("cancel")}</Button>
                <Button onClick={captureImage}>{t("capture")}</Button>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="space-y-4 w-full">
              <img src={selectedImage} alt="Selected crop" className="max-w-full h-auto rounded-lg mx-auto" />
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setSelectedImage(null)}>{t("remove")}</Button>
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? t("analyzing") : t("analyze")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
              <div className="flex gap-4 justify-center">
                <Button onClick={handleUploadClick}><Upload className="mr-2" />{t("upload")}</Button>
                <Button variant="outline" onClick={startCamera}><Camera className="mr-2" />{t("take_photo")}</Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{t("upload_instruction")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
