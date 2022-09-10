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

  const httpMatcher = /^https?:\/\//;
  const customMatcherRegex = /[a-zA-Z0-9]:/;

  if (!httpMatcher.test(pathString) && customMatcherRegex.test(pathString)) {
    return 'custom';
  }

  return 'remote';
};

export default detectPathType;
