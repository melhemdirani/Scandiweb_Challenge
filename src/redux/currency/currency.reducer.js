

const INITIAL_STATE = {
  currency: "0",
  currencies : ["$", "£", "A$", "¥", "₽"],
  showCurrencies: false
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload
      };
    case 'TOGGLE_CURRENCIES':
      return {
        ...state,
        showCurrencies: !state.showCurrencies
      };
    case 'HIDE_CURRENCIES':
      return {
        ...state,
        showCurrencies: false
      };
    default:
      return state;
  }
};

export default currencyReducer; 