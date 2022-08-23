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
   * @default 3
   * @maxmum 5
   */
  columns?: 1 | 2 | 3 | 4 | 5;
}

/**
 * The Grid component is a wrapper component which allows you to display children in a grid equally sized grid. Up to 5 columns can be displayed in a row.
 */
export const Grid: React.FC<Props> = ({
  children,
  className,
  columns = 3
}: Props) => {
  return (
    <div
      className={cx(
        styles['grid'],
        styles[`with-${columns}-columns`],
        className
      )}
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
