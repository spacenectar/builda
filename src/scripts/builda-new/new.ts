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
  changeCase
} from 'helpers';

// Import types
import type { ConfigFile } from 'types/config-file';
import type { BlueprintScriptContent } from 'types/blueprint-script-config';

type TNew = {
  config: ConfigFile;
  name: string;
  scriptName: string;
  subString?: string;
};

const buildFromBlueprint = (
  name: string,
  outputDir: string,
  config: ConfigFile,
  script: BlueprintScriptContent,
  subString?: string
) => {
  const outputDirectory = `${outputDir}/${changeCase(name, 'kebabCase')}`;

  // Create the directory tree if it doesn't exist
  fs.mkdirSync(outputDirectory, { recursive: true });

  const { path: pathstring, registry } = getModule('blueprint', config, script);

  const splitSubString = subString?.split(':') || [];
  const sub =
    splitSubString.length === 2
      ? { replace: splitSubString[0], with: splitSubString[1] }
      : undefined;

  const substitute = script
    ? getSubstitutions({
        registry,
        name,
        script,
        sub
      })
    : [];

  const fullPath = path.resolve(pathstring, 'files');
  fs.readdirSync(fullPath).forEach((file: string) => {
    const srcPath = `${fullPath}/${file}`;
    const outputPath = `${outputDirectory}`;

    writeFile({
      file: srcPath,
      outputDir: outputPath,
      substitute,
      name
    });
  });

  const componentRegistry = {
    name,
    version: '1.0.0',
    author: '',
    blueprint: {
      name: registry.name,
      version: registry.version
    }
  };

  // Add a component registry file to the output directory
  return fs.writeFileSync(
    `${outputDirectory}/registry.json`,
    JSON.stringify(componentRegistry, null, 2)
  );
};

export default async ({ config, name, scriptName, subString }: TNew) => {
  const commands = generateCommands(config);
  const script = commands?.[scriptName] as BlueprintScriptContent;

  if (script.use) {
    printMessage(`Building new ${scriptName}: '${name}'...`, 'notice');

    if (script.variants) {
      const answers = inquirer.prompt([
        {
          type: 'list',
          name: 'variantChoice',
          message: 'What type of component do you wish to build?',
          choices: script.variants.map((variant) => {
            return {
              name: variant.name,
              value: variant.outputPath
            };
          })
        }
      ]);

      const outputDir = await answers;

      console.log(outputDir);
    } else {
      buildFromBlueprint(name, script.outputDir, config, script, subString);
    }
  }
};
