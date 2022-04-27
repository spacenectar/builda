#! /usr/bin/env node

import printMessage from '@helpers/print-message';
import version from './version';
// import config from '@scripts/config';

// import comGen from '@scripts/component-generator';
// import getConfig from '@scripts/get-config';
// import { Config } from '@typedefs/config';

printMessage('\n=============================================', 'primary');
printMessage(`    ___      _ _    _                 `, 'primary');
printMessage(`   | _ )_  _(_) |__| |__ ___ _ __     `, 'primary');
printMessage(`   | _ \\ || | | / _\` / _/ _ \\ '  \\    `, 'primary');
printMessage(`   |___/\\_,_|_|_\\__,_\\__\\___/_|_|_|__ `, 'primary');
printMessage(`                                 |___|\n`, 'primary');
printMessage(`    By Alex Foxleigh            v${version}\n`, 'secondary');
printMessage('=============================================\n', 'primary');

// // Generate the component
// getConfig().then((configs) =>
//   configs.forEach((config: Config) => comGen(config))
// );

// config();
