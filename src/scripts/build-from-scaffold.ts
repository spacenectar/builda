import fs from 'fs';
import yaml from 'js-yaml';

// import helpers
import { getConfigFile, printMessage, getModule, writeFile } from '@helpers';
import { changeCase } from '@helpers/string-functions';
// import { CommandConfig } from '@typedefs/command-config';

type Props = {
  name: string;
  command: string;
  substitute?: string;
  scaffold?: string;
};

export const buildFromScaffold = async ({
  name,
  command,
  substitute,
  scaffold
}: Props) => {
  const config = getConfigFile();

  if (config) {
    printMessage(`Building ${command} '${name}'...`, 'notice');
    if (config) {
      const outputDirectory = `${
        config.commands[command].outputPath
      }/${changeCase(name, 'kebabCase')}`;

      // Create the directory tree if it doesn't exist
      fs.mkdirSync(outputDirectory, { recursive: true });

      const { path, registry, files } = getModule(
        scaffold || config.commands[command].use
      );

      files.forEach((file: string) => {
        const srcPath = `${path}/${file}`;
        const outputPath = `${outputDirectory}`;

        writeFile({
          file: srcPath,
          outputDirectory: outputPath,
          substitute,
          name
        });
      });

      const componentRegistry = {
        name,
        version: '1.0.0',
        author: '',
        scaffold: {
          name: registry.name,
          version: registry.version
        }
      };

      // Add a component registry file to the output directory
      return fs.writeFileSync(
        `${outputDirectory}/registry.yaml`,
        yaml.dump(componentRegistry)
      );
    }
  }
  throw new Error('No config file found');
};

export default buildFromScaffold;
