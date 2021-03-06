import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import ProductPage from '../ProductPage'
import Cart from '../Cart'
import CheckoutPage from '../CheckoutPage'
import PastOrderPage from '../PastOrderPage'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51HUItQLJAFogWuoYuQebKvmwfoHmcU5JtsTQuswRAaZT5a6QrjAAwfHZL22amI6A7NWT7cpwDtKCJcH4aGuOA8c200dWnM43v9')

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Elements stripe={stripePromise}>
          <Header user={user} />
          {msgAlerts.map((msgAlert, index) => (
            <AutoDismissAlert
              key={index}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
            />
          ))}
          <main className="container">
            <Route exact path='/' render={() => (
              <Redirect to='/products'/>
            )}/>
            <Route path='/sign-up' render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route user={user} path="/products" render={() => (
              <ProductPage token={user ? user.token : null} msgAlert={this.msgAlert} />
            )} />
            <AuthenticatedRoute user={user} path="/past-orders" render={() => (
              <PastOrderPage token={user.token} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/cart' render={() => (
              <Cart token={user.token} msgAlert={this.msgAlert}/>
            )} />
            <AuthenticatedRoute user={user} path='/checkout' render={(componentProps) => (
              <CheckoutPage redirectState={componentProps} user={user} msgAlert={this.msgAlert} />
            )} />
          </main>
        </Elements>
      </Fragment>
    )
  }
}

export default App
