import React from 'react';

import styles from './styles.module.css';

type StatusType =
  | 'alpha'
  | 'beta'
  | 'rc'
  | 'deprecated'
  | 'stable'
  | 'unstable'
  | 'experimental';

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The Status type to display
   * @default #6699cc;
   */
  type?: StatusType;
  /**
   * The optional link for more information
   */
  link?: string;
}

// Render component
export const Title: React.FC<Props> = ({ type, link, children }: Props) => {
  const getColor = (type: StatusType) => {
    switch (type.toLowerCase()) {
      case 'alpha':
        return '#6699cc';
      case 'beta':
        return '#ff9900';
      case 'rc':
        return '#ff9900';
      case 'deprecated':
        return '#ff0000';
      case 'stable':
        return '#009900';
      case 'unstable':
        return '#ff9900';
      case 'experimental':
        return '#ff9900';
      default:
        throw new Error(`Unknown status type: ${type}`);
    }
  };

  if (!type) throw new Error('Status type is required');

  return (
    <div className={styles.title}>
      <h1>{children}</h1>
      <a
        className={`${styles.badge} ${styles['tip-badge']}`}
        style={{ backgroundColor: getColor(type) }}
        href={link}
      >
        {type.toUpperCase()}
      </a>
    </div>
  );
};

export default Title;
