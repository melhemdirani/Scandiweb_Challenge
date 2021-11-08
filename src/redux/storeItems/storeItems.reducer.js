
const INITIAL_STATE = {
  storeItems: {}
};

const storeItemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_STORE_ITEMS':
      return {
        ...state,
        storeItems: action.payload
      };
    default:
      return state;
  }
};

export default storeItemsReducer; 