// Detects if a path is a local path or a remote path.

export const detectPathType = (path: string) => {
  if (path.startsWith('http') || path.startsWith('https')) {
    return 'remote';
  } else {
    return 'local';
  }
};

export default detectPathType;
