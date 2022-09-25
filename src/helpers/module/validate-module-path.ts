import axios from 'axios';
import { writeLogFile } from 'helpers';

import convertRegistryPathToUrl from './convert-registry-path-to-url';

export default async (url: any, returnVal?: any) => {
  const registryUrl = convertRegistryPathToUrl({
    registryPath: url
  });
  if (registryUrl.error) {
    return registryUrl.error;
  }

  const registry = registryUrl.url.includes('registry.json')
    ? registryUrl.url
    : `${registryUrl.url}/registry.json`;

  writeLogFile(`Fetching registry from ${registry}`);

  return axios
    .get(registry)
    .then((response) => {
      if (response.data) {
        if (returnVal) {
          returnVal.registry = response.data;
        }
        return true;
      }
      return 'The url must point to a folder that contains a registry.json file';
    })
    .catch((error) => {
      if (error.code === 'ENOTFOUND' || error.code === 'ERR_BAD_REQUEST') {
        return 'The url must point to a folder that contains a registry.json file';
      }
      if (error.code === 'ECONNREFUSED') {
        return `The server at ${registry} is not responding are you sure it is correct?`;
      }
      return error.message;
    });
};
