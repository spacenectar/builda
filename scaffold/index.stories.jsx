import React from 'react'

// Import component files
import %ComponentExample% from './index'
import docs from './README.md'


export default {
  title: 'local/%ComponentExample%',
  component: %ComponentExample%,
  decorators: [],
  parameters: {
    readme: {
      // Show readme before story
      content: docs
    }
  }
}

export const Default = () => <%ComponentExample% name="test" colour="red" />

