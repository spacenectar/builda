#! /usr/bin/env node

import returnMessage from '@helpers/return-message';
import comGen from '@scripts/component-generator';
import getConfig from '@scripts/get-config';
import { Config } from '@typedefs/config';

returnMessage('\n=============================================', 'primary');
returnMessage('BuildCom_\r', 'primary');
returnMessage(`Component builder`, 'primary');
returnMessage('=============================================\n', 'primary');

// Generate the component
getConfig().then((configs) =>
  configs.forEach((config: Config) => comGen(config))
);
