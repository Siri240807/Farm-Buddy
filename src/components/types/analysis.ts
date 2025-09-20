export interface FarmerData {
  name: string;
  location: string;
  phone: string;
  email: string;
}

export interface AnalysisData {
  diseaseName: string;
  confidence: number;
  description: string;
  affectedArea: number;
  normalRange: string;
  status: "severe" | "moderate" | "healthy";
  causes: string[];
  prevention: string[];
  treatment: {
    medicine: string;
    dosage: string;
    frequency: string;
    instructions: string;
  };
}