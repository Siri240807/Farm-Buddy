import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

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
  "Maize",
  "Rice",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Tomatoes",
  "Chili",
  "Bananas",
  "Coconut",
  "Groundnut",
  "Soybean",
  "Brinjal",
  "Beans",
  "Turmeric",
  "Ginger"
];

export function FarmerForm({ onBack, onNext }: FarmerFormProps) {
  const [formData, setFormData] = useState<FarmerData>({
    name: "",
    location: "",
    phone: "",
    email: "",
    cropType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting farmer data with crop type:", formData);
    onNext(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCropSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      cropType: value,
    }));
  };

  const isFormValid = formData.name && formData.location && formData.phone && formData.cropType;

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <CardTitle className="text-2xl">Farmer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cropType" className="text-sm font-medium">
              Crop Type *
            </label>
            <Select value={formData.cropType} onValueChange={handleCropSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select your crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location *
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email (Optional)
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={!isFormValid}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}