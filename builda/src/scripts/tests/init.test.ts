import fs from 'fs';

import presetAnswers from '@mocks/preset-answers';
import init from '@scripts/init';
import { ConfigFile } from '@typedefs/config-file';
import getConfigFile from '@helpers/get-config-file';

describe('init', () => {
  const CONFIG_FILE = '.builda.json';
  let config = {} as ConfigFile;
  beforeAll(async () => {
    await init({ presetAnswers });
    config = getConfigFile();
  });

  test('A config file is produced', () => {
    expect(fs.existsSync(CONFIG_FILE)).toBe(true);
  });

  test('The config file contains an appName value which reads "test"', () => {
    expect(config.app.name).toBe('test');
  });

  test('The config file contains an "atom" section with the correct values', () => {
    expect(config.commands.atom).toEqual({
      type: 'scaffold',
      outputPath: './experiments/atom',
      use: 'default-ts',
      substitute: []
    });
  });

  test('The config file contains an "component" section with the correct values', () => {
    expect(config.commands.component).toEqual({
      type: 'scaffold',
      outputPath: './experiments/component',
      use: 'default-ts',
      substitute: []
    });
  });

  test('The config file contains a "test" section with the correct values', (done) => {
    expect(config.commands.test).toEqual({
      type: 'scaffold',
      outputPath: './experiments/test',
      use: 'default-ts',
      substitute: []
    });
    setTimeout(() => done(), 2000);
  });
});
