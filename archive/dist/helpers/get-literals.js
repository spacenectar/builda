"use strict";
// This is a function to return template literals for the scaffold files
Object.defineProperty(exports, "__esModule", { value: true });
const getLiteral = ({ name, props }) => {
    let literal = ``;
    switch (name) {
        case 'inline-types':
            literal = `
      // Prop Types
      export interface Props {
      ${props.prepopulate
                ? ` /**
         * The name of the component
         */
        name: string;
      `
                : ''}}
      `;
            break;
        case 'imported-types':
            literal = `
      // Import Types
      import Props from './types/props'
      `;
            break;
        case 'imported-readme':
            literal = `
      // Import readme
      import docs from './README.md'
      `;
            break;
        case 'stylesheet-modules':
            literal = `
      // Import Stylesheet
      import styles from './styles.${props.stylesheet}'
      `;
            break;
        case 'stylesheet':
            literal = `
      // Import Stylesheet
      import styles from './styles.${props.stylesheet}'
      `;
            break;
        case 'mdx-params':
            literal = `parameters={{ ${props.storyParamsString} }}`;
            break;
        case 'csf-params':
            literal = `parameters: {
        ${props.storyParamsString},
        ${props.readme &&
                `readme: {
          // Show readme before story
          content: docs
        }`}
      }`;
            break;
    }
    return literal;
};
exports.default = getLiteral;
