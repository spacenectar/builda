import React from 'react'

/* Define Types */
interface Props {
  /**
   * The name of the thing
   */
  name: string
  /**
   * The colour of the thing
   */
  colour: string
}

/* Import Stylesheet */
%styleimport%
/* Render component */
export const %ComponentExample%: React.FC<Props> = ({ name, colour }: Props) =>
  <div className={%classes%}>
    This is an example component, the name provided to it was {name}
  </div>

export default %ComponentExample%
