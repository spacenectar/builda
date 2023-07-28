import path from 'node:path';
import fs from 'node:fs';
import { throwError } from 'helpers';
import globals from 'data/globals';

export const syncPackageJson = async () => {
  if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
    const packageJsonFile = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
    );
    const prefabPackageJsonFile = JSON.parse(
      fs.readFileSync(
        path.resolve(
          process.cwd(),
          globals.buildaDir,
          'modules',
          'prefab',
          'package.json'
        ),
        'utf8'
      )
    );

    const prefabScripts = prefabPackageJsonFile.scripts;
    const updatedScripts = packageJsonFile.scripts;

    const newScripts = Object.keys(updatedScripts).filter((script) => {
      return !Object.keys(prefabScripts).includes(script);
    });

    const scripts = {
      ...prefabScripts
    };
    newScripts.forEach((script) => {
      scripts[script] = updatedScripts[script];
    });

    const newPackageJson = {
      ...packageJsonFile,
      scripts,
      dependencies: {
        ...packageJsonFile.dependencies
      },
      devDependencies: {
        ...packageJsonFile.devDependencies
      },
      peerDependencies: {
        ...packageJsonFile.peerDependencies
      }
    };

    fs.writeFileSync(
      path.resolve(process.cwd(), globals.buildaDir, 'export', 'package.json'),
      JSON.stringify(newPackageJson, null, 2)
    );
  } else {
    throwError('No package.json found in project');
  }
};

export default syncPackageJson;
