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
  const newPath = registryPath;
  let error = '';

  let resolvers = resolversFile as {
    [key: string]: string;
  };

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
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return { url, error };
  }

  const resolverMatcher = newPath.match(
    /^([a-z]+:{1}[/]{0})([a-z0-9-/]+)((?:@{1}v?[0-9.]+)?(?:[\w\d-]*))?$/
  );

  if (!resolverMatcher) {
    error =
      'Paths must start with a colon terminated lowercase string with no spaces or special characters (e.g. "builda:" or "([a-z]+:{1}[/]{0})" ) if using a resolver or "http(s)" if using a url';
    return { url: '', error };
  } else {
    const resolver = resolverMatcher[1]?.replace(':', '') || '';
    const modulePath = resolverMatcher[2] || '';
    const version = resolverMatcher[3]
      ? resolverMatcher[3].replace('@', '')
      : 'latest';

    if (config && config.resolvers) {
      resolvers = {
        ...resolvers,
        ...config.resolvers
      };
    }

    const url = useResolver({
      resolver,
      modulePath,
      version,
      resolvers
    });

    if (!url) {
      error = `Could not find a resolver for ${newPath}`;
    }

    return { url, error };
  }
};

export default convertRegistryPathToUrl;
