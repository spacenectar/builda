import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export type Props = React.ComponentProps<'div'>;

// Render component
export const CardHeader: React.FC<Props> = ({ children }: Props) => (
  <div className={styles['header']}>{children}</div>
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
