export const convertRegistryPathToUrl = (registryPath: string) => {
  let newPath = registryPath;

  if (!newPath.startsWith('http') || !newPath.startsWith('https')) {
    throw new Error('Registry path must start with http or https');
  }

  if (newPath.includes('github')) {
    newPath = registryPath
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob', '');
  }

  // Regular bitbucket repo url
  if (newPath.includes('bitbucket') && !newPath.includes('/projects')) {
    newPath = registryPath.replace(
      /(?:http|https)?[://]?(bitbucket.+)\/([\w-]+)\/([\w-]+)\/browse\/([\w/.-]+)/,
      `$1/$2/$3/raw/$4`
    );
  }

  // Bitbucket projects repo url
  if (newPath.includes('bitbucket') && newPath.includes('/projects')) {
    newPath = registryPath.replace(
      /(?:http|https)?[://]?(bitbucket.+)\/projects\/([\w-]+)\/repos\/([\w-]+)\/browse\/([\w/.-]+)/,
      `$1/projects/$2/repos/$3/raw/$3`
    );
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
