import fs from 'node:fs';
import path from 'path';
import generateCommands from './helpers/generate-commands';
import inquirer from 'inquirer';

// import helpers
import {
  printMessage,
  getModule,
  writeFile,
  getSubstitutions,
  changeCase,
  throwError
} from 'helpers';

import globals from 'data/globals';

// Import types
import { buildaBuild } from 'scripts/builda-build';

type TNew = {
  config: ConfigFile;
  name: string;
  scriptName: string;
  subString?: string;
};

const buildFromBlueprint = async (
  name: string,
  outputDir: string,
  config: ConfigFile,
  script: BlueprintScriptContent,
  subString?: string
) => {
  const { buildaDir } = globals;
  const outputDirectory = `${outputDir}/${changeCase(name, 'kebabCase')}`;
  const outputInExport = path.join(buildaDir, 'export', outputDirectory);

  if (fs.existsSync(outputDirectory)) {
    throwError(`A ${script.use} already exists with the name ${name}`);
  }

  if (fs.existsSync(outputInExport)) {
    throwError(
      `An existing ${script.use} with the name ${name} was found in the prefab. Continuing will overwrite this version.\r\nIf you want to edit the prefab version, you need to eject it with 'builda eject ${name}'`
    );
  }

  // Create the directory tree if it doesn't exist
  fs.mkdirSync(outputDirectory, { recursive: true });

  const { path: pathstring, registry } = getModule('blueprint', config, script);

  const splitSubString = subString?.split(':') || [];
  const sub =
    splitSubString.length === 2
      ? {
          replace: splitSubString[0] as string,
          with: splitSubString[1] as string
        }
      : undefined;

  const substitute = script
    ? getSubstitutions({
        registry,
        name,
        script,
        sub
      })
    : [];

  const fullPath = path.resolve(pathstring, 'module');
  fs.readdirSync(fullPath).forEach((file: string) => {
    const srcPath = `${fullPath}/${file}`;
    const outputDir = `${outputDirectory}`;
    writeFile({
      file: srcPath,
      rename: srcPath.replace('temp_name', name),
      outputDir: outputDir,
      substitute,
      name
    });
  });

  // copy the folder into the export directory
  if (config.prefab) {
    buildaBuild({
      config
    });
  }

  return printMessage('Done!', 'success');
};

export default async ({ config, name, scriptName, subString }: TNew) => {
  const commands = generateCommands(config);
  const script = commands?.[scriptName] as BlueprintScriptContent;
  if (script.use) {
    if (!name || name === '') {
      throwError(`You need to provide a name for your new ${scriptName}`);
    }

    printMessage(`Building new ${scriptName}: '${name}'...`, 'notice');

    if (script.variants) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'variantChoice',
          message: `What type of ${scriptName} do you wish to build?`,
          choices: script.variants.map((variant) => {
            return {
              name: variant.name,
              value: variant.outputDir
            };
          })
        }
      ]);

      await buildFromBlueprint(
        name,
        answers.variantChoice,
        config,
        script,
        subString
      );
    } else {
      await buildFromBlueprint(
        name,
        script.outputDir,
        config,
        script,
        subString
      );
    }
  } else {
    throwError('No valid scripts found');
  }
};
