import axios from 'axios';

import { getRegistry } from '../get-registry';

const bluePrintPath = 'src/mocks/blueprints/test-blueprint';

beforeAll(() => {
  axios.get = jest.fn().mockResolvedValue({ data: { name: 'test-blueprint' } });
});
afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

describe('getRegistry() via local path', () => {
  test('should return a blueprint name from a registry.json file when a full url is used', async () => {
    const registryContent = await getRegistry(`./${bluePrintPath}`);
    expect(registryContent.name).toEqual('test-blueprint');
  });
});

describe('getRegistry() via url path', () => {
  test('should return a blueprint from a registry.json file when a full url is used', async () => {
    const registryPath = `https://github.com/spacenectar/builda-app/blob/master/${bluePrintPath}`;
    const registryContent = await getRegistry(registryPath);
    expect(axios.get).toHaveBeenCalledWith(
      `https://raw.githubusercontent.com/spacenectar/builda-app/master/src/mocks/blueprints/test-blueprint/registry.json`
    );
    expect(registryContent.name).toEqual('test-blueprint');
  });
});

describe('getRegistry() via resolver path', () => {
  test('should return a blueprint from a registry.json file when a full url is used', async () => {
    const registryPath = `$github:spacenectar/builda-app/master/${bluePrintPath}`;
    const registryContent = await getRegistry(registryPath);
    expect(axios.get).toHaveBeenCalledWith(
      `https://raw.githubusercontent.com/spacenectar/builda-app/master/src/mocks/blueprints/test-blueprint/registry.json`
    );
    expect(registryContent.name).toEqual('test-blueprint');
  });
});
