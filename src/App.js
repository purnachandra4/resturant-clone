import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import CartContext from './context/CartContext'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = (dishId, nextComponent) => {
    const {cartList} = this.state

    const chosenId = nextComponent.find(each => each.dishId === dishId)
    const checkCart = cartList.find(each => each.dishId === chosenId.dishId)
    if (checkCart === undefined) {
      this.setState({
        cartList: [...cartList, chosenId],
      })
    } else {
      const checkList = cartList.map(each => {
        if (each.dishId === dishId) {
          return {
            ...each,
            dishQuantity: each.dishQuantity + chosenId.dishQuantity,
          }
        }
        return each
      })
      this.setState({
        cartList: checkList,
      })
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const increased = cartList.map(each => {
      if (each.dishId === id) {
        return {...each, dishQuantity: each.dishQuantity + 1}
      }
      return each
    })
    this.setState({cartList: increased})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const checkQuantity = cartList.find(each => each.dishId === id)
    if (checkQuantity.dishQuantity === 1) {
      const leftCartList = cartList.filter(each => each.dishId !== id)
      this.setState({cartList: leftCartList})
    } else {
      const decreased = cartList.map(each => {
        if (each.dishId === id) {
          return {...each, dishQuantity: each.dishQuantity - 1}
        }
        return each
      })
      this.setState({cartList: decreased})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const leftCartList = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: leftCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
