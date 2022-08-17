import fs from 'fs';

// import helpers
import { getConfigFile, printMessage, getModule, writeFile } from '@helpers';
import { changeCase } from '@helpers/string-functions';

// Import types
import TSubstitution from '@typedefs/substitution';

type Props = {
  name: string;
  command: string;
  substitute?: TSubstitution[];
};

const config = getConfigFile();

export const buildFromScaffold = ({
  name,
  command,
  substitute
}: Props) => {
  if (config) {
    printMessage(`Building ${command} '${name}'...`, 'notice');
    const outputDirectory = `${
      config.commands[command].outputPath
    }/${changeCase(name, 'kebabCase')}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });

    const {
      path: pathstring,
      registry,
      files
    } = getModule(config.commands[command].use);

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


    // Add a component registry file to the output directory
    return fs.writeFileSync(
      `${outputDirectory}/registry.json`,
      JSON.stringify(componentRegistry, null, 2)
    );
  }
  throw new Error('No config file found');
};

export default buildFromScaffold;
