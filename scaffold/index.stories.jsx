import React from 'react'

// Import component files
import %ComponentExample% from './index'
import docs from './README.md'

// Configure story
export default {
  title: 'molecule/%ComponentExample%',
  component: %ComponentExample%,
  decorators: [],
  parameters: {
    readme: {
      // Show readme before story
      content: docs
    }
  }
}

// Stories
export const Default = () => <%ComponentExample% name="test" colour="red" />

