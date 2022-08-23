import React from 'react';
import classNames from 'classnames';

// Import child components
import TableBody from './components/table-body';
import TableHead from './components/table-head';
import TableRow from './components/table-row';
import TableCell from './components/table-cell';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export interface Props extends React.ComponentProps<'table'> {
  /**
   * Should the table be striped?
   * @default false
   */
  striped?: boolean;
  /**
   * Should the table have a solid background colour on the header?
   * @default false
   */
  solidHeader?: boolean;
  /**
   * Should the table take up the full width of its container?
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Foward ref to the table element
   */
  innerRef?: React.Ref<HTMLTableElement>;
}

interface ComponentProps extends React.FC<Props> {
  Body: typeof TableBody;
  Head: typeof TableHead;
  Row: typeof TableRow;
  Cell: typeof TableCell;
}

const cx = classNames.bind(styles);

// Render component
export const Table: ComponentProps = ({
  striped,
  solidHeader,
  fullWidth,
  children,
  className,
  innerRef,
  ...props
}: Props) => {
  return (
    <table
      ref={innerRef || undefined}
      className={cx(
        styles['table'],
        striped && styles['striped'],
        solidHeader && styles['solid-header'],
        fullWidth && styles['full-width'],
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
};

Table.displayName = 'Table';

Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;

export type TableProps = Props;
