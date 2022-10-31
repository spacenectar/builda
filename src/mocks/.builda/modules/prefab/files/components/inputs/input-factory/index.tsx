import React from 'react';
import classNames from 'classnames';

/* Import helpers */
import generateId from 'lib/helpers/generate-id';
import renderInput from './helpers/render-input';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';
import { InputTypes } from './types/input-types';
import InputOption from 'lib/types/input-option';

/** Import components */
import InputLabel from 'components/inputs/input-label';

/** Types */

type HelperTextObject = {
  text: string;
  placement: 'top' | 'bottom';
};
export interface Props extends React.ComponentProps<'input'> {
  /**
   * The type of input to render
   * @default text
   */
  type?: InputTypes;
  /**
   * Test ID for the input (used by tests to target the input) default is the id.
   * @default id
   */
  testID?: string;
  /**
   * The label to display above the input.
   **/
  labelText: string;
  /**
   * Should the label be hidden or visible?
   */
  hideLabel?: boolean;
  /**
   * The helper text to display next to the input
   * If not provided, the helper text will will not be displayed
   * If you want to change the placement of the helper text, you can provide a helperText object with the following properties:
   * text: The text to display
   * placement: The placement of the helper text (top or bottom)
   * */
  helperText?: HelperTextObject | string;
  /**
   * The status of the input (not providing a value or setting the value to '' or 'default' will all return a default status)
   **/
  status?: ComponentStatuses;
  /**
   * If the status requires a message, this is the message to display
   * */
  statusMessage?: string;
  /**
   * The input options (for inputs that support it)
   * If no value is provided, the label will be the value
   * @default []
   */
  options?: unknown[];
  /**
   * Can the input accept multiple values?
   */
  multiple?: boolean;
  /**
   * Width of the container
   * @default '100%'
   */
  width?: string;
  /**
   * min-width of the container
   * @default 'auto'
   */
  minWidth?: string;
  /**
   * max-width of the container
   * @default 'auto'
   * */
  maxWidth?: string;
  /**
   * If it's a textarea, this is the number of rows
   */
  rows?: number;
}

const cx = classNames.bind(styles);

/* Render component */
export const InputFactory: React.FC<Props> = ({
  name = '',
  id,
  type = 'text',
  testID,
  labelText,
  hideLabel,
  helperText,
  status,
  statusMessage,
  options = [],
  multiple,
  rows,
  required,
  disabled,
  className,
  width = '100%',
  minWidth = 'max-content',
  maxWidth = '100%',
  ...props
}) => {
  const generateID = testID || id || generateId(name, type);

  const inputProps = {
    name,
    id: generateID,
    multiple,
    rows,
    status: status || 'default',
    width,
    ...props
  };

  let normalizedOptions = options;

  if (options[0] && typeof options[0] === 'object') {
    const opts = options as InputOption[];
    normalizedOptions = opts.map((option) => {
      if (option.value) {
        return option;
      }
      return {
        ...option,
        value: option.label
      };
    });
  }

  const helpText =
    typeof helperText === 'string' ? helperText : helperText?.text;

  const helpTextPosition =
    typeof helperText === 'string' ? 'top' : helperText?.placement;

  return (
    <div
      data-testid={`${generateID}-container`}
      className={cx(
        styles['input-container'],
        status && styles[`status-${status}`],
        required && styles['required'],
        disabled && styles['disabled'],
        className
      )}
      style={{
        width,
        minWidth,
        maxWidth
      }}
    >
      {!hideLabel && (
        <InputLabel labelText={labelText} required={required} id={generateID} />
      )}
      {helperText && helpTextPosition === 'top' && (
        <div className={styles['helper-text-top']}>{helpText}</div>
      )}
      <>{renderInput(type, inputProps, labelText, normalizedOptions)}</>
      {helperText && helpTextPosition === 'bottom' && (
        <div className={styles['helper-text-bottom']}>{helpText}</div>
      )}
      {statusMessage && (
        <div className={styles['status-message']}>{statusMessage}</div>
      )}
    </div>
  );
};

InputFactory.displayName = 'InputFactory';

export default InputFactory;
