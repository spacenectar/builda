import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export type Props = React.ComponentProps<'div'>;

// Render component
export const CardFooter: React.FC<Props> = ({ children }: Props) => (
  <div className={styles['footer']}>{children}</div>
);

CardFooter.displayName = 'CardFooter';

export default CardFooter;
