import React from 'react'

/* Import Types */
import Props from './types/props'

/* Import Stylesheet */
%styleimport%
/* Render component */
export const %ComponentExample%: React.FC<Props> = ({ name, colour }: Props) =>
  <div className={%classes%}>
    This is an example component, the name provided to it was {name}
  </div>

export default %ComponentExample%
