import React from 'react';

/** 
* The %SENTENCE_CASE% %TYPE%
*/
export const %PASCAL_CASE% = ({text, className, ...props}) => {
  return (
    <div className={`'%KEBAB_CASE%' ${className}`} {...props}>
      {text}
    </div>
  );
};

%PASCAL_CASE%.displayName = '%PASCAL_CASE%';
%PASCAL_CASE%.defaultProps = {
  text: 'Made with Builda',
};

export default %PASCAL_CASE%;
