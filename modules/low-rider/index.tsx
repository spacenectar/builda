import React from 'react';


/* Import Types */
interface Props 
extends React.ComponentProps<'div'> {
  /**
   * The component text
   */
  text: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Render component */
export const %PASCAL_CASE%: React.FC<Props> = ({
  text = 'No text provided',
  className,
  ...props
}: Props) => {

  return (
    <div className={`${styles['%KEBAB_CASE%']} ${className}`} {...props}>{text}</div>
  );
};

export default %PASCAL_CASE%;
export type { Props };