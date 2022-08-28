import React from 'react';
import classNames from 'classnames';

// Import components
import { Spinner, Icons } from 'components';

/* Define available presets here */

type PresetIcon = 'refresh' | 'delete' | 'add' | 'edit' | 'close';

/* Import Types */
export interface Props extends React.ComponentProps<'button'> {
  /**
   * The button label
   */
  label?: string;
  /**
   * The if you want to include an icon, this specifies the side of the button the icon should appear on.
   */
  alignIcon?: 'left' | 'right' | 'center';
  /**
   * If the icon should be on it's own with no visible text, set this property to `true`.
   * Note: The label prop must still be provided for accessibility purposes.
   **/
  iconOnly?: boolean;
  /**
   * The id to appy to the button for unique identification in tests.
   */
  testID?: string;
  /**
   * Is this a submit button?
   */
  submit?: boolean;
  /**
   * Is this a reset button?
   */
  reset?: boolean;
  /**
   * Optional button type.
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'create'
    | 'destroy'
    | 'text'
    | 'text-create'
    | 'text-destroy';
  /**
   * Use a button preset.
   */
  preset?: PresetIcon;
  /**
   * Should the button fill the width of it's container?
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Is the button rectangular or circular?
   * @default false (rectangular)
   */
  circular?: boolean;
  /**
   * Is the button active?
   */
  active?: boolean;
  /**
   * Shows a loading indicator instead of text.
   */
  loading?: boolean;
  /**
   * The loading indicator to be read out for accessability.
   * @default "Loading"
   */
  loadingIndicator?: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const presetIcon = (preset: PresetIcon) => {
  switch (preset) {
    case 'refresh':
      return <Icons.Refresh />;
    case 'delete':
      return <Icons.Delete />;
    case 'add':
      return <Icons.Add />;
    case 'edit':
      return <Icons.Edit />;
    case 'close':
      return <Icons.Close />;
    default:
      return null;
  }
};

/**
 * The Button component allows a user to place a button on the page.
 */
export const Button: React.FC<Props> = ({
  label = '',
  alignIcon,
  iconOnly,
  testID,
  submit,
  reset,
  preset,
  fullWidth,
  loading,
  loadingIndicator,
  children,
  className,
  disabled,
  variant = 'primary',
  circular = false,
  active = false,
  ...props
}: Props) => {
  const buttonType = (): 'button' | 'submit' | 'reset' | undefined => {
    if (submit) {
      return 'submit';
    }
    if (reset) {
      return 'reset';
    }
    return 'button';
  };
  return (
    <button
      data-testid={testID}
      aria-label={label || undefined}
      type={buttonType()}
      className={cx(
        styles['button'],
        alignIcon && styles[`icon-${alignIcon}`],
        iconOnly && styles[`icon-only`],
        fullWidth && styles['full-width'],
        {
          [styles[`button-${variant}` || '']]: variant,
          [styles['loading']]: loading
        },
        circular && styles['circular'],
        active && styles['active'],
        className
      )}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled || loading}
      {...props}
    >
      {!loading && (
        <>
          {preset && presetIcon(preset)}
          {!iconOnly && label}
          {children}
        </>
      )}
      {loading && (
        <>
          <Spinner fill="#fff" />
          <span>{loadingIndicator || 'Loading...'}</span>
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  loadingIndicator: 'Loading'
};

Button.displayName = 'Button';

export default Button;
