import React from 'react'

const PastOrder = (props) => {
  let totalCost = 0
  props.products.forEach(product => {
    totalCost += product.price
  })

  const costStyle = {
    marginTop: '20px',
    marginBottom: '5px',
    fontSize: '20px',
    textAlign: 'right'
  }

  const nameStyle = {
    marginBottom: '2px',
    fontSize: '25px'
  }

  const descriptionStyle = {
    marginBottom: '5px'
  }

  const productBoxStyle = {
    border: '1px solid black',
    padding: '5px',
    marginBottom: '8px',
    width: '50vw',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  const dateStyle = {
    marginBottom: '10px'
  }

  const orderStyle = {
    border: '2px solid black',
    padding: '10px',
    marginBottom: '20px',
    width: '60vw',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  const productNewList = props.products.map((product, productIndex) => (
    <div key={productIndex} style={productBoxStyle}>
      <img src={product.image} alt='product' height='250' width='250'></img>
      <p className="fruit-name" style={nameStyle}>{product.name}</p>
      <p>${product.price}</p>
      <p style={descriptionStyle}>{product.description}</p>
    </div>
  ))

  return (
    <div style={orderStyle}>
      <h2>Fruitful</h2>
      <p style={dateStyle}>Order Date: {props.date}</p>
      <p>Invoice #: {props.invoice}</p>
      {productNewList}
      <p style={costStyle}>Total (including tax): ${(totalCost * 1.075).toFixed(2)}</p>
    </div>
  )
}

export default PastOrder
