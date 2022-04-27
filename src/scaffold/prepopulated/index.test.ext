/* global it expect describe */

import React from 'react'
import { render } from '@testing-library/react';

// Import component files
import %ComponentName% from './index'

// Tests
describe('%ComponentName% component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <%ComponentName% name="test" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
