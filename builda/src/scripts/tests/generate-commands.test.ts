import fs from 'fs';
import path from 'path';

import presetAnswers from '@mocks/preset-answers';
import generateCommands from '@scripts/generate-commands';
import init from '@scripts/init';
import CommandConfig from '@typedefs/command-config';

const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';
let commands = [] as CommandConfig[];

beforeAll(async () => {
  await init({presetAnswers});
  commands = await generateCommands()
});

afterAll(() => {
  if (fs.existsSync(path.resolve(CONFIG_FILE))) {
    fs.rmSync(path.resolve(CONFIG_FILE));
  }
  if (fs.existsSync(path.resolve(CONFIG_FOLDER))) {
    fs.rmSync(path.resolve(CONFIG_FOLDER), { recursive: true });
  }
});


test('config file is parsed and commands extracted', async () => {
  expect(commands).toEqual([
    {
      name: 'atom',
      type: 'scaffold',
      use: 'default-ts',
      outputPath: './experiments/atom',
      substitute: []
    },
    {
      name: 'component',
      type: 'scaffold',
      use: 'default-ts',
      outputPath: './experiments/component',
      substitute: []
    },
    {
      name: 'test',
      type: 'scaffold',
      use: 'default-ts',
      outputPath: './experiments/test',
      substitute: []
    }
  ]);
});
