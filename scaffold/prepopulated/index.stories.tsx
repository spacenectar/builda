import React from 'react'

// Import component files
import %ComponentName% from './index'

// Import readme
import docs from './README.md'

// Configure Story
export default {
  title: 'molecule/%ComponentName%',
  component: %ComponentName%,
  %extraParams%
}

// Stories
export const Default: React.FC = () => <%ComponentName% name="test" />

