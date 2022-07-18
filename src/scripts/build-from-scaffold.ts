import fs from 'fs';
import axios from 'axios';

// Import ignorefile
import ignoreFile from '@data/ignore-file.json';

// import helpers
import {
  getConfigFile,
  detectPathType,
  getFileListFromRegistry,
  writeFile
} from '@helpers';
import { changeCase } from '@helpers/string-functions';

// Ignore these files
const ignoreFiles = ignoreFile.ignore;

const getRegistryData = async (isRemote: boolean, scaffoldPath: string) => {
  if (isRemote) {
    return (await axios.get(`${scaffoldPath}/registry.json`)).data;
  } else {
    return JSON.parse(fs.readFileSync(`${scaffoldPath}/registry.json`, 'utf8'));
  }
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
    await getFileListFromRegistry(scaffoldPath).then((value) => {
      const files = value as string[];
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
              console.log(error);
            });
        });
    });
  } catch (error) {
    console.error(error);
  }
};

export const buildFromScaffold = async (
  command: string,
  name: string,
  scaffold?: string
) => {
  const config = getConfigFile();
  console.log(`Building ${command} ${name}`);

  if (config) {
    const outputDirectory = `${
      config.commands[command].outputDirectory
    }/${changeCase(name, 'kebabCase')}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });

    const scaffoldPath = scaffold || config.commands[command].scaffoldUrl;
    const pathType = detectPathType(scaffoldPath);

    if (pathType === 'local') {
      buildFromLocalScaffold(scaffoldPath, command, name, outputDirectory);
    }

    if (pathType === 'remote') {
      buildFromRemoteScaffold(scaffoldPath, command, name, outputDirectory);
    }

    const registry = await getRegistryData(pathType === 'remote', scaffoldPath);

    const componentRegistry = {
      name,
      version: '1.0.0',
      author: '',
      scaffold: {
        name: registry.name,
        version: registry.version,
        path: scaffoldPath
      }
    };

    // Add a component registry file to the output directory
    return fs.writeFileSync(
      `${outputDirectory}/registry.json`,
      JSON.stringify(componentRegistry)
    );
  }
};

export default buildFromScaffold;
