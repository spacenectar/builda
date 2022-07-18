import axios from 'axios';

import convertRegistryPathToUrl from './convert-registry-path-to-url';

export const getFileListFromRegistry = async (registryPath: string) => {
  const registryUrl = `${convertRegistryPathToUrl(registryPath)}/registry.json`;
  try {
    const response = await axios.get(registryUrl);
    return response.data.files;
  } catch (error) {
    throw new Error(error);
  }
};

export default getFileListFromRegistry;
