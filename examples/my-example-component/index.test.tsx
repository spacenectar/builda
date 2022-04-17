/* global it expect describe */

import React from 'react'
import { render } from '@testing-library/react';

// Import component files
import MyExampleComponent from './index'

// Tests
describe('MyExampleComponent component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <MyExampleComponent name="test" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
