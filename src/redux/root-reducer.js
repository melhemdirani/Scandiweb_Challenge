import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import currencyReducer from "./currency/currency.reducer";
import categoryReducer from "./category/category.reducer";
import cartReducer from "./cart/cart.reducer";
import attributeReducer from "./attributes/attributes.reducer"

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "currency",
    "currencies",
    "product",
    "items", 
    "total",
    "totalQuantity"
  ],
};

const rootReducer = combineReducers({
  categoryIndex: categoryReducer,
  product: categoryReducer,
  currency: currencyReducer,
  currencies: currencyReducer,
  showCurrencies: currencyReducer,
  showCart: cartReducer,
  items: cartReducer,
  total: cartReducer,
  totalQuantity: cartReducer,
  attributesCount: cartReducer,
  attributeShown: attributeReducer,
  allowHideAttribute: attributeReducer

});

export default persistReducer(persistConfig, rootReducer);
