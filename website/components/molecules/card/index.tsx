import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

// Import child components
import CardBody from './components/card-body';
import CardHeader from './components/card-header';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * If true, it will disable the background colour, rendering a transparent card.
   * @default false
   */
  noBg?: boolean;
  /**
   * If true, it will disable the drop shadow
   * @default false
   */
  noShadow?: boolean;
  /**
   * If true, it will disable the border radius
   * @default false
   */
  noBorderRadius?: boolean;
  /**
   * Include vertical spacing around the card
   * @default false
   */
  vSpacing?: boolean;
  /**
   * Include horizontal spacing around the card
   * @default false
   */
  hSpacing?: boolean;
  /**
   * The children of the component
   */
  children: React.ReactNode;
}

interface ComponentProps extends React.FC<Props> {
  Body: typeof CardBody;
  Header: typeof CardHeader;
}

// Render component
export const Card: ComponentProps = ({
  noBg,
  noShadow,
  noBorderRadius,
  vSpacing,
  hSpacing,
  children,
  className,
  ...props
}: Props) => {
  // As we can't support unlimited children, we need to specify a limit
  // The limit is the number of children that can be accomodated via the css

  const childLimit = 2;
  const childCount = React.Children.count(children);

  if (childCount > childLimit) {
    throw new Error(
      `A maximum of ${childLimit} children are supported by the Card component,
      please reduce the number of children or add support to the component itself.`
    );
  }

  return (
    <div
      className={cx(
        styles['card'],
        noBg && styles['no-bg'],
        noShadow && styles['no-shadow'],
        noBorderRadius && styles['no-border-radius'],
        vSpacing && styles['v-spacing'],
        hSpacing && styles['h-spacing'],
        styles[`with-${childCount}-rows`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;

export type CardProps = Props;
