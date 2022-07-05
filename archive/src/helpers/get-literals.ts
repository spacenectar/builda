// This is a function to return template literals for the scaffold files

/**
 * PropTypes
 */
interface Props {
  /**
   * The name of the literal to retrieve
   */
  name: string;
  /**
   * The props to pass to the getLiteral function
   */
  props: {
    /**
     * Prepopulate files?
     * @default false
     */
    prepopulate: boolean;
    /**
     * Stylesheet type
     */
    stylesheet: string;
    /**
     * The parameters for storybook
     */
    storyParamsString: string;
    /**
     * Generate readme?
     * @default false
     */
    readme: boolean;
  };
}

const getLiteral = ({ name, props }: Props) => {
  let literal = ``;
  switch (name) {
    case 'inline-types':
      literal = `
      // Prop Types
      export interface Props {
      ${
        props.prepopulate
          ? ` /**
         * The name of the component
         */
        name: string;
      `
          : ''
      }}
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
        ${
          props.readme &&
          `readme: {
          // Show readme before story
          content: docs
        }`
        }
      }`;
      break;
  }
  return literal;
};

export default getLiteral;
