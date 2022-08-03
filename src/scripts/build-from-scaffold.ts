import fs from 'fs';
import yaml from 'js-yaml';
import prettier from 'prettier';

// import helpers
import { getConfigFile, printMessage, getModule, writeFile } from '@helpers';
import { changeCase } from '@helpers/string-functions';

// Import types
import TSubstitution from '@typedefs/substitution';

// import { CommandConfig } from '@typedefs/command-config';

type Props = {
  name: string;
  command: string;
  substitute?: TSubstitution[];
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

      const {
        path: pathstring,
        registry,
        files
      } = getModule(scaffold || config.commands[command].use);

      files.forEach((file: string) => {
        const srcPath = `${pathstring}/${file}`;
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

      const yamlContent = yaml.dump(componentRegistry);

      // Add a component registry file to the output directory
      return fs.writeFileSync(
        `${outputDirectory}/registry.yaml`,
        prettier.format(yamlContent, { parser: 'yaml' })
      );
    }
  }
  throw new Error('No config file found');
};

export default buildFromScaffold;
