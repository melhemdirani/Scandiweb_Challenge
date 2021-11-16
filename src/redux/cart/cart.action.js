
export const toggleCart = () => ({
  type: 'TOGGLE_CART'
});


export const closeCart = () => ({
  type: 'CLOSE_CART'
});

export const addItem = item => ({
  type: 'ADD_ITEM',
  payload: item
});

export const removeItem = item => ({
  type: 'REMOVE_ITEM',
  payload: item
});

export const setTotal = total => ({
  type: 'SET_TOTAL',
  payload: total
});
export const setTotalQuantity = totalQuantity => ({
  type: 'SET_TOTAL_QUANTITY',
  payload: totalQuantity
});

export const setAttributesCount = count => ({
  type: 'SET_ATTRIBUTES_COUNT',
  payload: count
});





