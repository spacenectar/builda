import ModuleRegistry from '@typedefs/module-registry';
import axios from 'axios';
import yaml from 'js-yaml';
import fs from 'fs';

import convertRegistryPathToUrl from './convert-registry-path-to-url';
import detectPathType from './detect-path-type';

export const getRegistry = async (registryPath: string) => {
  const pathType = detectPathType(registryPath);
  let registryData;
  if (pathType === 'local') {
    registryData = fs.readFileSync(`${registryPath}/registry.yaml`, 'utf8');
  }

  if (pathType === 'remote') {
    const registryUrl = `${convertRegistryPathToUrl(
      registryPath
    )}/registry.yaml`;
    try {
      const response = await axios.get(registryUrl);
      registryData = response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  return yaml.load(registryData, { json: true }) as ModuleRegistry;
};

export default getRegistry;
