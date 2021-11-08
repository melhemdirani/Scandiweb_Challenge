//import SearchActionTypes from "./dates.types";

const INITIAL_STATE = {
  category: "",
  categoryIndex: 0,
  product: 0
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload
      };
    case 'SET_CATEGORY_INDEX':
      return {
        ...state,
        categoryIndex: action.payload
      };
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer; 
