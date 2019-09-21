import React from 'react'
import './cart-icon.styles.scss'
import {connect} from 'react-redux'

import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'

const CartIcon = ({toggleCartHidden, itemCount}) => {
  return (
    <div className='shopping-icon' onClick={toggleCartHidden}>
      <ShoppingIcon />
      <span className='item-icon'>{itemCount}</span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
