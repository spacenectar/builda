import { ConfigFile } from 'types/config-file';

export default (rootString: string, config?: ConfigFile) => {
  let rootDir = config?.rootDir || '.';
  if (rootDir.endsWith('/')) {
    rootDir = rootDir.slice(0, -1);
  }
  return rootString.replace(/<rootDir>/g, rootDir);
};
