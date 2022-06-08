import { combineReducers } from "redux";

import { homepageReducer } from "./homepage/slice.js";
import { wishlistReducer } from './wishlist/slice.js';
import { userReducer } from './user/slice.js';
import { cartReducer } from './cart/slice.js';
import { filterReducer } from './filter/slice.js';
import { productReducer } from './product/slice.js';

const appReducer = combineReducers({
    homepage: homepageReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
    product: productReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'user/reset') {
        // return appReducer(undefined, action);
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;