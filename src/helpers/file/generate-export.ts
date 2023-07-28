import fs from 'node:fs';
import path from 'node:path';

import { copyDir, printMessage, throwError } from 'helpers';

interface IGenerateExport {
  // The path to the .builda directory
  buildaDir: string;
  // The path to the prefab
  prefabDir: string;
}

/**
 * Generate the export directory
 */
export async function generateExport({
  buildaDir,
  prefabDir
}: IGenerateExport) {
  if (!fs.existsSync(prefabDir)) {
    throwError('No prefab found, cannot export');
  }

  const workingDir = path.join(buildaDir, 'export');

  printMessage('Creating export path...', 'processing');

  // Delete the export directory if it exists
  if (fs.existsSync(workingDir)) {
    fs.rmSync(workingDir, { recursive: true });
  }
  // Create the export directory and copy the prefab directory files into it
  copyDir(prefabDir, workingDir);

  printMessage('Export path created', 'success');

  const exportBuildaDir = path.join(workingDir, '.builda');
  // Delete the .builda directory from the export directory
  if (fs.existsSync(exportBuildaDir)) {
    fs.rmSync(exportBuildaDir, { recursive: true });
  }

  printMessage('Initial export created', 'success');
}

export default generateExport;
