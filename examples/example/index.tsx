import React from 'react'

// Import Stylesheet 
import styles from './styles.module.scss'

// Prop Types
export interface Props {
  // The name of the component
  name: string;
}

// Render component
export const Example: React.FC<Props> = ({ name }: Props) =>
  <div className={styles['example']}>
    This is an example component, the name provided to it was {name}
  </div>

export default Example
