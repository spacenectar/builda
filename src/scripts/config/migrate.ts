import { addConfigComments, globals, printMessage } from '@helpers';
import { Config } from '@typedefs/config';
import { LegacyConfig } from '@typedefs/legacy-config';
import fs from 'fs';
import yaml from 'js-yaml';

const fileName = globals.configFileName;

const migrate = () => {
  const { configFileName, configFileNameLegacy } = globals;
  if (fs.existsSync(fileName)) {
    printMessage(
      `You already have a ${fileName} file. Aborting...\n\n`,
      'error'
    );
    process.exit(1);
  }
  if (!fs.existsSync(configFileNameLegacy)) {
    printMessage(
      `No ${configFileNameLegacy} file found. Try --init instead. Aborting...`,
      'error'
    );
    process.exit(1);
  }
  const legacyConfigRead = fs.readFileSync(configFileNameLegacy, 'utf8');
  const legacyConfig = yaml.load(legacyConfigRead) as LegacyConfig;
  const config = {
    output: legacyConfig.output || './src/components',
    typescript: legacyConfig.typescript
      ? {
          inline: legacyConfig.typescript.inline || false
        }
      : false,
    storybook: legacyConfig.storybook
      ? {
          story_format: legacyConfig.storybook.use_mdx ? 'mdx' : 'csf',
          params: legacyConfig.storybook.params || undefined
        }
      : false,
    tests: legacyConfig.tests
      ? {
          extension: legacyConfig.tests.extension || 'spec'
        }
      : false,
    styles: legacyConfig.styles
      ? {
          preprocessor: legacyConfig.styles.preprocessor || false,
          modules: legacyConfig.styles.modules || false
        }
      : false,
    generate_readme: legacyConfig.generate_readme || false,
    extra_directories: legacyConfig.directories || [],
    prepopulate: legacyConfig.prepopulate || true
  } as Config;

  const configWithComments = addConfigComments(
    yaml.dump(config, {
      quotingType: '"',
      forceQuotes: true
    })
  );

  fs.writeFileSync(configFileName, configWithComments, 'utf8');
};

export default migrate;
