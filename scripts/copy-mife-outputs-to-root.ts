import fs from 'fs';
import path from 'path';

const APPS_DIR = path.join(process.cwd(), 'apps');
const ROOT_DIST_DIR = path.join(process.cwd(), 'apps', 'root', 'dist');
const MIFE_FILES_DIR = path.join(ROOT_DIST_DIR, 'mife-files');

async function copySpaFiles() {
  // Get all app directories except 'root'
  const apps = fs
    .readdirSync(APPS_DIR)
    .filter((app) => fs.statSync(path.join(APPS_DIR, app)).isDirectory())
    .filter((app) => app !== 'root');

  // Create the spa-files directory if it doesn't exist
  if (!fs.existsSync(MIFE_FILES_DIR)) {
    fs.mkdirSync(MIFE_FILES_DIR, { recursive: true });
  }

  // Find and copy all spa.js files
  for (const app of apps) {
    const spaFile = path.join(APPS_DIR, app, 'dist', 'spa.js');

    if (fs.existsSync(spaFile)) {
      const newFileName = `${app}-spa.js`;
      const targetPath = path.join(MIFE_FILES_DIR, newFileName);

      fs.copyFileSync(spaFile, targetPath);
      console.log(`Copied ${spaFile} to ${targetPath}`);
    }
  }
}

copySpaFiles();
