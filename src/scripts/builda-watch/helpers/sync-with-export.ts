import globals from 'data/globals';
import { copyPath, getRegistry, loopAndRewriteFiles } from 'helpers';
import path from 'node:path';
import fs from 'node:fs';
import { RootFile } from 'types/module-registry';

type SyncType = 'copy' | 'update' | 'rename' | 'delete';

interface SyncOptions {
  // The type of sync to perform
  type: SyncType;
  // The path to sync
  pathString: string;
}

// Syncronises changes with the export folder
export const syncWithExport = async ({ type, pathString }: SyncOptions) => {
  const root = process.cwd();
  const exportRoot = path.resolve(root, globals.buildaDir, 'export');
  const registry = await getRegistry(exportRoot);

  const cleanRoot = root.replace(/\.\//, '');

  if (type === 'copy') {
    // Copy the prefab files to the export directory
    return copyPath(`${cleanRoot}/${pathString}`, exportRoot, pathString);
  }

  if (type === 'update') {
    // Delete the original file in the export directory
    // and create a new copy of the file from the root

    // Check the registry to see if the file has any substitutions
    const fileWithSubstitutions = registry.generatorOptions?.rootFiles?.find(
      (rootFile: string | RootFile) => {
        if (typeof rootFile === 'string') {
          // We don't need to worry about path only root files
          return false;
        } else if (
          !rootFile.substitutions ||
          rootFile.substitutions.length === 0
        ) {
          // We don't need to worry about root files without substitutions
          return false;
        } else {
          return rootFile.path === pathString;
        }
      }
    ) as RootFile;

    // Delete the original file
    fs.rmSync(path.join(exportRoot, pathString), {
      recursive: true,
      force: true
    });

    if (fileWithSubstitutions) {
      // If the file is a root file, we need to loop through the substitutions
      await loopAndRewriteFiles({
        name: registry.name,
        paths: [path.join(root, pathString)],
        fromRoot: true,
        substitute: fileWithSubstitutions.substitutions
      });
    } else {
      // The file has no substitutions, so we can just copy it from the root
      return copyPath(`${cleanRoot}/${pathString}`, exportRoot, pathString);
    }
  }

  if (type === 'delete') {
    // Delete the file in the export directory
    fs.rmSync(path.join(exportRoot, pathString), {
      recursive: true,
      force: true
    });
  }
};

export default syncWithExport;
