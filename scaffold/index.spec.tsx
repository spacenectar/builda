/* global it expect */

import React from 'react'
import renderer from 'react-test-renderer'

// Import component files
import %ComponentExample% from './index'

// Tests
it('%ComponentExample% renders correctly', () => {
  const tree = renderer
    .create(<%ComponentExample% name="test" colour="blue" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});