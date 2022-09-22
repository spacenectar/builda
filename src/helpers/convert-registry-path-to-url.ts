import { ConfigFile } from 'types/config-file';

const urlWithProtocol = (url: string) => {
  // If a url starts with http or https, return the url unchanged
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  return `https://${url}`;
};

export const convertRegistryPathToUrl = (
  registryPath: string,
  config?: ConfigFile
) => {
  let newPath = registryPath;

  let version = '';

  if (newPath.startsWith('http') || newPath.startsWith('https')) {
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
  }

  if (newPath.includes('@')) {
    const pathParts = registryPath.split('@');
    newPath = pathParts[0];
    version = pathParts[1];
  }

  if (config && config.resolve) {
    const customMatcherKeys = config.resolve
      ? Object.keys(config.resolve)
      : undefined;

    const pathMatcher = newPath.split(':');
    const pathMatcherKey = pathMatcher[0];
    const pathMatcherValue = pathMatcher[1];

    // If there is a trailing slash, remove it
    if (newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1);
    }

    if (pathMatcher.length > 0 && customMatcherKeys?.includes(pathMatcherKey)) {
      for (const element of customMatcherKeys) {
        const newMatcherValue = config.resolve[pathMatcherKey]
          .replace('{%REPO_NAME%}', pathMatcherValue)
          .replace('{%VERSION%}', version);
        if (pathMatcherKey === element && config.resolve) {
          newPath = urlWithProtocol(`${newMatcherValue}`);
        }
      }
      return newPath;
    }
  }

  const versionString = version ? `/${version}` : '';

  if (newPath.startsWith('github:')) {
    const updatedPath = newPath.replace(
      'github:',
      'https://raw.githubusercontent.com/'
    );
    return `${updatedPath}${versionString}`;
  }

  if (newPath.startsWith('builda:')) {
    const updatedPath = newPath.replace(
      'builda:',
      'https://builda.app/modules/'
    );
    return `${updatedPath}`;
  }

  if (newPath.startsWith('bitbucket:')) {
    const updatedPath = newPath.replace('bitbucket:', 'https://bitbucket.org/');
    return `${updatedPath}/raw${versionString}`;
  }

  // If no custom matcher is provided and the path doesn't look like a regular url return an empty string
  return '';
};

export default convertRegistryPathToUrl;
