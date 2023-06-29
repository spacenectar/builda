import fs from 'fs';
import path from 'path';
import { changeCase } from 'helpers/string';
import prettier from 'prettier';

// Import types
import TSubstitution from 'types/substitution';

interface IWriteFileOptions {
  file?: string;
  rename?: string;
  content?: string;
  outputDir: string;
  substitute?: TSubstitution[];
  name?: string;
}

export const writeFile = ({
  file,
  rename,
  content,
  outputDir,
  substitute,
  name
}: IWriteFileOptions) => {
  let fileName = file;

  if (rename) {
    fileName = rename;
  }

  fileName = fileName?.split('/').pop();

  // get the file contents
  const fileContent = file ? fs.readFileSync(path.resolve(file), 'utf8') : '';

  // replace the each placeholder with the correctly formatted name
  let newContent = content || fileContent;

  if (name) {
    newContent = fileContent
      .replace(/prefab-name-replace-string/g, changeCase(name, 'kebabCase'))
      .replace(/%KEBAB_CASE%/g, changeCase(name, 'kebabCase'))
      .replace(/%CAMEL_CASE%/g, changeCase(name, 'camelCase'))
      .replace(/%SNAKE_CASE%/g, changeCase(name, 'snakeCase'))
      .replace(/%PASCAL_CASE%/g, changeCase(name, 'pascalCase'))
      .replace(/%SENTENCE_CASE%/g, changeCase(name, 'sentenceCase'));
  }

  // Replace custom substitutions
  if (substitute && substitute.length > 0) {
    substitute.forEach((sub: TSubstitution) => {
      const needle = `${sub.replace.toUpperCase()}`;
      const regex = new RegExp(needle, 'g');
      newContent = newContent.replace(regex, sub.with);
    });
  }

  // Run prettier on the file if it's not an aof file
  if (!fileName?.endsWith('.aof')) {
    newContent = file
      ? prettier.format(newContent, {
          filepath: path.resolve(file)
        })
      : newContent;
  }
  // write the new file contents to the output directory
  if (newContent) {
    return fs.writeFileSync(`${outputDir}/${fileName}`, newContent);
  }
  throw new Error(`Could not write file ${fileName}`);
};

export default writeFile;
