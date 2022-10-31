import React from 'react';
import classNames from 'classnames';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';
interface Props extends React.ComponentProps<'input'> {
  /**
   * Label for the checkbox
   */
  label: string;
  /**
   * The state of the input
   */
  status?: ComponentStatuses;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Render component */
export const InputRadio: React.FC<Props> = ({
  label,
  disabled,
  className,
  name,
  id,
  status,
  ...props
}: Props) => {
  return (
    <label
      className={cx(styles['label'], {
        [styles['disabled']]: disabled
      })}
    >
      <input
        type="radio"
        className={cx(
          styles['input'],
          status && styles[`status-${status}`],
          className
        )}
        name={name}
        id={id || name}
        disabled={disabled}
        {...props}
      />
      <span className={styles['text']}>{label}</span>
    </label>
  );
};

InputRadio.displayName = 'InputRadio';

export default InputRadio;
