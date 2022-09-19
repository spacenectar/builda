import fs from 'fs';
import path from 'path';
import changeCase from './string-functions';
import prettier from 'prettier';

// Import types
import TSubstitution from '@typedefs/substitution';

interface IWriteFileOptions {
  file: string;
  output_dir: string;
  substitute?: TSubstitution[];
  name: string;
}

export const writeFile = ({
  file,
  output_dir,
  substitute,
  name
}: IWriteFileOptions) => {
  const fileName = file.split('/').pop();

  // get the file contents
  const fileContents = fs.readFileSync(path.resolve(file), 'utf8');

  // replace the each placeholder with the correctly formatted name
  let newContents =
    fileContents &&
    fileContents
      .replace(/%KEBAB_CASE%/g, changeCase(name, 'kebabCase'))
      .replace(/%CAMEL_CASE%/g, changeCase(name, 'camelCase'))
      .replace(/%SNAKE_CASE%/g, changeCase(name, 'snakeCase'))
      .replace(/%PASCAL_CASE%/g, changeCase(name, 'pascalCase'))
      .replace(/%SENTENCE_CASE%/g, changeCase(name, 'sentenceCase'));

  // Replace custom substitutions
  if (substitute && substitute.length > 0) {
    substitute.forEach((sub: TSubstitution) => {
      const needle = `${sub.replace.toUpperCase()}`;
      const regex = new RegExp(needle, 'g');
      newContents = newContents.replace(regex, sub.with);
    });
  }

  newContents = prettier.format(newContents, {
    filepath: path.resolve(file)
  });

  // write the new file contents to the output directory
  if (newContents) {
    return fs.writeFileSync(`${output_dir}/${fileName}`, newContents);
  }
  throw new Error(`Could not write file ${fileName}`);
};

export default writeFile;
