import ComponentRegistry from '@typedefs/component-registry';
import axios from 'axios';
import yaml from 'js-yaml';

import convertRegistryPathToUrl from './convert-registry-path-to-url';

export const getFileListFromRegistry = async (registryPath: string) => {
  const registryUrl = `${convertRegistryPathToUrl(registryPath)}/registry.yaml`;
  try {
    const response = await axios.get(registryUrl);
    const registryContents = yaml.load(response.data, {
      json: true
    }) as ComponentRegistry;
    return registryContents.files;
  } catch (error) {
    throw new Error(error);
  }
};

export default getFileListFromRegistry;
