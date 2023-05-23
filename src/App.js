import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        const {quantity} = eachProduct
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: quantity + 1}
        }
        return eachProduct
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        const {quantity} = eachProduct
        if (eachProduct.id === id) {
          if (eachProduct.quantity > 1) {
            return {...eachProduct, quantity: quantity - 1}
          }
          this.removeCartItem(eachProduct.id)
        }
        return eachProduct
      }),
    }))
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    let isNotSameProduct = true
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (eachProduct.id === product.id) {
            isNotSameProduct = false
            const {quantity} = eachProduct
            return {...eachProduct, quantity: quantity + product.quantity}
          }
          return eachProduct
        }),
      }),
      () => {
        if (isNotSameProduct) {
          this.setState(prevState => ({
            cartList: [...prevState.cartList, product],
          }))
        }
      },
    )
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachProduct => eachProduct.id !== id),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
