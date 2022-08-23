import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'textarea'> {
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
}

/* Render component */
export const InputTextarea: React.FC<Props> = ({
  status,
  className,
  ...props
}: Props) => {
  return (
    <textarea
      className={cx(
        styles['input'],
        styles[`type-multiline`],
        styles[`status-${status || 'default'}`],
        className
      )}
      {...props}
    />
  );
};

InputTextarea.displayName = 'InputTextarea';

export default InputTextarea;
