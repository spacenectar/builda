import React from 'react'

interface Props {
  name: string
  colour: string
}

%styleimport%const %ComponentExample%: React.FunctionComponent<Props> = ({ name, colour }: Props) =>
  <div className={`example style--${colour}`}>
    This is an example component, the name provided to it was {name}
  </div>


export default %ComponentExample%