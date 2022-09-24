import React from 'react';
import classNames from 'classnames';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';

/** Prop types */
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
export const InputCheckbox: React.FC<Props> = ({
  label,
  checked,
  disabled,
  className,
  status,
  value = label.replace(/\s/g, '-').toLowerCase(),
  ...props
}: Props) => {
  return (
    <label
      className={cx(styles['label'], {
        [styles['checked']]: checked,
        [styles['disabled']]: disabled
      })}
    >
      <span className={cx(styles['icon-container'])}>
        <input
          type="checkbox"
          className={cx(
            styles['input'],
            status && styles[`status-${status}`],
            className
          )}
          checked={checked}
          disabled={disabled}
          value={value}
          {...props}
        />
      </span>
    </label>
  );
};

InputCheckbox.displayName = 'InputCheckbox';

export default InputCheckbox;
