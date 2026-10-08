import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(path.join(process.cwd(), 'src'), (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/import React(?:, \{.*?\})? from 'react';\n?/g, (match) => {
        if(match.includes('{')) {
             return match.replace(/React, /, '');
        }
        return '';
    });
    // Remove unused SectionHeading import in About.tsx
    if (filePath.endsWith('About.tsx')) {
        content = content.replace(/import \{ SectionHeading \} from '\.\.\/ui\/SectionHeading';\n?/, '');
    }
    fs.writeFileSync(filePath, content);
  }
});
console.log('Cleanup done.');
