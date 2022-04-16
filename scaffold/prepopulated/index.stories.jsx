import React from 'react'

// Import component files
import %ComponentExample% from './index'

// Import readme
import docs from './README.md'

// Configure story
export default {
  title: 'molecule/%ComponentExample%',
  component: %ComponentExample%,
  %extraParams%
}

// Stories
export const Default = () => <%ComponentExample% name="test" colour="red" />

