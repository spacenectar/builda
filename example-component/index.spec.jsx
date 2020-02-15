/* global it expect */

import React from 'react'
import renderer from 'react-test-renderer'

import ExampleComponent from './index'

it('ExampleComponent renders correctly', () => {
  const tree = renderer
    .create(<ExampleComponent name="test" colour="blue" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});