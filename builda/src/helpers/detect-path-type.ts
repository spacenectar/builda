// Detects if a path is a local path or a remote path.

export const detectPathType = (pathString: string) => {
  if (
    pathString.startsWith('/') ||
    pathString.startsWith('./') ||
    pathString.startsWith('..') ||
    pathString.startsWith('~')
  ) {
    return 'local';
  }

  const customMatcherRegex = /[a-zA-Z0-9]:/;

  if (customMatcherRegex.test(pathString)) {
    return 'custom';
  }

  return 'remote';
};

export default detectPathType;
