import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  showCart: false,
  items: [],
  total: 0,
  totalQuantity: 0,
  attributesCount: 0
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_CART':
      return {
        ...state,
        showCart: !state.showCart
      };
    case 'CLOSE_CART':
      return {
        ...state,
        showCart: false
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: addItemToCart(state.items, action.payload)
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload)
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload
      };
    case 'SET_TOTAL_QUANTITY':
      return {
        ...state,
        totalQuantity: action.payload
      };
    case 'SET_ATTRIBUTES_COUNT':
      return {
        ...state,
        attributesCount: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer; 