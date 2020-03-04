import React from 'react'
import { addParameters, addDecorator } from '@storybook/react'; 
import { addReadme, configureReadme } from 'storybook-readme';

configureReadme({
  /**
   * Wrapper for story. Usually used to set some styles
   * React: React.ReactNode
   */
  StoryPreview: ({ children }) => <div style={{ margin: '2rem 1rem' }}>{children}</div>,
 
  /**
   * Wrapper for content and sidebar docs. Usually used to set some styles
   * React: React.ReactNode
   * Vue: Vue component
   */
  DocPreview: ({ children }) => (
    <div style={{ backgroundColor: '#fff', padding: '1rem'  }}> {children}</div>
  )
});

addParameters({
  options: {
    showSearchBox: true
  },
  readme: {
    info: { inline: true },
    codeTheme: 'atom-dark',
  }
});

addDecorator(addReadme);