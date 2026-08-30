import jsPDF from "jspdf";
import html2canvas from "html2canvas";

async function canvasToData(canvas) {
  return html2canvas(canvas, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    imageTimeout: 0,
    scrollX: 0,
    scrollY: 0,
    windowWidth: canvas.scrollWidth,
    windowHeight: canvas.scrollHeight,
  });
}

export async function generatePDF(element) {
  if (!element) {
    console.error("PDF element not found");
    return;
  }

  try {
    const pages = Array.from(
      element.querySelectorAll(".resume-output-page")
    );

    if (!pages.length) {
      console.error("Resume output pages not found");
      return;
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let index = 0; index < pages.length; index += 1) {
      const canvas = await canvasToData(pages[index]);

      if (!canvas.width || !canvas.height) {
        console.error(`Generated canvas is empty for page ${index + 1}`);
        continue;
      }

      const imgData = canvas.toDataURL("image/png");

      if (index > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        "FAST"
      );
    }

    pdf.save("resume.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
}
