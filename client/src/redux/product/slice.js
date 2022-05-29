/* eslint-disable indent */
//REDUCERS
export { productReducer };

function productReducer(state = {}, action) {
    switch (action.type) {
        case "product/filtered":
            {
                const { products } = action.payload;
                console.log("in product filtered action..", products);
                return {
                    ...state,
                    filtered: products,
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
function getProductByFilter() {
    console.log("in getProductByFilter: ");
    return async function getProductByFilterThunk(dispatch, getState) {
        const { filter: { current_filter: { category, rating, pricefrom, priceto, searchParams } } } = getState();
        var url = new URL(window.location.origin + '/api/products/');
        var params = {
            category: category,
            rating: rating,
            pricefrom: pricefrom,
            priceto: priceto,
            searchParams: searchParams
        };
        url.search = new URLSearchParams(params).toString();
        // let url = "/api/products/category/" + category;
        console.log("url for filtered products :: ", url);
        const { products } = await fetch(url).then((response) =>
            response.json()
        );
        console.log("data from filtered products :: ", products);
        dispatch({
            type: "product/filtered",
            payload: {
                products: products,
            },
        });
    };
}

function getProductBySearchParam(searchParams) {
    console.log("in getProductBySearchParam slice ");
    return async function getProductsBySearchThunk(dispatch) {
        var url = new URL(window.location.origin + '/api/products/search/');
        var params = {
            searchParams: searchParams,
        };
        url.search = new URLSearchParams(params).toString();

        console.log("url for searched products :: ", url);
        const { products } = await fetch(url).then((response) =>
            response.json()
        );
        console.log("data from searched products :: ", products);
        dispatch({
            type: "product/filtered",
            payload: {
                products: products,
            },
        });
    };
}

//export actions
export { getProductByFilter, getProductBySearchParam };