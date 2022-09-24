import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export interface Props {
  /**
   * The children of the component
   */
  children: React.ReactNode;
  /**
   * The custom class name to apply to the component
   */
  className?: string;
  /**
   * The number of columns to display
   * @default 1
   */
  columns?: number;
  /**
   * The number of rows to display
   * @default 1
   */
  rows?: number;
  /**
   * The gap between columns
   * @default '1rem'
   */
  colGap?: string;
  /**
   * The gap between rows
   * @default '1rem'
   */
  rowGap?: string;
}

/**
 * The Grid component is a wrapper component which allows you to display children in a grid equally sized grid. Up to 5 columns can be displayed in a row.
 */
export const Grid: React.FC<Props> = ({
  children,
  className,
  columns = 1,
  rows = 1,
  colGap = '1rem',
  rowGap = '1rem'
}: Props) => {
  return (
    <div
      className={cx(
        styles['grid'],
        {
          [styles['grid-columns-1']]: columns === 1,
          [styles['grid-columns-2']]: columns === 2
        },
        className
      )}
      style={
        {
          '--grid-columns': columns,
          '--grid-rows': rows,
          '--grid-col-gap': colGap,
          '--grid-row-gap': rowGap
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
