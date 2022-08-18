import axios from 'axios';

import { getRegistry } from '../get-registry';

const fileList = ['index.stories.mdx', 'index.tsx', 'styles.module.scss'];

describe('getFileListFromRegistry() function', () => {
  test('should return a list of files from a registry.json file', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { files: fileList } });
    const registryPath = 'https://builda.app/modules/foxys-own';
    const registryContent = await getRegistry(registryPath);
    expect(axios.get).toHaveBeenCalledWith(`${registryPath}/registry.json`);
    expect(registryContent.files).toEqual(fileList);
  });
});
