import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export type Props = React.ComponentProps<'tbody'>;

// Render component
export const TableHead: React.FC<Props> = ({ children }: Props) => (
  <thead className={styles['table-head']}>{children}</thead>
);

TableHead.displayName = 'TableHead';

export default TableHead;
