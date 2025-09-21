import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiseaseHeader } from "./analysis/DiseaseHeader";
import { DiseaseStatus } from "./analysis/DiseaseStatus";
import { DiseaseTreatment } from "./analysis/DiseaseTreatment";
import { FarmerData, AnalysisData } from "./types/analysis";
import { useLanguageStore } from "./LanguageSelector";

interface DiseaseAnalysisProps {
  onBack: () => void;
  cropType: string;
  imageUrl: string;
  farmerData: FarmerData;
  analysisData?: AnalysisData;
}

export function DiseaseAnalysis({ onBack, cropType, imageUrl, farmerData, analysisData }: DiseaseAnalysisProps) {
  const { toast } = useToast();
  const t = useLanguageStore((state) => state.t);
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);

  const handlePrint = () => {
    window.print();
    toast({
      title: t("pdf_generated"),
      description: t("print_dialog_opened") || "Print dialog opened.",
    });
  };

  const handleSpeak = () => {
    if (!analysisData) {
      const utterance = new SpeechSynthesisUtterance(t("no_results") || 'No results found.');
      setLanguageForSpeech(utterance);
      window.speechSynthesis.speak(utterance);
      return;
    }

    const disease = analysisData.diseaseName || t("unknown_disease") || "Unknown disease";
    const confidenceValue = analysisData.confidence ? Math.round(analysisData.confidence) : null;
    const status = analysisData.status || '';
    let affectedArea = '';

    if (
      analysisData.affectedArea !== undefined &&
      analysisData.affectedArea !== null &&
      (!(typeof analysisData.affectedArea === 'string') || (analysisData.affectedArea as string).trim() !== '')
    ) {
      const areaValue = Number(analysisData.affectedArea);
      affectedArea = !isNaN(areaValue) ? `${areaValue}` : `${analysisData.affectedArea}`;
    }

    let speakText = `${t("detected_disease") || "Detected disease"}: ${disease}, 
      ${t("confidence") || "Confidence"}: ${confidenceValue !== null ? confidenceValue + ' %' : t("unknown") || "unknown"}, 
      ${t("status") || "Status"}: ${status}, 
      ${t("affected_area") || "Affected area"}: ${affectedArea} %`;

    if (confidenceValue !== null && confidenceValue < 50) {
      speakText += `. ${t("low_confidence_warning") || "My confidence is low. Please consult experts nearby."}`;
    }

    const utterance = new SpeechSynthesisUtterance(speakText);
    setLanguageForSpeech(utterance);
    window.speechSynthesis.speak(utterance);
  };

  // Set language for SpeechSynthesis based on selected language
  const setLanguageForSpeech = (utterance: SpeechSynthesisUtterance) => {
    switch (currentLanguage) {
      case "en":
        utterance.lang = "en-US";
        break;
      case "hi":
        utterance.lang = "hi-IN";
        break;
      case "te":
        utterance.lang = "te-IN";
        break;
      case "ta":
        utterance.lang = "ta-IN";
        break;
      case "kn":
        utterance.lang = "kn-IN";
        break;
      default:
        utterance.lang = "en-US";
    }
  };

  if (!analysisData) {
    return (
      <Card className="w-full animate-fade-up">
        <CardHeader>
          <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
            <ArrowLeft className="mr-2" /> {t('back')}
          </Button>
          <CardTitle className="text-2xl">{t('analyzing') || 'Analysis in Progress'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-gray-500">
              {t('processing_image') ? `${t('processing_image')} ${cropType} ${t('image') || "image"}...` : `Processing your ${cropType} image...`}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> {t('back')}
        </Button>
        <CardTitle className="text-2xl">{t('disease_analysis') || 'Disease Analysis Results for'} {cropType}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">{t('user_details') || 'User Details'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('name') || 'Name'}</p>
              <p className="font-medium">{farmerData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('phone') || 'Phone'}</p>
              <p className="font-medium">{farmerData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('email') || 'Email'}</p>
              <p className="font-medium">{farmerData.email || t('not_provided') || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('crop_type') || 'Crop Type'}</p>
              <p className="font-medium">{cropType}</p>
            </div>
          </div>
        </div>

        {imageUrl && (
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img src={imageUrl} alt={t('analyzed_crop') || 'Analyzed crop'} className="w-full h-auto" />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <DiseaseHeader 
            diseaseName={analysisData.diseaseName}
            confidence={analysisData.confidence}
          />
          <DiseaseStatus 
            status={analysisData.status}
            affectedArea={analysisData.affectedArea}
          />
        </div>

        <DiseaseTreatment 
          causes={analysisData.causes}
          prevention={analysisData.prevention}
          treatment={analysisData.treatment}
        />

        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSpeak}
            className="bg-primary mx-2 hover:bg-primary/90 text-white">
            {t('ai_assistant') || 'AI Assistant'}
          </Button>

          <Button 
            onClick={handlePrint}
            className="bg-primary hover:bg-primary/90 text-white">
            <Download className="mr-2" />
            {t('print_results') || 'Print Results'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
