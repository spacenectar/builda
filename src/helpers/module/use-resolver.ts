import { urlWithProtocol } from 'helpers';

export const useResolver = ({
  resolver,
  modulePath,
  version,
  resolvers
}: {
  resolver: string;
  modulePath: string;
  version: string;
  resolvers: { [key: string]: string };
}) => {
  const resolved = resolvers[resolver];
  if (!resolved) {
    return '';
  }
  let resolvedUrl = resolved;

  if (resolvedUrl.includes('%REPO_NAME%')) {
    resolvedUrl = resolvedUrl.replace('%REPO_NAME%', modulePath);
  } else {
    resolvedUrl = resolvedUrl.replace(`${resolver}`, '');
  }
  if (resolvedUrl.includes('%VERSION%')) {
    resolvedUrl = resolvedUrl.replace('%VERSION%', version);
  } else {
    resolvedUrl = `${resolvedUrl}/${version || 'latest'}`;
  }
  if (resolvedUrl.endsWith('/')) {
    resolvedUrl = resolvedUrl.slice(0, -1);
  }

  return urlWithProtocol(resolvedUrl);
};

export default useResolver;
