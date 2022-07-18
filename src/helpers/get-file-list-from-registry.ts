import axios from 'axios';

import convertRegistryPathToUrl from './convert-registry-path-to-url';

export const getFileListFromRegistry = async (registryPath: string) => {
  const registryUrl = `${convertRegistryPathToUrl(registryPath)}/registry.json`;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(registryUrl);
      resolve(response.data.files);
      return response.data.files;
    } catch (error) {
      reject(error);
    }
  });
};

export default getFileListFromRegistry;
