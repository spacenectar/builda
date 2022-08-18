import React from 'react';

import %PASCAL_CASE% from './index';
import docs from './README.md';


export default {
  title: '%PREFIX%/%PASCAL_CASE%',
  component: %PASCAL_CASE%,
  decorators: [],
  parameters: {
    readme: {
      // Show readme before story
      content: docs
    }
  }
};

export const Default: React.FC = () => {
  return <%PASCAL_CASE% />
};
