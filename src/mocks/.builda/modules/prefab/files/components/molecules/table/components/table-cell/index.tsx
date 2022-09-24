import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'td'> {
  /**
   * Highllight the cell?
   */
  highlight?: boolean;
  /**
   * Use a custom colour for the highlight
   * @default 'faded primary colour'
   */
  highlightColour?: string;
  /**
   * Use cell as a header?
   */
  th?: boolean;
  /**
   * Specify the heading the cell should display in small resolutions
   */
  contextHeading?: string;
}

/* Render component */
export const TableCell: React.FC<Props> = ({
  className,
  children,
  highlight,
  highlightColour,
  th,
  contextHeading,
  ...props
}: Props) => {
  const TagChooser = th ? 'th' : 'td';

  return (
    <TagChooser
      className={cx(
        styles[th ? 'th' : 'td'],
        highlight && styles['highlight'],
        className
      )}
      style={
        highlight && highlightColour ? { backgroundColor: highlightColour } : {}
      }
      {...(contextHeading && { 'data-heading': contextHeading })}
      {...props}
    >
      {children}
    </TagChooser>
  );
};

TableCell.displayName = 'TableCell';

export default TableCell;
