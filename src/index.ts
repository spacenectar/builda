#! /usr/bin/env node

import printMessage from '@helpers/print-message';
import version from './version';
import chalk from 'chalk';
// import config from '@scripts/config';
// import { Config } from '@typedefs/config';

printMessage('\n==========================================', 'primary');
console.log(
  chalk.magenta(`    ___      _ _    _               `) +
    chalk.white(`v${version}`)
);
printMessage(`   | _ )_  _(_) |__| |__ ___ _ __     `, 'primary');
printMessage(`   | _ \\ || | | / _\` / _/ _ \\ '  \\    `, 'primary');
printMessage(`   |___/\\_,_|_|_\\__,_\\__\\___/_|_|_|__ `, 'primary');
console.log(
  chalk.white(`   A component generator         `) + chalk.magenta(`|___|`)
);
printMessage('==========================================\n', 'primary');

// config().then((configs) =>
//   configs.forEach((config: Config) => console.log(config))
// );
