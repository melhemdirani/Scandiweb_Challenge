

const INITIAL_STATE = {
  currency: "0",
  currencies : ["$", "£", "A$", "¥", "₽"]
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload
      };
    default:
      return state;
  }
};

export default currencyReducer; 