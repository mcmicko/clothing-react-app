import React from 'react'

import './custom-button.styles.scss';

const CusstomButton = ({children, ...otherProps}) => {
  return (
    <div className='custom-button' {...otherProps}>
      {children}
    </div>
  )
}

export default CusstomButton
