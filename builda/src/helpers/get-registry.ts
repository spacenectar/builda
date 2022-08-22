import axios from 'axios';
import fs from 'fs';

import convertRegistryPathToUrl from './convert-registry-path-to-url';
import detectPathType from './detect-path-type';
import throwError from './throw-error';

export const getRegistry = async (registryPath: string) => {
  const pathType = detectPathType(registryPath);

  if (pathType === 'local') {
    return JSON.parse(fs.readFileSync(`${registryPath}/registry.json`, 'utf8'));
  }

  return axios.get(
      `${convertRegistryPathToUrl(registryPath)}/registry.json`
    ).then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.response.status === 404) {
        throwError(`No module found at ${registryPath} \n If you want to use a custom registry, please use the full url (including http(s)://)`);
      }
      throwError(error);
    });
};

export default getRegistry;
