import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig'

const Product = (props) => {
  const handleAddtoCart = (event) => {
    if (props.token) {
      props.cart.products.push(props.productId)

      axios({
        method: 'PATCH',
        url: apiUrl + `/orders/${props.cart._id}`,
        headers: {
          'Authorization': `Bearer ${props.token}`
        },
        data: {
          order: props.cart
        }
      })
        .then(() => {
          props.msgAlert({
            heading: 'Added to Cart',
            message: `Successfully added "${props.name}" to cart`,
            variant: 'success'
          })
        })
        .catch(() => {
          props.msgAlert({
            heading: 'Adding product failed',
            message: 'Adding product to the cart failed',
            variant: 'danger'
          })
        })
    } else {
      props.msgAlert({
        heading: 'Not Signed In',
        message: 'Please Sign In to Add Products to Your Cart',
        variant: 'danger'
      })
    }
  }

  const productStyles = {
    border: '3px solid black',
    margin: '10px auto',
    padding: '5px',
    width: '300px'
  }

  const imageStyles = {
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  }

  return (
    <div style={productStyles}>
      <img style={imageStyles} src={props.image} alt='Product' width='250' height='250' />
      <h2 className="fruit-name">{props.name}</h2>
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
      <button onClick={handleAddtoCart}>Add to Cart</button>
    </div>
  )
}

export default Product
