import * as fs from 'fs';
import * as path from 'path';

// Get the project root directory (backend folder)
const rootDir = path.resolve(__dirname, '../..');
console.log('Root directory:', rootDir);

// Define source and target directories
const sourceDir = path.join(rootDir, 'cv-chatbot-backend', 'cv-files');
const targetDir = path.join(rootDir, 'dist', 'cv-chatbot-backend', 'cv-files');

try {
    console.log('Source directory:', sourceDir);
    console.log('Target directory:', targetDir);

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
        console.error(`Source directory not found: ${sourceDir}`);
        console.error('Current directory:', __dirname);
        process.exit(1);
    }

    // Copy all .txt files
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
        if (file.endsWith('.txt')) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied: ${file}`);
        }
    });

    console.log('CV files copied successfully!');
} catch (error) {
    console.error('Error copying files:', error);
    console.error('Current directory:', __dirname);
    process.exit(1);
} 