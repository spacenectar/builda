import React from 'react'

import './styles.scss'

const ExampleComponent = ({name, colour}) => {
    <div className={`example style-${colour}`}>
        This is an example component, the name provided to it was {name}
    </div>
}

export default ExampleComponent