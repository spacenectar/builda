import fs from 'fs';

// import helpers
import {
  getConfigFile,
  printMessage,
  getModule,
  writeFile,
  getSubstitutions
} from '@helpers';
import { changeCase } from '@helpers/string-functions';

// Import types
import { ScaffoldScriptContent } from '@typedefs/scaffold-script-config';
import { Argv } from '@typedefs/argv';

type Props = {
  name: string;
  command: ScaffoldScriptContent;
  args?: Argv;
};

export const buildFromScaffold = ({ name, command, args }: Props) => {
  const config = getConfigFile();

  if (config !== undefined && !!command.use) {
    printMessage(`Building ${Object.keys(command)[0]} '${name}'...`, 'notice');
    const outputDirectory = `${command.output_dir}/${changeCase(
      name,
      'kebabCase'
    )}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });

    const {
      path: pathstring,
      registry,
      files
    } = getModule('scaffold', config, command);

    const substitute = command
      ? getSubstitutions({
          registry,
          name,
          command,
          args
        })
      : [];

    files.forEach((file: string) => {
      const srcPath = `${pathstring}/${file}`;
      const outputPath = `${outputDirectory}`;

      writeFile({
        file: srcPath,
        output_dir: outputPath,
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
