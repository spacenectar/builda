import axios from 'axios';

import { getFileListFromRegistry } from '../get-file-list-from-registry';

const fileList = ['index.stories.mdx', 'index.tsx', 'styles.module.scss'];

describe('getFileListFromRegistry() function', () => {
  test('should return a list of files from a registry.json file', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { files: fileList } });
    const registryPath =
      'https://raw.githubusercontent.com/st-elmos-fire/builda/master/scaffolds/component-with-storybook/registry.json';
    const registryContent = await getFileListFromRegistry(registryPath);
    expect(axios.get).toHaveBeenCalledWith(registryPath);
    expect(registryContent).toEqual(fileList);
  });
});
