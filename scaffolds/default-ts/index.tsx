import React from 'react';

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
    <div className={`'%KEBAB_CASE%' ${className}`} {...props}>
      {text}
    </div>
  );
};

%PASCAL_CASE%.displayName = '%PASCAL_CASE%'

export default %PASCAL_CASE%;
export type { Props };
