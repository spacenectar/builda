import React from 'react'

%styleimport%
%typeString%
/* Render component */
export const %ComponentName%: React.FC<Props> = ({ name }: Props) =>
  <div className={%ComponentNameKebab%}>
    This is an example component, the name provided to it was {name}
  </div>

export default %ComponentName%
