import { forwardRef, useRef, useImperativeHandle } from "react";
import html2pdf from "html2pdf.js";

const PdfConverter = forwardRef(({ children }, ref) => {
  const contentRef = useRef(null);

  useImperativeHandle(ref, () => ({
    convertToPdf: () => {
      if (!contentRef.current) return;

      const options = {
        filename: "schedule.pdf",
        margin: [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          useCORS: true,
          allowTaint: true,
          logging: false,
          scale: 2, // Higher scale improves resolution
          windowWidth: 1280,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      };


      html2pdf().set(options).from(contentRef.current).save();
    },
  }));

  return <div ref={contentRef}>{children}</div>;
});

export default PdfConverter;
