import React from 'react';

import Badge from './badge';

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The name of the compatible component
   */
  component?: 'cards' | 'card' | 'inputfactory' | 'input-factory';
}

// Render component
export const WorksWith: React.FC<Props> = ({ component }: Props) => {
  const storyLink = '/?path=/docs';
  const getComponent = (component: string) => {
    switch (component.toLowerCase()) {
      case 'cards':
      case 'card':
        return {
          name: 'Cards',
          link: `${storyLink}/molecule-card--default-story#compatibility`,
          colour: '#6699cc'
        };
      case 'inputfactory':
      case 'input-factory':
        return {
          name: 'InputFactory',
          link: `${storyLink}/molecule-inputfactory--text-input#compatibility`,
          colour: '#663399'
        };
      default:
        throw new Error(`${component} is not a valid component name`);
    }
  };

  const { name, link, colour } = getComponent(component);

  return (
    <Badge colour={colour} link={link}>
      Works with <strong>{name}</strong>
    </Badge>
  );
};

export default WorksWith;
