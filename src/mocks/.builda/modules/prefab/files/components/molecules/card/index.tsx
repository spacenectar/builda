import React, { JSXElementConstructor, ReactNode } from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

// Import child components
import CardBody from './components/card-body';
import CardHeader from './components/card-header';
import CardFooter from './components/card-footer';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * If true, it will disable the background colour, rendering a transparent card.
   * @default false
   */
  noBg?: boolean;
  /**
   * If true, it will disable the border radius
   * @default false
   */
  noBorderRadius?: boolean;
  /**
   * Should children have default styles applied to them?
   * @default true
   */
  defaultStyling?: boolean;
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
  Footer: typeof CardFooter;
}

// Render component
export const Card: ComponentProps = ({
  noBg,
  noBorderRadius,
  vSpacing,
  hSpacing,
  children,
  className,
  ...props
}: Props) => {
  // As we can't support unlimited children, we need to specify a limit
  // The limit is the number of children that can be accomodated via the css

  const cardChildren = React.Children.toArray(children)
    .filter((child) => {
      // Only return children which are React elements
      return React.isValidElement(child);
    })
    .map(
      (child) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- We know this is a valid element
        child.type.displayName
    );

  const hasHeader =
    cardChildren.includes('CardHeader') && !cardChildren.includes('CardFooter');
  const hasFooter =
    cardChildren.includes('CardFooter') && !cardChildren.includes('CardHeader');
  const hasBoth =
    cardChildren.includes('CardHeader') && cardChildren.includes('CardFooter');

  return (
    <article
      className={cx(
        styles['card'],
        noBg && styles['no-bg'],
        noBorderRadius && styles['no-border-radius'],
        hasHeader && styles['has-header'],
        hasFooter && styles['has-footer'],
        hasBoth && styles['has-header-and-footer'],
        vSpacing && styles['v-spacing'],
        hSpacing && styles['h-spacing'],
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};

Card.displayName = 'Card';

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

export type CardProps = Props;
