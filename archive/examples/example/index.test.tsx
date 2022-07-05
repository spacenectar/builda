/* global it expect describe */

import React from 'react'
import { render } from '@testing-library/react';

// Import component files
import Example from './index'

// Tests
describe('Example component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <Example name="test" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
