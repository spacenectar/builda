import fs from 'node:fs';
import process from 'node:process';

import {
  detectPathType,
  throwError,
  convertRegistryPathToUrl,
  validateModulePath
} from 'helpers';

export const getRegistry = async (registryPath?: string) => {
  const REGISTRYFILE = 'registry.json';

  registryPath = registryPath || process.cwd();
  const pathType = detectPathType(registryPath);

  if (pathType === 'local') {
    return JSON.parse(
      fs.readFileSync(`${registryPath}/${REGISTRYFILE}`, 'utf8')
    );
  }

  let resolved = convertRegistryPathToUrl({ registryPath });

  if (resolved.error) {
    throwError(resolved.error);
  }

  let url = resolved.url;

  if (url.includes('%FILE_NAME%')) {
    url = url.replace('%FILE_NAME%', REGISTRYFILE);
  } else {
    url = `${url}/${REGISTRYFILE}`;
  }

  const module = { registry: {} };
  await validateModulePath(url, module);
  return module.registry;
};

export default getRegistry;
