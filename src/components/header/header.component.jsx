import React from 'react'
import {Link} from 'react-router-dom';

import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg'

import {auth} from '../../firebase/firebease.utils'

const Header = ({currentUser}) => {
  return (
    <div className='header'>
      <Link to='/'><Logo className='logo'/></Link>
      <div className="options">
        <Link className='option' to='/shop'>shop</Link>
        <Link className='option' to='/shop'>contact</Link>
        {currentUser ?  (
          <div className='option' onClick={() => auth.signOut()}>Sign Out</div>) : (
          <Link className='option' to='/signin'>signin</Link>
        )}
      </div>
    </div>
  )
}

export default Header
