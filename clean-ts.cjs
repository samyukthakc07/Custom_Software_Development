const fs = require('fs');

const filesToClean = [
  'src/components/layout/Navbar.tsx',
  'src/components/sections/Affordability.tsx',
  'src/components/sections/FinalCTA.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/sections/Process.tsx',
  'src/components/sections/Progression.tsx',
  'src/components/sections/RequirementSales.tsx',
  'src/components/sections/Services.tsx',
  'src/components/sections/TargetAudience.tsx',
  'src/components/sections/Vision.tsx'
];

filesToClean.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/import React(, \{[^}]+\})? from 'react';\n/g, (match, p1) => {
        if (p1) {
            return `import ${p1.trim()} from 'react';\n`;
        }
        return '';
    });
    content = content.replace(/import React from 'react';/g, '');
    content = content.replace(/, ArrowRight /g, ' ');
    content = content.replace(/import \{ motion \} from 'framer-motion';/g, '');
    content = content.replace(/import \{ cn \} from '..\/..\/utils\/cn';/g, '');
    fs.writeFileSync(f, content);
  }
});
console.log('Cleaned TS errors');
