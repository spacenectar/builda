#! /usr/bin/env node

import config from '@scripts/config';
import printLogo from '@scripts/print-logo';

printLogo();

// Get the config object to pass to the generator
config().then((config) => console.log(config));
