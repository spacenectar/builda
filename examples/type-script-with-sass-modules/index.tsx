import React from 'react'

interface Props {
  name: string
  colour: string
}

import styles from './styles.module.sass'



const TypeScriptWithSassModules: React.FunctionComponent<Props> = ({ name, colour }: Props) =>
  <div className={styles[colour]}>
    This is an example component, the name provided to it was {name}
  </div>


export default TypeScriptWithSassModules