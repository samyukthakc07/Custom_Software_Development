const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const companyData = {
  companyName: "Hackers Infotech",
  phone: "+91 90424 01206",
  email: "business@hackersinfotech.com",
  addressShort: "R.S. Puram, Coimbatore, Tamil Nadu 641001",
  addressLines: [
    "No.11, No 2, 1st Floor,",
    "Sri Paramjyothi Aiswaryam Complex,",
    "58, VCV Rd, near Milk Market,",
    "VCV Layout, R.S. Puram,",
    "Coimbatore, Tamil Nadu 641001"
  ]
};

// Colors
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return rgb(r, g, b);
};

const c = {
  white: hexToRgb('#FFFFFF'),
  navy: hexToRgb('#0F172A'),
  primaryBlue: hexToRgb('#2563EB'),
  accentBlue: hexToRgb('#3B82F6'),
  lightBlue: hexToRgb('#EFF6FF'),
  lightGray: hexToRgb('#F8FAFC'),
  mediumGray: hexToRgb('#64748B'),
  border: hexToRgb('#E2E8F0'),
};

async function createBrochure() {
  const pdfDoc = await PDFDocument.create();
  const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const logoBlueBytes = fs.readFileSync(path.join(process.cwd(), 'public/brand/hackers-infotech-logo-blue.png'));
  const logoBlue = await pdfDoc.embedPng(logoBlueBytes);
  const logoWhiteBytes = fs.readFileSync(path.join(process.cwd(), 'public/brand/hackers-infotech-logo-white.png'));
  const logoWhite = await pdfDoc.embedPng(logoWhiteBytes);

  const margin = 52;
  const pw = 595.28;
  const ph = 841.89;
  const cw = pw - margin * 2;

  const wrapText = (text, maxWidth, font, fontSize) => {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const drawFooter = (page, pageNum, isDark = false) => {
    const y = 30;
    page.drawLine({ start: {x: margin, y: y+16}, end: {x: pw-margin, y: y+16}, thickness: 1, color: isDark ? c.primaryBlue : c.border });
    page.drawText(companyData.companyName, { x: margin, y, size: 8, font: fontBold, color: isDark ? c.white : c.navy });
    page.drawText("0" + pageNum + " / 04", { x: pw - margin - 25, y, size: 8, font: fontBold, color: isDark ? c.white : c.mediumGray });
  };

  // =========================================================================
  // PAGE 1: COVER
  // =========================================================================
  const p1 = pdfDoc.addPage([pw, ph]);
  
  // Background graphic for right side
  p1.drawRectangle({ x: pw * 0.55, y: 0, width: pw * 0.45, height: ph, color: c.lightGray });
  p1.drawRectangle({ x: pw * 0.55, y: ph - 300, width: pw * 0.45, height: 300, color: c.lightBlue });
  
  let y = ph - 100;

  p1.drawImage(logoBlue, {x: margin, y: y - 5, width: 22, height: 22});
  p1.drawText("HACKERS INFOTECH", { x: margin + 30, y, size: 10, font: fontBold, color: c.primaryBlue });
  
  y -= 80;
  p1.drawText("CUSTOM SOFTWARE", { x: margin, y, size: 34, font: fontBold, color: c.navy });
  y -= 40;
  p1.drawText("BUILT AROUND", { x: margin, y, size: 34, font: fontBold, color: c.navy });
  y -= 40;
  p1.drawText("YOUR BUSINESS.", { x: margin, y, size: 34, font: fontBold, color: c.primaryBlue });

  y -= 40;
  p1.drawText("Websites • Applications • Custom Software", { x: margin, y, size: 10, font: fontBold, color: c.mediumGray });

  y -= 30;
  let p1Lines = wrapText("Professional digital solutions designed around your requirements, business and budget.", cw * 0.48, fontReg, 11);
  p1Lines.forEach(l => { p1.drawText(l, {x: margin, y, size: 11, font: fontReg, color: c.navy}); y -= 16; });

  // Abstract Tech Illustration (Right Side Overlapping)
  // Desktop window
  p1.drawRectangle({ x: pw * 0.55 - 40, y: ph - 450, width: 220, height: 140, color: c.white, borderColor: c.border, borderWidth: 1, radius: 4 });
  // Desktop header
  p1.drawRectangle({ x: pw * 0.55 - 40, y: ph - 330, width: 220, height: 20, color: c.lightGray });
  p1.drawCircle({ x: pw * 0.55 - 30, y: ph - 320, size: 3, color: c.border });
  p1.drawCircle({ x: pw * 0.55 - 20, y: ph - 320, size: 3, color: c.border });
  // Desktop content elements
  p1.drawRectangle({ x: pw * 0.55 - 20, y: ph - 360, width: 80, height: 10, color: c.lightBlue });
  p1.drawRectangle({ x: pw * 0.55 - 20, y: ph - 380, width: 140, height: 6, color: c.border });
  p1.drawRectangle({ x: pw * 0.55 - 20, y: ph - 392, width: 120, height: 6, color: c.border });
  
  // Mobile window (overlapping)
  p1.drawRectangle({ x: pw * 0.55 + 100, y: ph - 500, width: 80, height: 160, color: c.navy, radius: 8 });
  p1.drawRectangle({ x: pw * 0.55 + 110, y: ph - 370, width: 60, height: 20, color: c.primaryBlue, radius: 2 });
  p1.drawRectangle({ x: pw * 0.55 + 110, y: ph - 400, width: 60, height: 8, color: c.white, opacity: 0.2 });
  p1.drawRectangle({ x: pw * 0.55 + 110, y: ph - 415, width: 40, height: 8, color: c.white, opacity: 0.2 });
  p1.drawRectangle({ x: pw * 0.55 + 110, y: ph - 450, width: 60, height: 24, color: c.white, opacity: 0.1 });

  // Floating panel
  p1.drawRectangle({ x: pw * 0.55 - 60, y: ph - 530, width: 140, height: 70, color: c.white, borderColor: c.primaryBlue, borderWidth: 2, radius: 4 });
  p1.drawRectangle({ x: pw * 0.55 - 45, y: ph - 485, width: 40, height: 10, color: c.primaryBlue });
  p1.drawLine({ start: {x: pw * 0.55 - 45, y: ph - 495}, end: {x: pw * 0.55 + 50, y: ph - 495}, thickness: 1, color: c.border });
  p1.drawLine({ start: {x: pw * 0.55 - 45, y: ph - 505}, end: {x: pw * 0.55 + 20, y: ph - 505}, thickness: 1, color: c.border });

  // Bottom Editorial Strip
  y = 200;
  p1.drawLine({ start: {x: margin, y: y+20}, end: {x: pw - margin, y: y+20}, thickness: 2, color: c.navy });
  
  p1.drawText("CUSTOMIZED", { x: margin, y, size: 10, font: fontBold, color: c.primaryBlue });
  p1.drawCircle({ x: margin + 95, y: y + 4, size: 2, color: c.border });
  p1.drawText("AFFORDABLE", { x: margin + 120, y, size: 10, font: fontBold, color: c.primaryBlue });
  p1.drawCircle({ x: margin + 215, y: y + 4, size: 2, color: c.border });
  p1.drawText("FLEXIBLE", { x: margin + 240, y, size: 10, font: fontBold, color: c.primaryBlue });

  y -= 30;
  p1.drawText("Built for small businesses, startups, growing companies and enterprises.", { x: margin, y, size: 10, font: fontReg, color: c.navy });

  y -= 40;
  p1.drawText("Tell us what you need.", { x: margin, y, size: 12, font: fontBold, color: c.navy });
  y -= 20;
  p1.drawText("+91 90424 01206", { x: margin, y, size: 10, font: fontReg, color: c.mediumGray });
  y -= 16;
  p1.drawText("business@hackersinfotech.com", { x: margin, y, size: 10, font: fontReg, color: c.mediumGray });

  drawFooter(p1, 1);

  // =========================================================================
  // PAGE 2: WHAT WE BUILD
  // =========================================================================
  const p2 = pdfDoc.addPage([pw, ph]);
  y = ph - margin - 40;

  p2.drawText("FROM A SIMPLE WEBSITE", { x: margin, y, size: 26, font: fontBold, color: c.navy });
  y -= 30;
  p2.drawText("TO CUSTOM SOFTWARE.", { x: margin, y, size: 26, font: fontBold, color: c.primaryBlue });
  
  y -= 24;
  p2.drawText("Whatever your business needs, we help turn the requirement into the right digital solution.", { x: margin, y, size: 12, font: fontReg, color: c.mediumGray });
  
  y -= 30;
  p2.drawLine({ start: {x: margin, y}, end: {x: pw-margin, y}, thickness: 1, color: c.border });

  // 3 Column Editorial Layout
  const colCount = 3;
  const colW = (cw - (colCount - 1) * 24) / colCount;
  
  const services = [
    { n: "01", t: "BUSINESS WEBSITES", d: "Professional websites designed around your business, services and brand.", i: ["Company Websites", "Service Websites", "Landing Pages", "Portfolio Websites"] },
    { n: "02", t: "E-COMMERCE", d: "Customized online selling experiences for products and services.", i: ["Online Stores", "Product Catalogs", "Ordering Systems", "Payment Integration"] },
    { n: "03", t: "WEB APPLICATIONS", d: "Interactive applications built around your business workflows.", i: ["Booking Systems", "Customer Portals", "Dashboards", "Management Systems"] },
    { n: "04", t: "MOBILE APPLICATIONS", d: "Custom mobile experiences for customers, teams and services.", i: [] },
    { n: "05", t: "CUSTOM SOFTWARE", d: "Software designed specifically around how your business operates.", i: ["CRM", "Inventory", "Billing", "Workflow Systems"] },
    { n: "06", t: "AI & AUTOMATION", d: "AI-powered functionality and automation integrated into business processes.", i: [] }
  ];

  y -= 50;
  const startY = y;
  
  services.forEach((srv, idx) => {
    let col = idx % colCount;
    let row = Math.floor(idx / colCount);
    let curX = margin + col * (colW + 24);
    let curY = startY - (row * 240);
    
    // Large Number
    p2.drawText(srv.n, { x: curX, y: curY, size: 32, font: fontBold, color: c.lightBlue });
    
    // Title
    p2.drawText(srv.t, { x: curX, y: curY - 24, size: 12, font: fontBold, color: c.navy });
    
    // Line separator
    p2.drawLine({ start: {x: curX, y: curY - 36}, end: {x: curX + 40, y: curY - 36}, thickness: 2, color: c.primaryBlue });
    
    // Description
    let dy = curY - 54;
    wrapText(srv.d, colW - 10, fontReg, 10).forEach(l => {
      p2.drawText(l, { x: curX, y: dy, size: 10, font: fontReg, color: c.navy });
      dy -= 14;
    });
    
    // Items
    dy -= 10;
    srv.i.forEach(item => {
      p2.drawText(item, { x: curX, y: dy, size: 9.5, font: fontReg, color: c.mediumGray });
      dy -= 14;
    });
  });

  drawFooter(p2, 2);

  // =========================================================================
  // PAGE 3: THE SALES PITCH
  // =========================================================================
  const p3 = pdfDoc.addPage([pw, ph]);
  y = ph - margin - 40;

  // Background graphic behind heading
  p3.drawRectangle({ x: margin, y: y - 20, width: 280, height: 60, color: c.lightBlue });
  
  p3.drawText("SOFTWARE THAT FITS", { x: margin + 10, y: y + 8, size: 28, font: fontBold, color: c.navy });
  p3.drawText("YOUR BUSINESS —", { x: margin + 10, y: y - 24, size: 28, font: fontBold, color: c.navy });
  p3.drawText("AND YOUR BUDGET.", { x: margin + 10, y: y - 56, size: 28, font: fontBold, color: c.primaryBlue });

  y -= 140;

  const diffs = [
    { n: "01", t: "CUSTOMIZED", d1: "Your business isn't generic. Your software shouldn't be either.", d2: "We design around your actual requirements, workflows and goals." },
    { n: "02", t: "AFFORDABLE", d1: "Build what creates value.", d2: "We focus the project on useful functionality instead of unnecessary complexity and inflated scope." },
    { n: "03", t: "FLEXIBLE", d1: "Start where you are.", d2: "Launch with what you need today and expand as your business grows." }
  ];

  const dColW = (cw - 48) / 3;
  diffs.forEach((d, i) => {
    let dx = margin + i * (dColW + 24);
    p3.drawText(d.n, { x: dx, y, size: 14, font: fontBold, color: c.primaryBlue });
    p3.drawText(d.t, { x: dx, y: y - 20, size: 14, font: fontBold, color: c.navy });
    
    let dy = y - 45;
    wrapText(d.d1, dColW, fontBold, 10).forEach(l => {
      p3.drawText(l, { x: dx, y: dy, size: 10, font: fontBold, color: c.navy });
      dy -= 14;
    });
    
    dy -= 8;
    wrapText(d.d2, dColW, fontReg, 10).forEach(l => {
      p3.drawText(l, { x: dx, y: dy, size: 10, font: fontReg, color: c.mediumGray });
      dy -= 14;
    });
  });

  // Vision Statement
  y -= 260;
  p3.drawRectangle({ x: margin, y: y - 80, width: cw, height: 120, color: c.lightBlue });
  p3.drawText("OUR VISION", { x: margin + 30, y: y + 10, size: 10, font: fontBold, color: c.primaryBlue });
  
  let vy = y - 14;
  wrapText("Customized technology should be accessible to every business.", cw - 60, fontBold, 16).forEach(l => {
    p3.drawText(l, { x: margin + 30, y: vy, size: 16, font: fontBold, color: c.navy });
    vy -= 22;
  });
  
  vy -= 4;
  wrapText("From a local business that needs its first website to a company that needs a complete software platform, professional custom development should be practical and accessible.", cw - 60, fontReg, 11).forEach(l => {
    p3.drawText(l, { x: margin + 30, y: vy, size: 11, font: fontReg, color: c.navy });
    vy -= 16;
  });

  // Process
  y -= 180;
  const pSteps = ["TELL US", "PLAN", "BUILD", "LAUNCH"];
  const sW = cw / 4;
  
  p3.drawLine({ start: {x: margin + 40, y: y + 4}, end: {x: margin + cw - 40, y: y + 4}, thickness: 1, color: c.border });
  
  pSteps.forEach((s, i) => {
    let sx = margin + i * sW;
    p3.drawCircle({ x: sx + 20, y: y + 4, size: 4, color: c.primaryBlue });
    p3.drawText(s, { x: sx + 32, y, size: 11, font: fontBold, color: c.navy });
  });

  p3.drawText("Tell us your requirement. We'll help with the technology.", { x: margin, y: y - 30, size: 12, font: fontReg, color: c.mediumGray });

  drawFooter(p3, 3);

  // =========================================================================
  // PAGE 4: SALES CLOSING
  // =========================================================================
  const p4 = pdfDoc.addPage([pw, ph]);
  p4.drawRectangle({ x: 0, y: 0, width: pw, height: ph, color: c.navy });
  
  // Geometric brand elements on back cover
  p4.drawRectangle({ x: pw - 200, y: ph - 300, width: 200, height: 2, color: c.primaryBlue, opacity: 0.5 });
  p4.drawRectangle({ x: pw - 200, y: ph - 320, width: 150, height: 2, color: c.primaryBlue, opacity: 0.3 });
  p4.drawRectangle({ x: pw - 200, y: ph - 340, width: 100, height: 2, color: c.primaryBlue, opacity: 0.1 });

  y = ph - margin - 40;
  p4.drawText("READY TO BUILD?", { x: margin, y, size: 10, font: fontBold, color: c.primaryBlue });
  
  y -= 40;
  p4.drawText("LET'S TURN YOUR IDEA", { x: margin, y, size: 34, font: fontBold, color: c.white });
  y -= 40;
  p4.drawText("INTO SOMETHING REAL.", { x: margin, y, size: 34, font: fontBold, color: c.primaryBlue });

  y -= 40;
  wrapText("Whether you need a simple website or completely custom software, tell us what you're trying to build.", cw * 0.7, fontReg, 14).forEach(l => {
    p4.drawText(l, { x: margin, y, size: 14, font: fontReg, color: c.border });
    y -= 20;
  });

  // Central Visual Abstract (Vector composition instead of text)
  y -= 80;
  const abY = y;
  p4.drawCircle({ x: margin + 30, y: abY, size: 40, color: c.white, opacity: 0.05 });
  p4.drawCircle({ x: margin + 120, y: abY - 40, size: 50, color: c.primaryBlue, opacity: 0.1 });
  p4.drawCircle({ x: margin + 230, y: abY - 80, size: 60, color: c.accentBlue, opacity: 0.15 });
  
  // Connecting lines
  p4.drawLine({ start: {x: margin + 40, y: abY - 10}, end: {x: margin + 100, y: abY - 30}, thickness: 2, color: c.primaryBlue });
  p4.drawLine({ start: {x: margin + 140, y: abY - 50}, end: {x: margin + 200, y: abY - 70}, thickness: 2, color: c.primaryBlue });
  p4.drawLine({ start: {x: margin + 260, y: abY - 90}, end: {x: margin + 320, y: abY - 110}, thickness: 2, color: c.primaryBlue });

  // Abstract nodes text
  p4.drawText("IDEA", { x: margin + 15, y: abY - 4, size: 12, font: fontBold, color: c.white });
  p4.drawText("DESIGN", { x: margin + 98, y: abY - 44, size: 12, font: fontBold, color: c.white });
  p4.drawText("BUILD", { x: margin + 213, y: abY - 84, size: 12, font: fontBold, color: c.white });
  p4.drawText("LAUNCH", { x: margin + 325, y: abY - 124, size: 12, font: fontBold, color: c.primaryBlue });

  // CTA Section
  y -= 200;
  p4.drawText("START A CONVERSATION", { x: margin, y, size: 14, font: fontBold, color: c.white });
  p4.drawLine({ start: {x: margin, y: y - 10}, end: {x: margin + 180, y: y - 10}, thickness: 2, color: c.primaryBlue });
  
  y -= 35;
  p4.drawText(companyData.phone, { x: margin, y, size: 16, font: fontReg, color: c.white });
  y -= 24;
  p4.drawText(companyData.email, { x: margin, y, size: 16, font: fontReg, color: c.white });

  // Contact Details
  y -= 80;
  // Left side
  p4.drawImage(logoWhite, {x: margin, y: y - 5, width: 22, height: 22});
  p4.drawText("HACKERS INFOTECH", { x: margin + 30, y, size: 12, font: fontBold, color: c.white });
  
  // Right side
  let rx = margin + cw * 0.45;
  p4.drawText(companyData.addressShort, { x: rx, y, size: 10, font: fontBold, color: c.white });
  
  let addrY = y - 16;
  companyData.addressLines.forEach(l => {
    p4.drawText(l, { x: rx, y: addrY, size: 9, font: fontReg, color: c.border });
    addrY -= 14;
  });

  drawFooter(p4, 4, true);

  const pdfBytes = await pdfDoc.save();
  const pdfDir = path.join(process.cwd(), 'public/brochures');
  fs.writeFileSync(path.join(pdfDir, 'company-brochure.pdf'), pdfBytes);
  console.log('Premium 4-Page Brochure generated successfully!');
}

createBrochure().catch(console.error);
