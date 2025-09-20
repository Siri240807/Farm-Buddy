import jsPDF from "jspdf";
import { AnalysisData } from "../types/analysis";

export const generatePDF = (
  cropType: string,
  imageUrl: string,
  analysisData: AnalysisData
) => {
  const pdf = new jsPDF();
  let yPos = 20;

  // Add border
  pdf.setDrawColor(76, 175, 80);
  pdf.setLineWidth(0.5);
  pdf.rect(10, 10, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 20);

  // Header
  pdf.setFontSize(28);
  pdf.setTextColor(76, 175, 80);
  pdf.setFont("helvetica", "bold");
  pdf.text("Xpedition R", pdf.internal.pageSize.width / 2, yPos, { align: "center" });
  
  yPos += 20;
  pdf.setFontSize(18);
  pdf.setTextColor(33, 33, 33);
  pdf.text(`Crop Disease Analysis Report - ${cropType}`, pdf.internal.pageSize.width / 2, yPos, { align: "center" });
  yPos += 25;

  // Add analyzed image
  if (imageUrl) {
    const imgWidth = 120;
    const imgHeight = 90;
    pdf.addImage(imageUrl, 'JPEG', (pdf.internal.pageSize.width - imgWidth) / 2, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 15;
  }

  // Disease Information
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Disease Information", 25, yPos);
  yPos += 10;

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Disease: ${analysisData.diseaseName}`, 25, yPos);
  yPos += 8;
  pdf.text(`Confidence: ${analysisData.confidence}%`, 25, yPos);
  yPos += 15;

  // Status
  const statusColor = {
    severe: "#D32F2F",
    moderate: "#F57C00",
    healthy: "#388E3C"
  }[analysisData.status];
  
  pdf.setTextColor(statusColor);
  pdf.text(`Status: ${analysisData.status.toUpperCase()}`, 25, yPos);
  yPos += 8;
  
  pdf.setTextColor(33, 33, 33);
  pdf.text(`Affected Area: ${analysisData.affectedArea}%`, 25, yPos);
  yPos += 15;

  // Treatment Recommendations
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Treatment Recommendations", 25, yPos);
  yPos += 10;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  
  const treatment = analysisData.treatment;
  pdf.text(`Medicine: ${treatment.medicine}`, 25, yPos); yPos += 8;
  pdf.text(`Dosage: ${treatment.dosage}`, 25, yPos); yPos += 8;
  pdf.text(`Frequency: ${treatment.frequency}`, 25, yPos); yPos += 8;
  pdf.text(`Instructions: ${treatment.instructions}`, 25, yPos);

  // Footer
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(10);
  pdf.setTextColor(180, 180, 180);
  pdf.text(
    "Xpedition R Crop Health",
    pdf.internal.pageSize.width - 20,
    pdf.internal.pageSize.height - 10,
    { align: "right" }
  );

  return pdf;
};