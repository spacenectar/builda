import { type } from 'os';
import { ConfigFile } from 'types/config-file';
import throwError from './throw-error';

const urlWithProtocol = (url: string) => {
  // If a url starts with http or https, return the url unchanged
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  return `https://${url}`;
};

type TConvertRegistryPathToUrl = {
  registryPath: string;
  config?: ConfigFile;
  withType?: boolean;
};

type TReturnWithType = {
  url: string;
  type: string;
};

export const convertRegistryPathToUrl = ({
  registryPath,
  config,
  withType = false
}: TConvertRegistryPathToUrl): TReturnWithType | string => {
  let newPath = registryPath;

  let version = '';

  if (newPath.startsWith('http') || newPath.startsWith('https')) {
    let type = 'http';
    let url = newPath;
    if (newPath.includes('github.com')) {
      type = 'git';
      url = newPath
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob', '')
        .replace('/tree', '');
    }
    if (newPath.includes('bitbucket.org')) {
      type = 'git';
      url = newPath.replace('src', 'raw');
    }

    return withType ? { type, url } : url;
  }

  if (newPath.includes('@')) {
    const pathParts = registryPath.split('@');
    newPath = pathParts[0];
    version = pathParts[1];
  }

  if (config && config.resolve) {
    let url = newPath;
    const customMatcherKeys = config.resolve
      ? Object.keys(config.resolve)
      : undefined;

    const pathMatcher = url.split(':');
    const pathMatcherKey = pathMatcher[0];
    const pathMatcherValue = pathMatcher[1];

    // If there is a trailing slash, remove it
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }

    if (pathMatcher.length > 0 && customMatcherKeys?.includes(pathMatcherKey)) {
      let type = 'unknown';
      for (const element of customMatcherKeys) {
        const matched = config.resolve[pathMatcherKey];
        type = typeof matched !== 'string' ? matched.type : type;
        const resolveUrl = typeof matched === 'string' ? matched : matched.url;
        const newMatcherValue = resolveUrl
          .replace('{%REPO_NAME%}', pathMatcherValue)
          .replace('{%VERSION%}', version);
        if (pathMatcherKey === element && config.resolve) {
          url = urlWithProtocol(`${newMatcherValue}`);
        }
      }
      return withType ? { type, url } : url;
    }
    throwError('Invalid registry path');
  }

  const versionString = version ? `/${version}` : '';

  const useResolver = ({
    currentPath,
    name,
    versionString,
    updatedPath,
    withType
  }: {
    currentPath: string;
    name: string;
    versionString: string;
    updatedPath: string;
    withType: boolean;
  }) => {
    const url = currentPath.replace(`${name}:`, updatedPath) + versionString;

    return withType ? { type: name, url } : url;
  };

  if (newPath.startsWith('github:')) {
    return useResolver({
      currentPath: newPath,
      name: 'github',
      versionString,
      updatedPath: 'https://raw.githubusercontent.com/',
      withType
    });
  }

  if (newPath.startsWith('builda:')) {
    return useResolver({
      currentPath: newPath,
      name: 'builda',
      versionString,
      updatedPath: 'https://builda.app/modules/',
      withType
    });
  }

  if (newPath.startsWith('bitbucket:')) {
    return useResolver({
      currentPath: newPath,
      name: 'bitbucket',
      versionString,
      updatedPath: 'https://bitbucket.org/raw',
      withType
    });
  }

  // If no custom matcher is provided and the path doesn't look like a regular url return an empty string
  return '';
};

export default convertRegistryPathToUrl;
