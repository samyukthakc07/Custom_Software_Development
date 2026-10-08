const fs = require('fs');
const files = [
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/sections/Brochure.tsx'
];
files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  text = text.replace(/download="Hackers-Infotech-Company-Brochure.pdf"/g, 'download="Hackers-Infotech-Custom-Software-Brochure.pdf"');
  fs.writeFileSync(f, text);
});
console.log('Updated filenames');
