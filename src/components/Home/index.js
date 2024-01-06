import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Category from '../Category'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    status: apiStatusConstants.initial,
    restaurantName: '',
    listMenu: [],
    valueCheck: '',
  }

  componentDidMount() {
    this.getApi()
  }

  getApi = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const dishesApiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(dishesApiUrl)
    const data = await response.json()
    const restaurantName = data[0].restaurant_name
    const tableMenuList = data[0].table_menu_list
    const dishQuantityAdd = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(cate => ({
        ...cate,
        dishQuantity: 0,
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
    }))
    this.setState({
      listMenu: dishQuantityAdd,
      restaurantName,
      valueCheck: dishQuantityAdd[0].menuCategory,
      status: apiStatusConstants.success,
    })
  }

  onChooseList = value => {
    this.setState({valueCheck: value})
  }

  onIncreaseDecreaseCount = (dishId, operator) => {
    const {listMenu} = this.state
    const finalValue = listMenu.map(each => ({
      ...each,
      categoryDishes: each.categoryDishes.map(eachDish => {
        if (eachDish.dish_id === dishId) {
          if (operator === 'decrement' && eachDish.dishQuantity > 0) {
            return {
              ...eachDish,
              dishQuantity: eachDish.dishQuantity - 1,
            }
          }
          if (operator === 'increment') {
            return {
              ...eachDish,
              dishQuantity: eachDish.dishQuantity + 1,
            }
          }
        }
        return eachDish
      }),
    }))
    this.setState({listMenu: finalValue})
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {listMenu, valueCheck,restaurantName} = this.state
    const filteredDishes = listMenu.filter(
      each => each.menuCategory === valueCheck,
    )
    return (
      <>
        <Header restaurantName={restaurantName} />
        <ul className="menu_container">
          {listMenu.map(each => (
            <li key={each.menuCategoryId}>
              <button
                type="button"
                className={
                  each.menuCategory === valueCheck
                    ? 'chosen-button'
                    : 'category-button'
                }
                onClick={() => this.onChooseList(each.menuCategory)}
              >
                {each.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        {filteredDishes.map(each => (
          <Category
            nextComponent={each.categoryDishes}
            key={each.menuCategoryId}
            onDecreaseIncrease={this.onIncreaseDecreaseCount}
          />
        ))}
      </>
    )
  }

  render() {
    const {restaurantName, status} = this.state

    return (
      <>
      
        {status === apiStatusConstants.inProgress
          ? this.renderLoader()
          : this.renderSuccessView()}
      </>
    )
  }
}

export default Home
