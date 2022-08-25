import {
  Meta,
  Story,
  Canvas,
  Description,
  ArgsTable,
  IconGallery,
  IconItem
} from '@storybook/addon-docs';
import LinkTo from '@storybook/addon-links/react';

import Badge from './doc-blocks/badge';
import Tip from './doc-blocks/tip';
import WorksWith from './doc-blocks/works-with';
import Title from './doc-blocks/title';

import pretty from 'pretty';

import addons from '@storybook/addons';

import 'styles/index.scss';
import 'react-image-crop/dist/ReactCrop.css';

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on('DARK_MODE', (isDark) => {
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.setAttribute(
    'data-theme',
    isDark ? 'dark' : 'light'
  );
});

const viewports = {
  iPhoneXR: {
    name: 'iPhone XR',
    styles: {
      width: '414px',
      height: '896px'
    }
  },
  iPhoneXS: {
    name: 'iPhone XS',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px'
    }
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  iPad: {
    name: 'iPad (Other)',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '1024px'
    }
  },
  ultrawide: {
    name: 'Ultrawide Desktop',
    styles: {
      width: '1600px',
      height: '1200px'
    }
  }
};

export const parameters = {
  docs: {
    components: {
      Meta,
      Story,
      Canvas,
      Description,
      ArgsTable,
      IconGallery,
      IconItem,
      LinkTo,
      Badge,
      Title,
      Tip,
      WorksWith
    },
    transformSource: (input) => pretty(input)
  },
  previewTabs: {
    canvas: {
      title: 'Playground',
      hidden: false
    }
  },
  viewMode: 'docs',
  options: {
    showSearchBox: true,
    storySort: {
      method: 'alphabetical',
      includeName: true,
      order: [
        'docs',
        [
          'Introduction',
          'Coding Guidelines',
          ['General'],
          '*',
          'Architectural Decisions',
          ['Introduction']
        ],
        'atom',
        ['Introduction', 'Default', '*'],
        'molecule',
        ['Introduction', 'Default', '*'],
        'organism',
        ['Introduction', 'Default', '*'],
        'partial',
        ['Introduction', 'Default', '*'],
        'page',
        ['Introduction', 'Default', '*'],
        'input',
        ['Introduction', 'Default', '*']
      ]
    }
  },
  layout: 'centered',
  readme: {
    info: { inline: true },
    codeTheme: 'atom-dark'
  },
  viewport: {
    viewports
  },
  actions: {
    argTypesRegex: '^on.*'
  },
  controls: { expanded: true },
  darkMode: {
    classTarget: 'html'
  }
};
