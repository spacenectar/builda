import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export type Props = React.ComponentProps<'tbody'>;

// Render component
export const TableBody: React.FC<Props> = ({ children }: Props) => (
  <tbody className={styles['table-body']}>{children}</tbody>
);

TableBody.displayName = 'TableBody';

export default TableBody;
