import buildaProject from './project';
import fs from 'fs';

import path from 'path';

const FILE_FOLDER = './experiments';

const cwdCache = process.cwd();

describe('builda project from prefab - no npm install', () => {
  beforeAll(async () => {
    fs.mkdirSync(FILE_FOLDER, { recursive: true });
    process.chdir(FILE_FOLDER);
    await buildaProject({
      appName: 'My App',
      appRoot: './',
      prefab: 'github:builda-modules/prefab-test',
      packageManager: 'npm',
      autoInstall: false
    });
  });

  afterAll(() => {
    process.chdir(cwdCache);
    jest.restoreAllMocks();
    jest.resetModules();
    // if (fs.existsSync(path.resolve(FILE_FOLDER))) {
    //   fs.rmSync(path.resolve(FILE_FOLDER), { recursive: true });
    // }
  });

  test('The .builda file contains an export dir', () => {
    const buildaDir = path.resolve('.builda');
    const pathExists = fs.existsSync(buildaDir);
    expect(pathExists).toBe(true);
  });
});
