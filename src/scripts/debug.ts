#! /usr/bin/env node

import init from '@scripts/init';
import presetAnswers from '@mocks/preset-answers';

init({
  fileName: '.builda.yml',
  presetAnswers
});
