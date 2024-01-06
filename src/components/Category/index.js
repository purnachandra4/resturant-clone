import {BiFoodTag} from 'react-icons/bi'
import './index.css'
import CartContext from '../../context/CartContext'

const Category = props => {
  const {nextComponent, onDecreaseIncrease} = props

  const updateComponent = nextComponent.map(each => ({
    addonCat: each.addonCat,
    dishQuantity: each.dishQuantity,
    dishAvailability: each.dish_Availability,
    dishType: each.dish_Type,
    dishCalories: each.dish_calories,
    dishCurrency: each.dish_currency,
    dishDescription: each.dish_description,
    dishId: each.dish_id,
    dishImage: each.dish_image,
    dishName: each.dish_name,
    dishPrice: each.dish_price,
  }))

  return (
    <CartContext.Consumer>
      {context => {
        const {addCartItem} = context

        const onAddToCartBtn = dishId => {
          addCartItem(dishId, updateComponent)
        }

        const onAddToCart = (dishId, operator) => {
          onDecreaseIncrease(dishId, operator)
        }

        return (
          <ul className="dish">
            {updateComponent.map(each => (
              <li key={each.dishId} className="list_dish">
                <div className="item_details">
                  {each.dishType === 2 ? (
                    <BiFoodTag className="veg" />
                  ) : (
                    <BiFoodTag className="non_veg" />
                  )}
                  <div className="sub_details">
                    <h1 className="heading">{each.dishName}</h1>

                    <p>
                      {each.dishCurrency} {each.dishPrice}
                    </p>

                    <p className="description_details">
                      {each.dishDescription}
                    </p>
                    {each.dishAvailability ? (
                      <div className="button_style">
                        <button
                          type="button"
                          className="button_value"
                          onClick={() => onAddToCart(each.dishId, 'decrement')}
                        >
                          -
                        </button>
                        <p>{each.dishQuantity}</p>
                        <button
                          type="button"
                          className="button_value"
                          onClick={() => onAddToCart(each.dishId, 'increment')}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <p className="not_available">Not available</p>
                    )}
                    {each.addonCat.length === 0 ? null : (
                      <p className="customise">Customizations available</p>
                    )}
                    {each.dishAvailability && each.dishQuantity > 0 ? (
                      <button
                        type="button"
                        className="addToCartButton"
                        onClick={() => onAddToCartBtn(each.dishId)}
                      >
                        ADD TO CART
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="image_list">
                  <p className="calories">{`${each.dishCalories} calories`}</p>
                  <img
                    src={each.dishImage}
                    alt={each.dishName}
                    className="dish_image"
                  />
                </div>
              </li>
            ))}
          </ul>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Category
