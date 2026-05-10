const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\btext-white\b/g, replace: 'text-text-primary' },
  { regex: /\btext-white\/([0-9]+)\b/g, replace: 'text-text-primary/$1' },
  { regex: /\bbg-black\b/g, replace: 'bg-background' },
  { regex: /\bbg-zinc-900\b/g, replace: 'bg-surface' },
  { regex: /\border-white\/([0-9]+)\b/g, replace: 'border-border' },
  { regex: /\bbg-white\/([0-9]+)\b/g, replace: 'bg-text-primary/$1' },
  { regex: /\btext-gray-100\b/g, replace: 'text-text-primary' },
  { regex: /\btext-gray-200\b/g, replace: 'text-text-primary' },
  { regex: /\btext-gray-300\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-gray-400\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-gray-500\b/g, replace: 'text-text-secondary' },
  { regex: /\border-white\b/g, replace: 'border-border' },
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { regex, replace } of replacements) {
        // Reset regex state
        regex.lastIndex = 0;
        if (regex.test(content)) {
          regex.lastIndex = 0; // reset again before replace
          content = content.replace(regex, replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walk('./src');
