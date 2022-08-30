import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';
import { InputOption } from 'lib/types/input-option';

/* Prop Types */
export interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
  /**
   * The options to render if value is not set, the label will be the value
   */
  options: InputOption[];
}

const cx = classNames.bind(styles);

/* Render component */
export const InputSelect: React.FC<Props> = ({
  status,
  className,
  options,
  placeholder,
  multiple,
  ...props
}: Props) => {
  return (
    <select
      className={cx(
        styles['input-select'],
        styles[`status-${status || 'default'}`],
        multiple && styles['multiple'],
        className
      )}
      multiple={multiple}
      {...props}
    >
      {placeholder && !multiple && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => {
        const val = option.value || option.label;

        return (
          <option key={val} value={val}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

InputSelect.displayName = 'InputSelect';

export default InputSelect;
