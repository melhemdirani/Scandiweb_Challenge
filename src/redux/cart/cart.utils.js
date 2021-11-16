function attributesEqual(a,b) {
    let types = a.attributesTypes
    return(
    types.every((val) => a.attributes.[val] === b.attributes.[val])
    )
}

export const addItemToCart = (items, itemsToAdd) => {

    const existingItem = items.find(
        item => item.id === itemsToAdd.id
    );
    const existingItemsAttributes = items.find(
        item => attributesEqual(item, itemsToAdd)
    );
    if(existingItem && existingItemsAttributes) {
        return items.map(item => 
            item.id === itemsToAdd.id && attributesEqual(item, itemsToAdd)
            ? {...item, quantity: item.quantity + 1}
            : item
        )
    }
    return [ ...items, { ...itemsToAdd, quantity: 1}]
}

export const removeItemFromCart = (items, itemsToRemove) => {
    
    if(itemsToRemove.quantity === 1) {
        return items.filter(item => 
            ((!attributesEqual(item, itemsToRemove) && item.id !== itemsToRemove.id) 
            || (!attributesEqual(item, itemsToRemove) && item.id === itemsToRemove.id)
        ))
    }
    return items.map(item => 
        item.id === itemsToRemove.id && attributesEqual(item, itemsToRemove)
        ? {...item, quantity: item.quantity - 1} 
        : item
    )
  
}

