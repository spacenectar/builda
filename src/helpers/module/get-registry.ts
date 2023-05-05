import fs from 'node:fs';
import process from 'node:process';

import {
  detectPathType,
  throwError,
  convertRegistryPathToUrl,
  validateModulePath
} from 'helpers';
import ModuleRegistry from 'types/module-registry';
import axios from 'axios';

export const getRegistry = async (
  registryPath?: string
): Promise<ModuleRegistry> => {
  const REGISTRYFILE = 'registry.json';

  registryPath = registryPath || process.cwd();
  const pathType = detectPathType(registryPath);

  if (pathType === 'local') {
    return JSON.parse(
      fs.readFileSync(`${registryPath}/${REGISTRYFILE}`, 'utf8')
    );
  }

  const resolved = convertRegistryPathToUrl({ registryPath });

  if (resolved.error) {
    throwError(resolved.error);
  }

  let url = resolved.url;

  if (url.includes('%FILE_NAME%')) {
    url = url.replace('%FILE_NAME%', REGISTRYFILE);
  } else {
    url = `${url}/${REGISTRYFILE}`;
  }

  const validModule = await validateModulePath(url, true);
  if (!validModule.status) {
    throwError(validModule.message);
  }
  return axios
    .get(url, {
      responseType: 'json'
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throwError(error.message);
    });
};

export default getRegistry;
