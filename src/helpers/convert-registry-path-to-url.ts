import { ConfigFile } from 'types/config-file';

import resolversFile from 'data/resolvers.json';
import useResolver from './use-resolver';

type TConvertRegistryPathToUrl = {
  registryPath: string;
  config?: ConfigFile;
};

type TReturnValue = {
  url: string;
  error?: string;
};

export const convertRegistryPathToUrl = ({
  registryPath,
  config
}: TConvertRegistryPathToUrl): TReturnValue => {
  let newPath = registryPath;

  let resolvers = resolversFile as {
    [key: string]: string;
  };

  let version = '';
  let error = '';

  if (newPath.startsWith('http') || newPath.startsWith('https')) {
    // User has provided a standard url
    let url = newPath;
    if (newPath.includes('github.com')) {
      url = newPath
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob', '')
        .replace('/tree', '');
    }
    if (newPath.includes('bitbucket.org')) {
      url = newPath.replace('src', 'raw');
    }
    return { url, error };
  }

  if (newPath.includes('@')) {
    const pathParts = registryPath.split('@');
    newPath = pathParts[0];
    version = pathParts[1];
  }

  if (newPath.startsWith(`$`)) {
    if (config && config.resolvers) {
      resolvers = {
        ...resolvers,
        ...config.resolvers
      };
    }

    const url = useResolver({
      currentPath: newPath,
      version,
      resolvers
    });

    if (!url) {
      error = `Could not find a resolver for ${newPath}`;
    }

    return { url, error };
  }

  error =
    'Paths must start with a $ if using a resolver or http(s) if using a url';
  return { url: '', error };
};

export default convertRegistryPathToUrl;
