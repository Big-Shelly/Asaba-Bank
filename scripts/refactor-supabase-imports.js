const fs = require('fs');
const path = require('path');

const directory = path.join(process.cwd());

function walk(dir, callback) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (
      fs.statSync(fullPath).isDirectory() &&
      !['node_modules', '.next', 'out', '.git'].includes(file)
    ) {
      walk(fullPath, callback);
    } else if (file.endsWith('.tsx')) {
      callback(fullPath);
    }
  }
}

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const usesCreateClient = content.includes('createBrowserClient');
  const usesSupabaseState = content.includes('const [supabase] = useState(');
  const alreadyUsesHook = content.includes('useSupabase');

  if (!usesCreateClient && !usesSupabaseState) return;

  // Remove createBrowserClient import
  content = content.replace(
    /import\s*\{\s*createBrowserClient\s*\}\s*from\s*['"]@supabase\/ssr['"]\s*;?/,
    ''
  );

  // Replace the useState(() => createBrowserClient(...))
  content = content.replace(
    /const\s*\[supabase\]\s*=\s*useState\s*\(\s*\(\s*\)\s*=>\s*createBrowserClient\s*\([\s\S]*?\)\s*\)\s*\);?/,
    'const supabase = useSupabase();'
  );

  // Add useSupabase import if missing
  if (!alreadyUsesHook) {
    const firstImportIndex = content.indexOf('import');
    const newlineAfter = content.indexOf('\n', firstImportIndex);
    content =
      content.slice(0, newlineAfter + 1) +
      `import { useSupabase } from '@/hooks/useSupabase';\n` +
      content.slice(newlineAfter + 1);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✔️  Refactored: ${filePath}`);
}

walk(directory, refactorFile);
