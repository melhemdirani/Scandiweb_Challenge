const INITIAL_STATE = {
  attributeShown: "",
  allowHideAttribute: true
};

const attributeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_ATTRIBUTE':
      return {
        ...state,
        attributeShown: action.payload
      };
    case 'ALLOW_HIDE_ATTRIBUTE':
      return {
        ...state,
        allowHideAttribute: true
      };
    case 'DISALLOW_HIDE_ATTRIBUTE':
      return {
        ...state,
        allowHideAttribute: false
      };
    default:
      return state;
  }
};

export default attributeReducer; 