import fs from 'fs';
import path from 'path';
import changeCase from './string-functions';

interface IWriteFileOptions {
  file: string;
  outputDirectory: string;
  command: string;
  name: string;
}

export const writeFile = ({
  file,
  outputDirectory,
  command,
  name
}: IWriteFileOptions) => {
  const fileName = file.split('/').pop();

  // get the file contents
  const fileContents = fs.readFileSync(path.resolve(file), 'utf8');

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
