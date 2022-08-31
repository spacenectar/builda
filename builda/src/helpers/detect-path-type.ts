// Detects if a path is a local path or a remote path.

export const detectPathType = (path: string) => {
  if (
    path.startsWith('/') ||
    path.startsWith('./') ||
    path.startsWith('..') ||
    path.startsWith('~')
  ) {
    return 'local';
  } else {
    return 'remote';
  }
};

export default detectPathType;
