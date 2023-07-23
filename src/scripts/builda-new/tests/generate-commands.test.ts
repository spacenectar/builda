import generateCommands from 'scripts/builda-new/helpers/generate-commands';

import config from 'mocks/package.json';

describe('generateCommands', () => {
  let commands = {} as ConfigFile['scripts'];

  beforeEach(async () => {
    commands = generateCommands(config.builda);
  });

  test('config file is parsed and commands extracted', () => {
    expect(commands).toEqual({
      atom: {
        outputDir: './experiments/components/atoms',
        use: 'component'
      },
      molecule: {
        outputDir: './experiments/components/molecules',
        use: 'component'
      },
      organism: {
        outputDir: './experiments/components/organisms',
        use: 'component'
      },
      partial: {
        outputDir: './experiments/components/partials',
        use: 'component'
      },
      page: {
        outputDir: './experiments/pages',
        use: 'page'
      },
      input: {
        outputDir: './experiments/components/inputs',
        use: 'component'
      }
    });
  });
});
