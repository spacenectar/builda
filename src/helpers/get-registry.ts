import axios from 'axios';
import fs from 'node:fs';
import process from 'node:process';

import detectPathType from './detect-path-type';
import convertRegistryPathToUrl from './convert-registry-path-to-url';
import throwError from './throw-error';

export const getRegistry = async (registryPath?: string) => {
  const REGISTRYFILE = 'registry.json';

  registryPath = registryPath || process.cwd();
  const pathType = detectPathType(registryPath);

  if (pathType === 'local') {
    return JSON.parse(
      fs.readFileSync(`${registryPath}/${REGISTRYFILE}`, 'utf8')
    );
  }

  let url = convertRegistryPathToUrl(registryPath);

  if (url.match(/{%FILE_NAME%}/)) {
    url = url.replace(/{%FILE_NAME%}/, REGISTRYFILE);
  } else {
    url = `${url}/${REGISTRYFILE}`;
  }

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.status === 404) {
        throwError(
          `\nNo module found at ${registryPath} \n If you want to use a custom registry, please use the full url (including http(s)://)\n or add a custom resolver (see https://builda.app/docs/resolvers)`
        );
      }
      throwError(error);
    });
};

export default getRegistry;
