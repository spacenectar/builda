import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export interface Props {
  /**
   * The id of the Input element
   */
  id?: string;
  /**
   * The label of the Input element
   */
  labelText: string;
  /**
   * Is the input required?
   */
  required?: boolean;
  /**
   * Is this a simulated label?
   */
  simulated?: boolean;
  /**
   * If the label should look like a legend, set this to true
   */
  largeLabel?: boolean;
  /**
   * A custom classname to apply to the label
   */
  className?: string;
}

// Render component
export const InputLabel: React.FC<Props> = ({
  id,
  labelText,
  required,
  simulated,
  largeLabel,
  className
}: Props) => {
  // If simulated the label should render as a span otherwise it should render as a label

  const RequiredFlag = (
    <span className={styles['asterisk']} title="This field is required">
      *&nbsp;
    </span>
  );

  if (simulated) {
    return (
      <span
        className={cx(
          styles['label'],
          largeLabel ? styles['large'] : '',
          className
        )}
      >
        {required ? RequiredFlag : null}
        {labelText}
      </span>
    );
  }
  return (
    <label
      data-testid={`${id}-label`}
      className={cx(
        styles['label'],
        largeLabel ? styles['large'] : '',
        className
      )}
      htmlFor={id}
    >
      {required ? RequiredFlag : null}
      {labelText}
    </label>
  );
};

InputLabel.displayName = 'InputLabel';

export default InputLabel;
