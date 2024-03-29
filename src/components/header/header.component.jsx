import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import {auth} from '../../firebase/firebease.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

const Header = ({currentUser, hidden}) => {
  return (
    <div className='header'>
      <Link to='/'><Logo className='logo'/></Link>
      <div className="options">
        <Link className='option' to='/shop'>shop</Link>
        <Link className='option' to='/contact'>contact</Link>
        {currentUser ?  (
          <div className='option' onClick={() => auth.signOut()}>Sign Out</div>) : (
          <Link className='option' to='/signin'>signin</Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : (
        <CartDropdown />
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
