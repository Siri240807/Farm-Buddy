import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface DiseaseStatusProps {
  status: "severe" | "moderate" | "healthy";
  affectedArea: number;
}

export function DiseaseStatus({ status, affectedArea }: DiseaseStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "severe":
        return <XCircle className="w-6 h-6 text-red-500 animate-pulse" />;
      case "moderate":
        return <AlertCircle className="w-6 h-6 text-yellow-500 animate-bounce" />;
      case "healthy":
        return <CheckCircle className="w-6 h-6 text-green-500 animate-bounce" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "severe":
        return "text-red-500";
      case "moderate":
        return "text-yellow-500";
      case "healthy":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Status:</span>
        {getStatusIcon(status)}
        <span className={`font-medium ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Affected Area:</span>
        <span className="font-medium">{affectedArea}%</span>
      </div>
    </div>
  );
}