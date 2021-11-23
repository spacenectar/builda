import React from 'react'

// Import component files
import %ComponentExample% from './index'

// Import readme
import docs from './README.md'

// Configure Story
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
export const Default: React.FC = () => <%ComponentExample% name="test" colour="green"/>

