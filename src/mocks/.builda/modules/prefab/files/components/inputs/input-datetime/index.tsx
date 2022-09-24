import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';

/* Prop Types */
export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default default
   */
  status?: ComponentStatuses;
}

const cx = classNames.bind(styles);

/* Render component */
export const InputDatetime: React.FC<Props> = ({
  name,
  id,
  status,
  className,
  ...props
}: Props) => (
  <input
    className={cx(
      styles['input'],
      styles[`type-date`],
      styles[`status-${status || 'default'}`],
      className
    )}
    id={id || name}
    name={name}
    type="date"
    {...props}
  />
);

InputDatetime.displayName = 'InputDatetime';

export default InputDatetime;
