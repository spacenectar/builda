import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'tr'> {
  /**
   * Highllight the row?
   */
  highlight?: boolean;
  /**
   * Use a custom colour for the highlight
   * @default 'faded primary colour'
   */
  highlightColour?: string;
}

/* Render component */
export const TableRow: React.FC<Props> = ({
  className,
  children,
  highlight,
  highlightColour,
  ...props
}: Props) => (
  <tr
    className={cx(styles['tr'], highlight && styles['highlight'], className)}
    style={
      highlight && highlightColour ? { backgroundColor: highlightColour } : {}
    }
    {...props}
  >
    {children}
  </tr>
);

TableRow.displayName = 'TableRow';

export default TableRow;
