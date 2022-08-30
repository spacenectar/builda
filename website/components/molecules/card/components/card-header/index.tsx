import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export type Props = React.ComponentProps<'div'>;

// Render component
export const CardHeader: React.FC<Props> = ({ children }: Props) => (
  <header className={styles['header']}>{children}</header>
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
