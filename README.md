# Fruitful Client Application
Fruitful is an ecommerce web application built using a React frontend framework with Stripe payment processing integrated into the platform.

Unregistered users are able to browse the selection of fruits on the site.

However, in order to add items to cart and proceed to checkout, users must sign in to authenticate their account. Once a successful purchase has been placed, users can view their past orders.

## Links
-   Deployed Client: https://andrew-chun.github.io/fruitful-client/
-   Fruitful API Repo: https://github.com/Andrew-Chun/fruitful-api
-   Deployed Fruitful API:  https://fruitful-api.herokuapp.com/

## Planning
I started by creating user stories and wireframes to get a general idea of what I wanted the application to function and look like. Then, I went to Stripe's documentation in order to integrate their payment processing into React. Once the backend api endpoints were connected to the front end via Axios calls, I went on to improve the styling/UI of the components.

### User Stories
-   As an unregistered user, I would like to sign up with email and password.
-   As a registered user, I would like to sign in with email and password.
-   As a signed in user, I would like to change password.
-   As a signed in user, I would like to sign out.
-   As an unregistered user, I would like to see all of the products.
-   As a signed in user, I would like to add and remove products from a shopping cart.
-   As a signed in user, I would like to purchase products in a shopping cart using Stripe.
-   As a signed in user, I would like to see all my past orders..

### List of Technologies Used
-   React.js
-   Stripe
-   Axios
-   Boostrap

## Images
App Screenshots:
![Fruitful Landing Page](https://i.imgur.com/V3XjKjG.png)
![Fruitful Checkout Page](https://i.imgur.com/A5JtzhG.png)

Wireframes:

[Landing Page](https://i.imgur.com/HpkGOIn.png)

[Checkout Page](https://i.imgur.com/YmH06WJ.png)

[Past Orders Page](https://i.imgur.com/geVR1nX.png)

## Future Iterations
-   Allowing users to add reviews for products

-   Adding quantity for products to add to cart

-   Searching for products by name
