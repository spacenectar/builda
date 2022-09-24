import React from 'react';
import classNames from 'classnames';
import { MdPublish } from 'react-icons/md';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';

/* Prop Types */
export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The state of the input (not providing a value or setting the value 'default' will all return a default state)
   * @default default
   */
  status?: ComponentStatuses;
}

const cx = classNames.bind(styles);

/* Render component */
export const InputFile: React.FC<Props> = ({
  name,
  id,
  status,
  disabled,
  width,
  className,
  ...props
}: Props) => (
  <div
    className={cx(
      styles['wrapper'],
      styles[`status-${status || 'default'}`],
      disabled && styles['disabled'],
      className
    )}
    style={{ width: typeof width === 'number' ? `${width}px` : width }}
  >
    <MdPublish className={styles['icon']} />
    <input
      className={cx(styles['input'])}
      id={id || name}
      name={name}
      disabled={disabled}
      type="file"
      {...props}
    />
  </div>
);

InputFile.displayName = 'InputFile';

export default InputFile;
