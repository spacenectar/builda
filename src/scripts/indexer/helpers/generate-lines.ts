import fs from 'node:fs';
import path from 'path';
import changeCase from '../../helpers/string-functions';

export const generateLines = ({
  directory,
  parent
}: {
  directory: string;
  parent?: string;
}) => {
  const dir = fs.readdirSync(path.resolve(directory));
  // If dir is empty, do nothing
  if (dir.length !== 0) {
    return dir
      .map((file) => {
        const pathString = parent ? `${parent}/${file}` : file;
        if (!file.match(/\.[jt]sx$/)) {
          return `export { default as ${changeCase(
            file,
            'pascalCase'
          )} } from './${pathString}';`;
        }
        const fileNoExt = path.parse(file).name;
        const varName = changeCase(fileNoExt, 'camelCase');
        return `export { default as ${varName} } from './${fileNoExt}';`;
      })
      .filter((item) => item)
      .toString()
      .replace(/,/g, '\n');
  } else {
    return '';
  }
};
