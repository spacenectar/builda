// As we need the package.json version to be available in the build, we need to copy it from the root of the project

const fs = require('fs');

const version = require('./package.json').version;

const globals = {
  version,
  configFileName: '.builda.yml',
  configFileNameLegacy: '.buildcomrc',
  docSiteUrl: 'https://www.builda.app'
};

const output = `export default ${JSON.stringify(globals, null, 2)};`;

fs.writeFileSync('./src/helpers/globals.ts', output);
