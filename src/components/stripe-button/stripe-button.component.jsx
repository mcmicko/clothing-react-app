import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_yhk1dQcnuuxtZJegG51v0lmC00LXKyUhWQ'

  const onToken = token => {
    console.log(token)
    alert('payment success')
  }
  return (
    <StripeCheckout 
      label='Play Now'
      billingAddress
      shippingAddress
      image='http://svgshare.com/i/CUz.svg'
      description={`your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
