import fs from 'node:fs';

// import helpers
import {
  printMessage,
  getModule,
  writeFile,
  getSubstitutions,
  changeCase
} from 'helpers';

// Import types
import { ConfigFile } from 'types/config-file';
import path from 'path';
import generateCommands from './helpers/generate-commands';

type TNew = {
  config: ConfigFile;
  name: string;
  scriptName: string;
  subString?: string;
};

export default ({ config, name, scriptName, subString }: TNew) => {
  const commands = generateCommands(config);
  const script = commands?.[scriptName];

  if (!!script.use) {
    printMessage(`Building new ${scriptName}: '${name}'...`, 'notice');
    const outputDirectory = `${script.outputDir}/${changeCase(
      name,
      'kebabCase'
    )}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });

    const { path: pathstring, registry } = getModule(
      'blueprint',
      config,
      script
    );

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
  }
};
