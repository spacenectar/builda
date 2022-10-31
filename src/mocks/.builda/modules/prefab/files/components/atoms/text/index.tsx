import React from 'react';
import classNames from 'classnames';

/* Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Types */
interface Props {
  /**
   * The node to render the text in
   * @default 'p'
   */
  use?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /**
   * If you want to style the text as a different node type, you can pass in the node type here
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /**
   * The text to render (You can also use HTML here but it may not look as intended)
   */
  children: React.ReactNode;
  /**
   * You can make the text 1.5x smaller or 1.5x larger by passing the size prop
   * @default 'normal'
   */
  size?: 'xs' | 'sm' | 'normal' | 'lg' | 'xl';
  /**
   * Show a margin below the text (does not apply to the span node type)
   * @default true
   */
  showMargin?: boolean;
  /**
   * The custom class name to apply to the component
   */
  className?: string;
}

/**
 * The Text component is a wrapper component which allows you to display text strings in a consistent manner.
 */
export const Text: React.FC<Props> = ({
  use = 'p',
  as,
  children = '',
  size = 'normal',
  showMargin = true,
  className
}: Props) => {
  const Tag = use;
  return (
    <Tag
      className={cx(
        styles[`text-${as || use}`],
        styles[`size-${size}`],
        showMargin && styles['show-margin'],
        className
      )}
    >
      {children}
    </Tag>
  );
};

Text.displayName = 'Text';

export default Text;
export type { Props };
