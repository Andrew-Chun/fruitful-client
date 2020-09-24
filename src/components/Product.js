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
    // <div class="card">
    //   <img class="card-img-top" src="..." alt="Card image cap">
    //   <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    //     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    //   </div>
    // </div>
    <div style={productStyles} className="card">
      <img style={imageStyles} src={props.image} alt='Product' width='125' height='125' />
      <div className="card-body">
        <h2 className="fruit-name">{props.name}</h2>
        <p style={{ maxWidth: '250px' }}>Description: {props.description}</p>
        <p>Price: ${props.price}</p>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn-add" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product
