/* global it expect */

import React from 'react'
import { render } from '@testing-library/react';

// Import component files
import %ComponentExample% from './index'

// Tests
describe('%ComponentExample% component', () => {
  it('renders to match snapshot', () => {
    const { baseElement } = render(
      <%ComponentExample% name="test" colour="blue" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
