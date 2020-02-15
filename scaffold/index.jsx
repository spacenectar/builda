import React from 'react'

%styleimport%

const %ComponentExample% = ({name, colour}) => {
    <div className={`example style-${colour}`}>
        This is an example component, the name provided to it was {name}
    </div>
}

export default %ComponentExample%