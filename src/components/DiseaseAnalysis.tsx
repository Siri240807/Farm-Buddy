import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiseaseHeader } from "./analysis/DiseaseHeader";
import { DiseaseStatus } from "./analysis/DiseaseStatus";
import { DiseaseTreatment } from "./analysis/DiseaseTreatment";
import { FarmerData, AnalysisData } from "./types/analysis";

interface DiseaseAnalysisProps {
  onBack: () => void;
  cropType: string;
  imageUrl: string;
  farmerData: FarmerData;
  analysisData?: AnalysisData;
}

export function DiseaseAnalysis({ onBack, cropType, imageUrl, farmerData, analysisData }: DiseaseAnalysisProps) {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
    toast({
      title: "Success",
      description: "Print dialog opened.",
    });
  };

  if (!analysisData) {
    return (
      <Card className="w-full animate-fade-up">
        <CardHeader>
          <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <CardTitle className="text-2xl">Analysis in Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-gray-500">
              Processing your {cropType} image...
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
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <CardTitle className="text-2xl">Disease Analysis Results for {cropType}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">User Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{farmerData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{farmerData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{farmerData.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Crop Type</p>
              <p className="font-medium">{cropType}</p>
            </div>
          </div>
        </div>
        
        {imageUrl && (
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img src={imageUrl} alt="Analyzed crop" className="w-full h-auto" />
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
            onClick={handlePrint}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Download className="mr-2" />
            Print Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}