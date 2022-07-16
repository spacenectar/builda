import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Import ignorefile
import ignoreFile from '@data/ignore-file.json';

// Import types
import { ComponentRegistry } from '@typedefs/component-registry';

// import helpers
import {
  getConfigFile,
  detectPathType,
  getFileListFromRegistry
} from '@helpers';
import { changeCase } from '@helpers/string-functions';

// Ignore these files
const ignoreFiles = ignoreFile.ignore;

export const buildFromScaffold = async (
  command: string,
  name: string,
  scaffold?: string
) => {
  const config = getConfigFile();

  if (config) {
    const outputDirectory = `${
      config.commands[command].outputDirectory
    }/${changeCase(name, 'kebabCase')}`;

    // Create the directory tree if it doesn't exist
    fs.mkdirSync(outputDirectory, { recursive: true });
    // Create a temporary directory to store the scaffold files
    const tempDirectory = `./temp`;
    fs.mkdirSync(tempDirectory, { recursive: true });

    const scaffoldPath = scaffold || config.commands[command].scaffoldUrl;
    const pathType = detectPathType(scaffoldPath);

    let files = [];
    let registry = {} as ComponentRegistry;

    if (pathType === 'local') {
      // Populate the registry
      registry = JSON.parse(
        fs.readFileSync(`${scaffoldPath}/registry.json`, 'utf8')
      );

      // get the directory contents
      files = fs.readdirSync(scaffoldPath);

      // filter out the files we don't want
      files = files.filter((file) => !ignoreFiles.includes(file));

      // copy the files to a temporary directory
      files.forEach((file) => {
        fs.copyFileSync(`${scaffoldPath}/${file}`, `${tempDirectory}/${file}`);
      });
    }

    if (pathType === 'remote') {
      // Populate the registry
      registry = (await axios.get(`${scaffoldPath}/registry.json`)).data;

      // get the directory contents
      const fileList = await getFileListFromRegistry(scaffoldPath);

      await fileList.map(async (file: string) => {
        // Download the file
        const response = await axios.get(`${scaffoldPath}/${file}`);
        // Write the file to a temporary directory
        fs.writeFileSync(`${tempDirectory}/${file}`, response.data);
      });

      files = fileList;
    }

    // loop through the files
    files.forEach((file: string) => {
      // ignore files
      if (ignoreFiles.includes(file)) return;

      // get the file contents
      const fileContents = fs.readFileSync(
        path.resolve(`${tempDirectory}/${file}`),
        'utf8'
      );

      // replace the each placeholder with the correctly formatted name
      const newContents = fileContents
        .replace(/%TYPE%/g, command)
        .replace(/%KEBAB_CASE%/g, changeCase(name, 'kebabCase'))
        .replace(/%CAMEL_CASE%/g, changeCase(name, 'camelCase'))
        .replace(/%SNAKE_CASE%/g, changeCase(name, 'snakeCase'))
        .replace(/%PASCAL_CASE%/g, changeCase(name, 'pascalCase'))
        .replace(/%SENTENCE_CASE%/g, changeCase(name, 'sentenceCase'));
      // write the new file contents to the output directory
      fs.writeFileSync(`${outputDirectory}/${file}`, newContents);
    });

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
    fs.writeFileSync(
      `${outputDirectory}/registry.json`,
      JSON.stringify(componentRegistry)
    );

    // delete the temporary directory
    fs.rmdirSync(tempDirectory, { recursive: true });
  }
};

export default buildFromScaffold;
