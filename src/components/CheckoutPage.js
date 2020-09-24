import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../apiConfig'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutPage = (props) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const { subtotal, items, orderId, token } = props.redirectState.location.state
  const { history } = props.redirectState
  const { msgAlert } = props
  const tax = Math.round((subtotal * 0.075) * 100) / 100
  const total = subtotal + tax

  const [backToCart, setBackToCart] = useState(false)

  const archiveAndCreateOrder = () => {
    axios({
      method: 'PATCH',
      url: apiUrl + `/orders/${orderId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        order: {
          active: false
        }
      }
    })
      .then(() => createNewOrder())
      .then(() => history.push('/past-orders'))
      .catch(console.error)
  }

  const createNewOrder = () => {
    axios({
      method: 'POST',
      url: apiUrl + '/orders',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .catch(console.error)
  }

  useEffect(() => {
    axios({
      method: 'POST',
      url: apiUrl + '/create-payment-intent',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        amount: total
      }
    })
      .then(data => {
        setClientSecret(data.data.clientSecret)
      })
  }, [])

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    })
    if (payload.error) {
      setError(`Payment failed. ${payload.error.message}`)
      setProcessing(false)
      msgAlert({
        heading: 'Payment Failed',
        message: payload.error.message,
        variant: 'danger'
      })
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      msgAlert({
        heading: 'Payment Successful',
        message: 'Your order payment has been received',
        variant: 'success'
      })
      archiveAndCreateOrder()
    }
  }

  const toCart = (event) => {
    setBackToCart(true)
  }

  if (backToCart) {
    return <Redirect to='/cart' />
  }

  const itemStyle = {
    margin: 'auto',
    maxWidth: '50vw',
    listStyleType: 'none',
    textAlign: 'center',
    border: '1px solid black'
  }

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  }

  const poweredMessageStyling = {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '13px'
  }

  const disclaimerStyling = {
    color: 'red',
    display: 'block',
    width: '50vw',
    margin: '10px auto',
    textAlign: 'center',
    fontSize: '12px'
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Checkout</h1>
      <button className="btn-checkout" onClick={toCart}>Back to Cart</button>
      <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
      <div style={{ marginBottom: '20px' }}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div style={itemStyle}>
              <img src={item.image} alt='Product' width='150' height='150' />
              <h3 className="fruit-name">{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <p style={{ textAlign: 'right' }}>Subtotal: ${subtotal.toFixed(2)}</p>
      <p style={{ textAlign: 'right' }}>Sales Tax (7.5%): ${tax.toFixed(2)}</p>
      <h4 style={{ textAlign: 'right', fontweight: 'bold' }}>Order Total: ${total.toFixed(2)}</h4>
      <br />
      <p style={disclaimerStyling}>Disclaimer: Payments are for demonstration purposes only. To complete your demo payment, please use the following card number: 4242 4242 4242 4242. <br />
      Any Exp. Date, CVC, and ZIP may be used.</p>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button className="stripe-button"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (<div className="spinner" id="spinner"></div>) : ('Pay')}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && <div className="card-error" role="alert"> {error}</div>}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment Succeeded
        </p>
      </form>
      <p style={poweredMessageStyling}>Payment Powered by Stripe</p>
    </div>
  )
}

export default withRouter(CheckoutPage)
