import fs from 'fs';
import path from 'path';
import changeCase from './string-functions';

interface IWriteFileOptions {
  file?: string;
  fileObject?: {
    name: string;
    content: string;
  };
  outputDirectory: string;
  command: string;
  name: string;
  scaffoldPath?: string;
}

export const writeFile = ({
  file,
  fileObject,
  outputDirectory,
  command,
  name,
  scaffoldPath
}: IWriteFileOptions) => {
  const fileName = file || fileObject?.name;

  if (file && fileObject)
    throw new Error('Cannot provide file and fileObject at the same time.');

  // get the file contents
  const fileContents =
    file && scaffoldPath
      ? fs.readFileSync(path.resolve(`${scaffoldPath}/${file}`), 'utf8')
      : fileObject?.content;

  // replace the each placeholder with the correctly formatted name
  const newContents =
    fileContents &&
    fileContents
      .replace(/%TYPE%/g, command)
      .replace(/%KEBAB_CASE%/g, changeCase(name, 'kebabCase'))
      .replace(/%CAMEL_CASE%/g, changeCase(name, 'camelCase'))
      .replace(/%SNAKE_CASE%/g, changeCase(name, 'snakeCase'))
      .replace(/%PASCAL_CASE%/g, changeCase(name, 'pascalCase'))
      .replace(/%SENTENCE_CASE%/g, changeCase(name, 'sentenceCase'));

  // write the new file contents to the output directory
  if (newContents) {
    return fs.writeFileSync(`${outputDirectory}/${fileName}`, newContents);
  }
  throw new Error(`Could not write file ${fileName}`);
};

export default writeFile;
