import globals from 'data/globals';
import pathFile from 'data/website-paths.json';

type TPaths = {
  [key: string]: {
    [key: string]: string;
  };
};

export default (slug: string, anchor?: string) => {
  const { websiteUrl } = globals;
  const pathParts = slug.split('/');
  const paths = pathFile as TPaths;
  const rootPath = pathParts[0] || './';

  const outputPaths = pathParts.map((pathPart) => {
    if (pathPart === rootPath) {
      return pathPart;
    }
    return paths[rootPath]?.[pathPart];
  });

  return `${websiteUrl}/${outputPaths.join('/')}${anchor ? `#${anchor}` : ''}`;
};
