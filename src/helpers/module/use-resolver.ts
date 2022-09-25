import { urlWithProtocol } from 'helpers';

export const useResolver = ({
  currentPath,
  version,
  resolvers
}: {
  currentPath: string;
  version: string;
  resolvers: { [key: string]: string };
}) => {
  const name = currentPath.split(':')[0].replace('$', '').toLowerCase();
  const resolved = resolvers[name];
  if (!resolved) {
    return '';
  }
  let resolvedUrl = resolved;
  const repoName = currentPath.split(':')[1];
  if (resolvedUrl.includes('%REPO_NAME%')) {
    resolvedUrl = resolvedUrl.replace('%REPO_NAME%', repoName);
  } else {
    resolvedUrl = resolvedUrl.replace(`${name}`, '');
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
