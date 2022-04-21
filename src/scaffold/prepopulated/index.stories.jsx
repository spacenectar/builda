import React from 'react'

// Import component files
import %ComponentName% from './index'

%readmeimport%

// Configure story
export default {
  title: 'molecule/%ComponentName%',
  component: %ComponentName%,
  %extraParams%
}

// Stories
export const Default = () => <%ComponentName% name="test" />

