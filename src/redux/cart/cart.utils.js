function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function attributesEqual(a,b) {
    let types = a.attributesTypes
    return(
    types.every((val) => a.attributes.[val] === b.attributes.[val])
    )
}

export const addItemToCart = (items, itemsToAdd) => {

    const existingItemsArray = items.find(
        item => arrayEquals(item.array, itemsToAdd.array)
    );
    const existingItemsAttributes = items.find(
        item => attributesEqual(item, itemsToAdd)
    );
    if(existingItemsArray && existingItemsAttributes) {
        return items.map(item => 
            arrayEquals(item.array, itemsToAdd.array) && attributesEqual(item, itemsToAdd)
            ? {...item, quantity: item.quantity + 1}
            : item
        )
    }
    return [ ...items, { ...itemsToAdd, quantity: 1}]
}

export const removeItemFromCart = (items, itemsToRemove) => {

    if(itemsToRemove.quantity === 1) {
        return items.filter(item => !attributesEqual(item, itemsToRemove) && !arrayEquals(items.array, itemsToRemove.array))
    }
    return items.map(item => 
        arrayEquals(item.array, itemsToRemove.array) && attributesEqual(item, itemsToRemove)
        ? {...item, quantity: item.quantity - 1} 
        : item
    )
  
}

