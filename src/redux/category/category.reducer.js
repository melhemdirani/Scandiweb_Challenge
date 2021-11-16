//import SearchActionTypes from "./dates.types";

const INITIAL_STATE = {
  categoryIndex: 3,
  product: 0
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_INDEX':
      return {
        ...state,
        categoryIndex: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer; 
