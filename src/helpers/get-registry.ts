import axios from 'axios';
import fs from 'fs';

import detectPathType from './detect-path-type';
import convertRegistryPathToUrl from './convert-registry-path-to-url';
import throwError from './throw-error';

export const getRegistry = async (registryPath: string) => {
  const pathType = detectPathType(registryPath);

  if (pathType === 'local') {
    return JSON.parse(fs.readFileSync(`${registryPath}/registry.json`, 'utf8'));
  }

  let url = convertRegistryPathToUrl(registryPath);

  if (url.match(/{%FILE_NAME%}/)) {
    url = url.replace(/{%FILE_NAME%}/, 'registry.json');
  } else {
    url = `${url}/registry.json`;
  }

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.status === 404) {
        throwError(
          `\nNo module found at ${registryPath} \n If you want to use a custom registry, please use the full url (including http(s)://)\n or add a custom resolver (see https://builda.app/docs/custom-resolver)`
        );
      }
      throwError(error);
    });
};

export default getRegistry;
