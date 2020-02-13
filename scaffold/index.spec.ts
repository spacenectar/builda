import React from 'react'
import renderer from 'react-test-renderer'

import %ComponentExample% from './index'

it('%ComponentExample% renders correctly', () => {
    const tree = renderer
      .create(<%ComponentExample% name="test" colour="blue" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });