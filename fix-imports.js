/**
 * This is a utility script to fix import paths in your project
 * Save this file to your project root and run with: node fix-imports.js
 */

const fs = require('fs');
const path = require('path');

// Define the directory to start searching from
const startDir = path.join(__dirname, 'src');

// Function to recursively walk through directories
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

// Process each JavaScript/JSX file
walkDir(startDir, function(filePath) {
  // Only process JavaScript/JSX files
  if (!filePath.match(/\.(js|jsx)$/)) return;
  
  // Skip the fix script itself
  if (filePath.endsWith('fix-imports.js')) return;
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix the import paths
  const modified = content.replace(
    /from ['"]\.\.?\/contexts\/Calculator\.Context['"]/g, 
    'from \'../contexts/CalculatorContext\''
  ).replace(
    /from ['"]\.\.?\/contexts\/Calculator\.Context['"]/g, 
    'from \'../contexts/CalculatorContext\''
  );
  
  // Save the file if it was modified
  if (content !== modified) {
    console.log(`Fixed import paths in ${filePath}`);
    fs.writeFileSync(filePath, modified, 'utf8');
  }
});

console.log('Import paths fixed successfully!');