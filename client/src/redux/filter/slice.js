/* eslint-disable indent */

//REDUCERS
export { filterReducer };

function filterReducer(state = {}, action) {
    switch (action.type) {
        case "filter/productFilters":
            {
                const { productFilters } = action.payload;

                return {
                    ...state,
                    productFilters: productFilters,
                };
            }
        case "filter/setCategoryFilter":
            {
                const { category } = action.payload;

                return {
                    ...state,
                    current_filter: {...state.current_filter, category: category }
                };
            }
        case "filter/setSearchFilter":
            {
                const { searchParams } = action.payload;

                return {
                    ...state,
                    current_filter: {...state.current_filter, searchParams: searchParams }
                };
            }
        case "filter/setRatingFilter":
            {
                const { rating } = action.payload;

                return {
                    ...state,
                    current_filter: {...state.current_filter, rating: rating }
                };
            }
        case "filter/setPricingFilter":
            {
                const { pricerange } = action.payload;

                return {
                    ...state,
                    current_filter: {...state.current_filter, pricefrom: pricerange.from, priceto: pricerange.to }
                };
            }
        case "filter/updateSortBy":
            {
                const { sort } = action.payload;

                return {
                    ...state,
                    current_filter: {...state.current_filter, sort: sort }
                };
            }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
}

//ACTIONS

function getProductFilters(category) {

    return async function getProductFiltersThunk(dispatch) {
        let url = "/api/products/prodcat/" + category;

        const { categories } = await fetch(url).then((response) =>
            response.json()
        );

        dispatch({
            type: "filter/productFilters",
            payload: {
                productFilters: categories,
            },
        });
    };
}

function addCategoryFilter(category) {

    return {
        type: "filter/setCategoryFilter",
        payload: { category: category }
    };
}

function addSearchFilter(searchParams) {

    return {
        type: "filter/setSearchFilter",
        payload: { searchParams: searchParams }
    };
}

function addRatingFilter(rating) {

    return {
        type: "filter/setRatingFilter",
        payload: { rating: rating }
    };
}

function addPricingFilter(price) {

    return {
        type: "filter/setPricingFilter",
        payload: {
            pricerange: {
                from: price[0],
                to: price[1],
            }
        }
    };
}

function updateSortBy(sort) {

    return {
        type: "filter/updateSortBy",
        payload: { sort: sort }
    };
}

//export actions
export { getProductFilters, addCategoryFilter, addRatingFilter, addPricingFilter, addSearchFilter, updateSortBy };