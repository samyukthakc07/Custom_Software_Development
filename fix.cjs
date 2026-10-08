const fs = require('fs');
let c = fs.readFileSync('src/components/sections/RequirementVisualizer.tsx', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('src/components/sections/RequirementVisualizer.tsx', c);
