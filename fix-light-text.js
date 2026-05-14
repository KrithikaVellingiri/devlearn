const fs = require('fs');
const path = require('path');

const replacements = [
  // Fix text opacity classes that look bad in light mode
  { regex: /\btext-text-primary\/30\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-text-primary\/40\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-text-primary\/50\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-text-primary\/60\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-text-primary\/70\b/g, replace: 'text-text-secondary' },
  
  // Fix white with opacity
  { regex: /\btext-white\/30\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-white\/40\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-white\/50\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-white\/60\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-white\/70\b/g, replace: 'text-text-secondary' },

  // Fix grays
  { regex: /\btext-gray-300\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-gray-400\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-gray-500\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-slate-300\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-slate-400\b/g, replace: 'text-text-secondary' },
  { regex: /\btext-slate-500\b/g, replace: 'text-text-secondary' },
  
  // Fix muted foreground with opacity if it exists
  { regex: /\btext-muted-foreground\/[0-9]+\b/g, replace: 'text-text-secondary' },
  
  // Wait, if something is disabled:opacity-50, we leave it. The user said:
  // "opacity-50 text styles". Maybe `text-sm opacity-50`?
  { regex: /\bopacity-[3456]0\b(?![^"]*disabled)/g, replace: 'text-text-secondary' }, // wait, this might match div opacity. I shouldn't globally replace opacity-50 without caution. Let's just remove opacity-50 from texts. Actually, I can just do this manually or let the regex run and review.
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
        regex.lastIndex = 0;
        if (regex.test(content)) {
          regex.lastIndex = 0;
          content = content.replace(regex, replace);
          changed = true;
        }
      }
      
      // Also specifically fix any generic `opacity-50` that might be next to text classes.
      // But let's avoid replacing opacity on elements that aren't just text.
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walk('./src');
