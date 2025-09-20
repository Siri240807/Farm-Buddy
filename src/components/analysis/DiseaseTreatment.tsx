import { CircleDot, Pill, Droplet, Clock, Info } from "lucide-react";

interface DiseaseTreatmentProps {
  causes: string[];
  prevention: string[];
  treatment: {
    medicine: string;
    dosage: string;
    frequency: string;
    instructions: string;
  };
}

export function DiseaseTreatment({ causes, prevention, treatment }: DiseaseTreatmentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <CircleDot className="w-6 h-6 text-warning animate-pulse mt-1" />
        <div>
          <h4 className="font-semibold mb-2">Causes</h4>
          <ul className="space-y-2">
            {causes.map((cause, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600">
                <CircleDot className="w-4 h-4 text-primary" />
                {cause}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <CircleDot className="w-6 h-6 text-blue-500 animate-pulse mt-1" />
        <div>
          <h4 className="font-semibold mb-2">Prevention Steps</h4>
          <ul className="space-y-2">
            {prevention.map((step, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600">
                <CircleDot className="w-4 h-4 text-primary" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Pill className="w-6 h-6 text-green-500 animate-pulse mt-1" />
        <div>
          <h4 className="font-semibold mb-2">Treatment Recommendations</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-primary" />
              <span className="font-medium">Medicine:</span> {treatment.medicine}
            </p>
            <p className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-primary" />
              <span className="font-medium">Dosage:</span> {treatment.dosage}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium">Frequency:</span> {treatment.frequency}
            </p>
            <p className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              <span className="font-medium">Instructions:</span> {treatment.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}