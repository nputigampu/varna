/* eslint-disable indent */

//REDUCERS
export { wishlistReducer };

function wishlistReducer(state = {}, action) {
    switch (action.type) {
        case "wishlist/initial":
            {
                const { items } = action.payload;
                console.log("in wishlist action..", items);
                return {
                    ...state,
                    wishlist: items,
                };
            }
        case "wishlist/newItem":
            {
                console.log("in new wish list item action..", action.payload);
                const { item } = action.payload;
                return {
                    ...state,
                    wishlist: [...state.wishlist, item]
                };
            }
        case "wishlist/removeItem":
            {
                console.log("in remove wish list item action..", action.payload);
                const { productid } = action.payload;
                return {
                    ...state,
                    wishlist: state.wishlist.filter(
                        (item) => item.productid !== productid
                    ),
                };
            }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
}

//ACTIONS

//get user wish list
function getUserWishList() {
    console.log("in getUserWishList: ");
    return async function getUserWishListThunk(dispatch) {
        var wishlist = await fetch("/api/wishlist/").then((response) =>
            response.json()
        );
        console.log("data from User Wish List :: ", wishlist);
        if (wishlist.error) {
            wishlist = [];
        }
        dispatch({
            type: "wishlist/initial",
            payload: {
                items: wishlist,
            },
        });
    };
}

function newItem(product_id) {
    console.log("in new item wish list slice: ");
    let url = "/api/wishlist/";
    let method = "POST";
    let body = JSON.stringify({
        productid: product_id,
    });
    return async function newItemThunk(dispatch) {
        const data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: body,
        }).then((response) => response.json());
        console.log("new item in wish list: ", data);
        dispatch({
            type: "wishlist/newItem",
            payload: {
                item: data
            },
        });
    };
}

function removeItem(product_id) {
    console.log("in remove item wish list slice: ");
    let url = "/api/wishlist/";
    let method = "DELETE";
    let body = JSON.stringify({
        productid: product_id,
    });
    return async function removeItemThunk(dispatch) {
        const data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: body,
        }).then((response) => response.json());
        console.log("remove item in wish list: ", data);
        if (data.error) {
            product_id = '';
        }
        dispatch({
            type: "wishlist/removeItem",
            payload: {
                productid: product_id
            },
        });
    };
}


//export actions
export { getUserWishList, newItem, removeItem };