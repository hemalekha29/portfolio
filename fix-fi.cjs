const fs = require('fs');

const p = 'src/styles/About.css';
const lines = fs.readFileSync(p, 'utf8').split('\n');

// Replace the four original float-icon rules.
const replacements = {
  '.fi-0 { top: 10px;   right: -12px; animation-delay: 0s;   }':
    '.fi-0 { top: 8px;    right: -30px; animation-delay: 0s;   }',
  '.fi-1 { top: 60px;   left: -12px;  animation-delay: 0.7s; }':
    '.fi-1 { top: 56px;   left: -30px;  animation-delay: 0.7s; }',
  '.fi-2 { bottom: 60px;right: -12px;  animation-delay: 1.4s; }':
    '.fi-2 { bottom: 56px;right: -30px;  animation-delay: 1.4s; }',
  '.fi-3 { bottom: 10px;left: -12px;  animation-delay: 2.1s; }':
    '.fi-3 { bottom: 8px; left: -30px;  animation-delay: 2.1s; }',
  '.fi-4 { top: 35px;  right: -26px; animation-delay: 2.8s; }':
    '.fi-4 { top: 94px;   right: -40px; animation-delay: 2.8s; }',
  '.fi-5 { bottom: 35px;left: -26px;  animation-delay: 3.5s; }':
    '.fi-5 { bottom: 94px;left: -40px;  animation-delay: 3.5s; }',
};

let changed = 0;
for (let i = 0; i < lines.length; i++) {
  const key = lines[i].trim();
  if (replacements[key]) {
    lines[i] = replacements[key];
    changed++;
  }
}

fs.writeFileSync(p, lines.join('\n'));
console.log('replaced', changed, 'rules');
