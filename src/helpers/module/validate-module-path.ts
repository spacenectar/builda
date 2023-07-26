import axios from 'axios';
import Ajv from 'ajv';

import convertRegistryPathToUrl from './convert-registry-path-to-url';

import schema from 'data/module-registry-schema.json';

const ajv = new Ajv();

export default async (
  url: string,
  resolved?: boolean
): Promise<{
  status: boolean;
  message: string;
}> => {
  let registryUrl = url;
  if (!resolved) {
    const rurl = convertRegistryPathToUrl({
      registryPath: url
    });
    if (rurl.error) {
      return {
        status: false,
        message: rurl.error
      };
    }
    registryUrl = rurl.url;
  }

  const registry = registryUrl.includes('registry.json')
    ? registryUrl
    : `${registryUrl}/registry.json`;

  return axios
    .get(registry)
    .then((response) => {
      if (!response.data) {
        return {
          status: false,
          message:
            'Something went wrong while fetching the registry. No data was returned and no error was provided.'
        };
      }

      // Validate the json file
      const validate = ajv.compile(schema);
      const valid = validate(response.data);
      if (valid) {
        return {
          status: true,
          message: 'Registry fetched successfully'
        };
      }
      validate.errors?.forEach((error) => {
        console.log(`Registry validation error: ${error.message}`);
      });
      return {
        status: false,
        message:
          'The registry file is not valid. Please check the documentation for the correct format.'
      };
    })
    .catch((error) => {
      if (error.code === 'ENOTFOUND' || error.code === 'ERR_BAD_REQUEST') {
        return {
          status: false,
          message:
            'The url must point to a folder that contains a registry.json file'
        };
      }
      if (error.code === 'ECONNREFUSED') {
        return {
          status: false,
          message: `The server at ${registry} is not responding are you sure it is correct?`
        };
      }
      return {
        status: false,
        message: error.message
      };
    });
};
