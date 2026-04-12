import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

async function extract_text(pdf_buffer) {
  try {
    const uint8Array = new Uint8Array(pdf_buffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }

    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

export default extract_text;
