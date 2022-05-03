#! /usr/bin/env node

import config from '@scripts/config';
import { printLogo, componentBuilda } from '@scripts';
import { Config } from '@typedefs/config';

printLogo();

// Get the config object to pass to the generator
config().then((config) => componentBuilda(config as Config));
