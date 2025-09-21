import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguageStore } from "./LanguageSelector";

interface FarmerFormProps {
  onBack: () => void;
  onNext: (farmerData: FarmerData) => void;
}

export interface FarmerData {
  name: string;
  location: string;
  phone: string;
  email: string;
  cropType: string;
}

const crops = [
  "Maize", "Rice", "Wheat", "Cotton", "Mango", "Sugarcane",
  "Tomatoes", "Chili", "Bananas", "Coconut", "Groundnut", "Soybean",
  "Brinjal", "Beans", "Turmeric", "Ginger"
];

export function FarmerForm({ onBack, onNext }: FarmerFormProps) {
  const [formData, setFormData] = useState<FarmerData>({
    name: "",
    location: "",
    phone: "",
    email: "",
    cropType: "",
  });

  const t = useLanguageStore((state) => state.t);
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCropSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, cropType: value }));
  };

  const isFormValid = formData.name && formData.location && formData.phone && formData.cropType;

  // Speak instructions on mount
  useEffect(() => {
    const instruction = `${t("fill_form_instruction") || "Please fill out the farmer details form."}`;
    const utterance = new SpeechSynthesisUtterance(instruction);
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

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> {t("back")}
        </Button>
        <CardTitle className="text-2xl">{t("farmer_details") || "Farmer Details"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("crop_type") || "Crop Type"} *</label>
            <Select value={formData.cropType} onValueChange={handleCropSelect}>
              <SelectTrigger><SelectValue placeholder={t("select_crop") || "Select your crop"} /></SelectTrigger>
              <SelectContent>
                {crops.map(crop => <SelectItem key={crop} value={crop.toLowerCase()}>{crop}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("name") || "Name"} *</label>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder={t("enter_name") || "Enter your full name"} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("location") || "Location"} *</label>
            <Input name="location" value={formData.location} onChange={handleChange} placeholder={t("enter_location") || "Enter your location"} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("phone") || "Phone Number"} *</label>
            <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t("enter_phone") || "Enter your phone number"} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("email") || "Email (Optional)"}</label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("enter_email") || "Enter your email"} />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={!isFormValid}>
              {t("next") || "Next"} <ArrowRight className="ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
