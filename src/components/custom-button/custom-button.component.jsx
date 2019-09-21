import React from 'react'

import './custom-button.styles.scss';

const CusstomButton = ({children, isGoogleSignIn,inverted, ...otherProps}) => {
  return (
    <button className={`${inverted ? 'inverted' : ''} 
    ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
      {children}
    </button>
  )
}

export default CusstomButton
