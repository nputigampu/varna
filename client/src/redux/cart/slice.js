/* eslint-disable indent */

//REDUCERS
export { cartReducer };

function cartReducer(state = {}, action) {
    switch (action.type) {
        case "cart/loadCart":
            {
                const { items } = action.payload;

                return {
                    ...state,
                    cart: items,
                };
            }
        case "cart/newItem":
            {

                return {
                    ...state,
                    cart: [...state.cart, action.payload.newItem]
                };
            }
        case "cart/removeItem":
            {

                const { productid } = action.payload;
                return {
                    ...state,
                    cart: state.cart.filter(
                        (item) => item.productid !== productid
                    ),
                };
            }
        case "cart/updateItem":
            {

                const { productid, no_of_items } = action.payload;
                return {
                    ...state,
                    cart: state.cart.map(
                        (content) => content.productid === productid ? {...content, no_of_items: content.no_of_items + no_of_items } :
                        content
                    )
                };
            }
        case "cart/emptyCart":
            {

                return {
                    ...state,
                    cart: []
                };
            }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
}

//ACTIONS

//get latest messages
function loadCart() {

    return async function getLoadCartThunk(dispatch) {
        var cartItems = await fetch("/api/cart").then((response) =>
            response.json()
        );
        if (cartItems.error) {
            cartItems = [];
        }
        dispatch({
            type: "cart/loadCart",
            payload: {
                items: cartItems,
            },
        });
    };
}

function newCartItem(product_id) {

    let url = "/api/cart/";
    let method = "POST";
    let body = JSON.stringify({
        productid: product_id,
    });
    return async function newCartItemThunk(dispatch) {
        var data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: body,
        }).then((response) => response.json());

        if (data.error) {
            data = '';
        }
        dispatch({
            type: "cart/newItem",
            payload: {
                newItem: data
            },
        });
    };
}

function removeCartItem(product_id) {

    let url = "/api/cart/";
    let method = "DELETE";
    let body = JSON.stringify({
        productid: product_id,
    });
    return async function removeCartItemThunk(dispatch) {
        const data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: body,
        }).then((response) => response.json());

        if (data.error) {
            product_id = '';
        }
        dispatch({
            type: "cart/removeItem",
            payload: {
                productid: product_id
            },
        });
    };
}

function updateCartItem(product_id, increment) {

    let url = "/api/cart/" + product_id;
    let method = "PUT";
    let body = JSON.stringify({
        no_of_items: increment,
    });
    return async function updateCartItemThunk(dispatch) {
        var data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: body,
        }).then((response) => response.json());

        if (data.error) {
            increment = 0;
        }
        dispatch({
            type: "cart/updateItem",
            payload: {
                productid: product_id,
                no_of_items: increment
            },
        });
    };
}

function emptyCart() {

    let url = "/api/cart/empty";
    let method = "POST";
    return async function emptyCartItemThunk(dispatch) {
        var data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((response) => response.json());

        if (data.error) {
            data = '';
        }
        dispatch({
            type: "cart/emptyCart",
            payload: {},
        });
    };
}

//export actions
export { loadCart, newCartItem, removeCartItem, updateCartItem, emptyCart };