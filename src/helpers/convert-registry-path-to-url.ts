export const convertRegistryPathToUrl = (
  registryPath: string,
  customMatcher?: {
    original: string;
    transformed: string;
  }
) => {
  let newPath = registryPath;

  if (!newPath.startsWith('http') || !newPath.startsWith('https')) {
    throw new Error('Registry path must start with http or https');
  }

  if (newPath.includes('github.com')) {
    newPath = registryPath
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob', '')
      .replace('/tree', '');
  }

  if (newPath.includes('bitbucket.org')) {
    newPath = registryPath.replace('src', 'raw');
  }

  if (customMatcher) {
    const regex = new RegExp(customMatcher.original, 'gm');
    newPath = registryPath.replace(regex, customMatcher.transformed);
  }

  if (newPath.endsWith('/')) {
    newPath = newPath.slice(0, -1);
  }

  if (!newPath.endsWith('registry.json')) {
    newPath = `${newPath}/registry.json`;
  }

  return newPath;
};

export default convertRegistryPathToUrl;
