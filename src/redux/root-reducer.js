import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import currencyReducer from "./currency/currency.reducer";
import categoryReducer from "./category/category.reducer";
import cartReducer from "./cart/cart.reducer";
import storeItemsReducer from "./storeItems/storeItems.reducer";


const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "category",
    "currency",
    "currencies",
    "product",
    "items", 
    "total"
  ],
};

const rootReducer = combineReducers({
  category: categoryReducer,
  categoryIndex: categoryReducer,
  product: categoryReducer,
  currency: currencyReducer,
  currencies: currencyReducer,
  showCart: cartReducer,
  items: cartReducer,
  total: cartReducer,
  attributesCount: cartReducer,
  storeItems: storeItemsReducer

});

export default persistReducer(persistConfig, rootReducer);
