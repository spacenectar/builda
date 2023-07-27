import { getIgnoreList } from 'helpers';

export const checkIfIgnored = (workingDir: string, filePath: string) => {
  const ignoreList = getIgnoreList(workingDir);
  // Check if the file is in the ignore list
  for (const ignore of ignoreList) {
    if (ignore.startsWith('**/')) {
      const ignorePath = ignore.replace('**/', '');
      const baseFileName = filePath.split('/').pop() as string;
      if (ignorePath.includes(baseFileName)) {
        return true;
      }
    } else if (ignore === filePath) {
      return true;
    }
  }

  return false;
};

export default checkIfIgnored;
