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

  return 'remote';
};

export default detectPathType;
