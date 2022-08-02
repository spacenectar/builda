import fs from 'fs';
import axios from 'axios';
import yaml from 'js-yaml';

// Import ignorefile
import ignoreFile from '@data/ignore-file.json';

// import helpers
import {
  getConfigFile,
  detectPathType,
  convertRegistryPathToUrl,
  getFileListFromRegistry,
  writeFile,
  throwError,
  printMessage
} from '@helpers';
import { changeCase } from '@helpers/string-functions';
import ComponentRegistry from '@typedefs/component-registry';

// Ignore these files
const ignoreFiles = ignoreFile.ignore;

const getRegistryData = async (isRemote: boolean, scaffoldPath: string) => {
  let data: ComponentRegistry;
  if (isRemote) {
    data = yaml.load(
      (await axios.get(`${scaffoldPath}/registry.yaml`)).data
    ) as ComponentRegistry;
  } else {
    data = yaml.load(
      fs.readFileSync(`${scaffoldPath}/registry.yaml`, 'utf8')
    ) as ComponentRegistry;
  }
  return data;
};

const buildFromLocalScaffold = (
  scaffoldPath: string,
  command: string,
  name: string,
  outputDirectory: string
) => {
  // get the directory contents and
  // filter out the files we don't want
  const files = fs
    .readdirSync(scaffoldPath)
    .filter((file) => !ignoreFiles.includes(file))
    .forEach((file) => {
      writeFile({ file, scaffoldPath, command, name, outputDirectory });
    });
  return files;
};

const buildFromRemoteScaffold = async (
  scaffoldPath: string,
  command: string,
  name: string,
  outputDirectory: string
) => {
  // get the directory contents
  try {
    await getFileListFromRegistry(scaffoldPath).then((value: string[]) => {
      const files = value;
      files
        .filter((file: string) => !ignoreFiles.includes(file))
        .forEach((file: string) => {
          // Download the file
          axios
            .get(`${scaffoldPath}/${file}`)
            .then((response) => {
              const fileObject = {
                name: file,
                content: response.data
              };

              return writeFile({
                fileObject,
                command,
                name,
                outputDirectory
              });
            })
            .catch((error) => {
              throwError(error);
            });
        });
    });
  } catch (error) {
    throwError(error);
  }
};

export const buildFromScaffold = async (
  command: string,
  name: string,
  scaffold?: string
) => {
  const config = getConfigFile();
  printMessage(`Building ${command} '${name}'...`, 'notice');

  if (config) {
    const outputDirectory = `${
      config.commands[command].outputDirectory
    }/${changeCase(name, 'kebabCase')}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });

    const rawScaffoldPath = scaffold || config.commands[command].scaffoldUrl;
    const scaffoldPath = convertRegistryPathToUrl(rawScaffoldPath);
    const pathType = detectPathType(scaffoldPath);

    if (pathType === 'local') {
      buildFromLocalScaffold(scaffoldPath, command, name, outputDirectory);
    }

    if (pathType === 'remote') {
      buildFromRemoteScaffold(scaffoldPath, command, name, outputDirectory);
    }

    const registry = await getRegistryData(pathType === 'remote', scaffoldPath);

    console.log(scaffoldPath);

    const componentRegistry = {
      name,
      version: '1.0.0',
      author: '',
      scaffold: {
        path: rawScaffoldPath,
        version: registry.version,
        dependencies: registry.dependencies
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
