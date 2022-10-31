import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The classname to provide to the component
   */
  className?: string;
  /**
   * By default, vertical overflow is set to 'auto' to show the scrollbar when needed, this prop can be used to set it
   * to any valid css value.
   * @default 'auto'
   */
  overflowY?: 'auto' | 'hidden' | 'scroll' | 'visible';
}

// Render component
export const CardBody: React.FC<Props> = ({
  className,
  overflowY = 'auto',
  children
}: Props) => (
  <section
    className={cx(styles['body'], styles[`overflow-y-${overflowY}`], className)}
  >
    {children}
  </section>
);

CardBody.displayName = 'CardBody';

export default CardBody;
