// As we need the package.json version to be available in the build, we need to copy it from the root of the project

const fs = require('fs');

const version = require('./package.json').version;

fs.writeFileSync('./src/version.ts', `export default '${version}';`);
