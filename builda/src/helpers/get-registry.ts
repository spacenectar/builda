import axios from 'axios';
import fs from 'fs';

import convertRegistryPathToUrl from './convert-registry-path-to-url';
import detectPathType from './detect-path-type';

export const getRegistry = async (registryPath: string) => {
  const pathType = detectPathType(registryPath);

  if (pathType === 'local') {
    return JSON.parse(fs.readFileSync(`${registryPath}/registry.json`, 'utf8'));
  }

  if (pathType === 'remote') {
    const registryUrl = `${convertRegistryPathToUrl(
      registryPath
    )}/registry.json`;
    try {
      const response = await axios.get(registryUrl);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }


};

export default getRegistry;
