import React from 'react';

/* Stylesheet */
import styles from './styles.module.scss';

/* Types */
interface Props extends React.ComponentProps<'div'> {
  /**
   * The component text
   */
  text: string;
}


/** 
* The %SENTENCE_CASE% %TYPE%
*/
export const %PASCAL_CASE%: React.FC<Props> = ({
  text = 'Made with Builda',
  className,
  ...props
}: Props) => {

  return (
    <div className={`${styles['%KEBAB_CASE%']} ${className}`} {...props}>
      <div className={styles['builda-tag']}>{text}</div>
    </div>
  );
};

%PASCAL_CASE%.displayName = '%PASCAL_CASE%'

export default %PASCAL_CASE%;
export type { Props };
