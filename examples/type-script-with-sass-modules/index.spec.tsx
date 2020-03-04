/* global it expect */

import React from 'react'
import renderer from 'react-test-renderer'

import TypeScriptWithSassModules from './index'

it('TypeScriptWithSassModules renders correctly', () => {
  const tree = renderer
    .create(<TypeScriptWithSassModules name="test" colour="blue" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});