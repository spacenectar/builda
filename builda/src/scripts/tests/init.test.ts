import fs from 'fs';

import init from '@scripts/init';

import presetAnswers from '@mocks/preset-answers';
import type { ConfigFile } from '@typedefs/config-file';


import globals from '@data/globals';

const { configFileName: fileName } = globals;

let config = {} as ConfigFile

describe('init function (happy path)', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => null);
    await init({presetAnswers, force: true});
    config = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('A config file is produced', () => {
    expect(fs.existsSync(fileName)).toBe(true);
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

  test('The config file contains a "test" section with the correct values', () => {
    expect(config.commands.test).toEqual({
      type: 'scaffold',
      outputPath: './experiments/test',
      use: 'default-ts',
      substitute: []
    });
  });
});

describe('init function (error path)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('If a config file already exists, an error is thrown and the promise is rejected', () => {
    expect(() => init({presetAnswers})).rejects.toThrowError(
      `You already have a ${fileName} file. Process Aborted.`
    );
  });
});
