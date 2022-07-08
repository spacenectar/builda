import React from 'react';

/* Import Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * Text to display in the component.
   */
  text: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Render component */
export const %PASCAL_CASE%: React.FC<Props> = ({ text, ...props }: Props) => {
  return (
    <div className={styles['%KEBAB_CASE%']} {...props}>
      {text}
    </div>
  );
};

export default %PASCAL_CASE%;
