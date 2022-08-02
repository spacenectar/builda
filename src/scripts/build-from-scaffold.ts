import fs from 'fs';
import yaml from 'js-yaml';

// import helpers
import { getConfigFile, printMessage, getModule, writeFile } from '@helpers';
import { changeCase } from '@helpers/string-functions';

type Props = {
  command: string;
  name: string;
  options?: {
    prefix?: string;
  };
  scaffold?: string;
};

export const buildFromScaffold = async ({
  command,
  name,
  options,
  scaffold
}: Props) => {
  const config = getConfigFile();
  printMessage(`Building ${command} '${name}'...`, 'notice');

  if (config) {
    const outputDirectory = `${
      config.commands[command].outputPath
    }/${changeCase(name, 'kebabCase')}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });

    const { path, registry, files } = getModule(
      'scaffold',
      scaffold || config.commands[command].use
    );

    files.forEach((file: string) => {
      const srcPath = `${path}/${file}`;
      const outputPath = `${outputDirectory}`;

      writeFile({
        file: srcPath,
        outputDirectory: outputPath,
        command,
        name
      });
    });

    // TODO: Utilise options to allow for prefixing the module type
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
};

export default buildFromScaffold;
