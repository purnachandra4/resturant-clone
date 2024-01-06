import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = props => (
  <CartContext.Consumer>
    {countValue => {
      const {
        cartList,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
      } = countValue

      const {location} = props
      const {state} = location
      const cartLength = cartList.length

      const onDecrement = id => {
        decrementCartItemQuantity(id)
      }

      const onIncrement = id => {
        incrementCartItemQuantity(id)
      }
      const onRemoveSeparate = id => {
        removeCartItem(id)
      }

      const removeAllCart = () => {
        removeAllCartItems()
      }

      const renderCartListView = () => (
        <div className="mainCartContainer">
          <button
            type="button"
            className="removeButton"
            onClick={removeAllCart}
          >
            Remove All
          </button>
          <ul className="unOrderList">
            {cartList.map(each => (
              <li className="listItem" key={each.dishId}>
                <div className="detailsList">
                  <img
                    src={each.dishImage}
                    alt={each.dishName}
                    className="dishImage"
                  />
                  <div className="detailsDiv">
                    <p className="dishName">{each.dishName}</p>
                  </div>
                </div>
                <div className="quantityAdjst">
                  <button
                    type="button"
                    className="buttonOperation"
                    onClick={() => onDecrement(each.dishId)}
                  >
                    -
                  </button>
                  <p className="quantity">{each.dishQuantity}</p>
                  <button
                    type="button"
                    className="buttonOperation"
                    onClick={() => onIncrement(each.dishId)}
                  >
                    +
                  </button>
                </div>
                <div className="priceContainer">
                  <p>SAR {each.dishQuantity * each.dishPrice} -/</p>
                </div>
                <button
                  type="button"
                  className="removeButton"
                  onClick={() => onRemoveSeparate(each.dishId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )

      const renderEmptyView = () => (
        <div className="emptyViewContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            className="emptyCartView"
            alt="emptyView"
          />
          <p>Your Cart is Empty</p>
        </div>
      )

      return (
        <>
          <Header restaurantName={state} />
          {cartLength === 0 ? renderEmptyView() : renderCartListView()}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
