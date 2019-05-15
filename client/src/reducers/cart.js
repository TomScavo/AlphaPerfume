import {
  ADD_SHOPPING_CART,
  ADD_SHOPPING_CART_FAIL,
  GET_CART,
  GET_CART_FAIL,
  RESET_CART_LOADING,
  CHANGE_CART_AMOUNT,
  CHANGE_CART_AMOUNT_FAIL,
  DELETE_CAR
} from '../actions/types';

const initialState = {
  items: [],
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RESET_CART_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SHOPPING_CART:
      return {
        ...state
      };
    case ADD_SHOPPING_CART_FAIL:
    case GET_CART_FAIL:
      return {
        items: [],
        isLoading: false
      };
    case GET_CART:
      return {
        ...state,
        isLoading: false,
        items: payload.items
      };
    case CHANGE_CART_AMOUNT:
    case DELETE_CAR:
      return {
        ...state,
        isLoading: false,
        items: payload.cart.items
      };
    case CHANGE_CART_AMOUNT_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
