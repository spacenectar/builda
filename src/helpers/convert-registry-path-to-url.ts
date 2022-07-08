export const convertRegistryPathToUrl = (registryPath: string) => {
  let newPath = registryPath;

  if (!newPath.startsWith('http') || !newPath.startsWith('https')) {
    throw new Error('Registry path must start with http or https');
  }

  if (newPath.includes('github.com')) {
    newPath = registryPath
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob', '');
  }

  if (newPath.includes('bitbucket.org')) {
    newPath = registryPath.replace('bitbucket.org', 'bitbucket.org/raw');
  }

  if (newPath.includes('gitlab.com')) {
    newPath = registryPath.replace('gitlab.com', 'gitlab.com/raw');
  }

  if (newPath.endsWith('/')) {
    newPath = registryPath.slice(0, -1);
  }

  if (!newPath.endsWith('registry.json')) {
    newPath = `${newPath}/registry.json`;
  }

  return newPath;
};

export default convertRegistryPathToUrl;
