import axios from 'axios';

import convertRegistryPathToUrl from './convert-registry-path-to-url';

export const getFileListFromRegistry = async (registryPath: string) => {
  const registryUrl = `${convertRegistryPathToUrl(registryPath)}/registry.json`;

  const registryContent = (await axios.get(registryUrl)).data.files;

  return registryContent;
};

export default getFileListFromRegistry;
