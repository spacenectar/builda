import React from 'react'

// Import Stylesheet 
import styles from './styles.module.scss'

// Import Types
import Props from './types/props'

// Render component
export const MyExampleComponent: React.FC<Props> = ({ name }: Props) =>
  <div className={styles['my-example-component']}>
    This is an example component, the name provided to it was {name}
  </div>

export default MyExampleComponent
