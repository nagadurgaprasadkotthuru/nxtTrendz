import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalAmount = 0
      if (showEmptyView === false) {
        cartList.map(eachCartItem => {
          const {quantity, price} = eachCartItem
          const amount = quantity * price
          totalAmount += amount
          return null
        })
      }
      console.log(totalAmount)
      const renderOrderTotalView = () => (
        <div className="order-total-container">
          <div>
            <h4 className="order-total-heading">
              Order Total:{' '}
              <span className="order-total-span">Rs {totalAmount}/-</span>
            </h4>
            <p className="items-in-cart-description">
              {cartList.length} Items in cart
            </p>
          </div>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveAllCartItems = () => removeAllCartItems()
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-button"
                  type="button"
                  onClick={onRemoveAllCartItems}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                {renderOrderTotalView()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
