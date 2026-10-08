import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;
  
  page.drawText('Hackers Infotech Brochure', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });
  
  const pdfBytes = await pdfDoc.save();
  
  const pdfDir = path.join(process.cwd(), 'public/brochures');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(pdfDir, 'company-brochure.pdf'), pdfBytes);
  console.log('PDF generated successfully!');
}

createPdf().catch(console.error);
