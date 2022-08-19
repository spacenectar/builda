import fs from 'fs';

import presetAnswers from '@mocks/preset-answers';
import init from '@scripts/init';
import { ConfigFile } from '@typedefs/config-file';
import path from 'path';

const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';
let config = {} as ConfigFile;

beforeAll(async () => {
  await init({presetAnswers});
  config = JSON.parse(fs.readFileSync(path.resolve(CONFIG_FILE), 'utf8'));
});

afterAll(() => {
  if (fs.existsSync(path.resolve(CONFIG_FILE))) {
    fs.rmSync(path.resolve(CONFIG_FILE));
  }
  if (fs.existsSync(path.resolve(CONFIG_FOLDER))) {
    fs.rmSync(path.resolve(CONFIG_FOLDER), { recursive: true });
  }
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

test('The config file contains a "test" section with the correct values', () => {
  expect(config.commands.test).toEqual({
    type: 'scaffold',
    outputPath: './experiments/test',
    use: 'default-ts',
    substitute: []
  });
});

