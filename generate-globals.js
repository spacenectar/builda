// As we need the package.json version to be available in the build, we need to copy it from the root of the project

const fs = require('fs');

const packageJson = require('./package.json');
const { version, repository } = packageJson;

const globals = {
  version,
  buildaDir: '.builda',
  configFileName: 'config.json',
  websiteUrl: 'https://www.builda.app',
  repository
};

const output = `export default ${JSON.stringify(globals)};`;

fs.writeFileSync('./src/data/globals.ts', output);