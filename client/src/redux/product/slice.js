/* eslint-disable indent */
//REDUCERS
export { productReducer };

function productReducer(state = {}, action) {
    switch (action.type) {
        case "product/filtered":
            {
                const { products } = action.payload;

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

    return async function getProductByFilterThunk(dispatch, getState) {
        const { filter: { current_filter: { category, rating, pricefrom, priceto, searchParams, sort } } } = getState();
        if (category === undefined ||
            rating === undefined ||
            pricefrom === undefined ||
            priceto === undefined ||
            searchParams === undefined ||
            sort === undefined) {

        } else {
            var url = new URL(window.location.origin + '/api/products/');
            var params = {
                category: category,
                rating: rating,
                pricefrom: pricefrom,
                priceto: priceto,
                searchParams: searchParams,
                sort: sort
            };
            url.search = new URLSearchParams(params).toString();
            // let url = "/api/products/category/" + category;

            const { products } = await fetch(url).then((response) =>
                response.json()
            );

            dispatch({
                type: "product/filtered",
                payload: {
                    products: products,
                },
            });
        }
    };
}

function getProductBySearchParam(searchParams) {

    return async function getProductsBySearchThunk(dispatch) {
        var url = new URL(window.location.origin + '/api/products/search/');
        var params = {
            searchParams: searchParams,
        };
        url.search = new URLSearchParams(params).toString();


        const { products } = await fetch(url).then((response) =>
            response.json()
        );

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