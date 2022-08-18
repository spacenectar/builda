export const convertRegistryPathToUrl = (
  registryPath: string,
  customMatcher?: {
    original: string;
    transformed: string;
  }
) => {
  let newPath = registryPath;

  if (!newPath.startsWith('http') || !newPath.startsWith('https')) {
    newPath = `https://builda.app/modules/${newPath}`;
  }

  if (newPath.endsWith('/')) {
    newPath = newPath.slice(0, -1);
  }

  if (customMatcher) {
    const regex = new RegExp(customMatcher.original, 'gm');
    return newPath.replace(regex, customMatcher.transformed);
  }

  if (newPath.includes('github.com')) {
    return newPath
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob', '')
      .replace('/tree', '');
  }

  if (newPath.includes('bitbucket.org')) {
    return newPath.replace('src', 'raw');
  }

  return newPath;
};

export default convertRegistryPathToUrl;
