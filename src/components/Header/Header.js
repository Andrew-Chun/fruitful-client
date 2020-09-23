import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#cart">Cart</Nav.Link>
    <Nav.Link href="#past-orders">Past Orders</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#products">Products</Nav.Link>
  </Fragment>
)

const navbarStyle = {
  backgroundColor: '#fabea7'
}

const navbarBrandStyle = {
  fontfamily: 'Suez One, serif',
  fontSize: '30px'
}

const logoStyle = {
  borderRadius: '60%',
  marginLeft: '25px',
  marginRight: '5px'
}

const Header = ({ user }) => (
  <Navbar style={navbarStyle} variant="dark" expand="md">
    <Navbar.Brand style={navbarBrandStyle} href="#">
      <img src={'https://i.imgur.com/2d8Wu60.jpg'} style={logoStyle} height="50px" />
      Fruitful
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
