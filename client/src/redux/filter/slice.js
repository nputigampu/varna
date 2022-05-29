/* eslint-disable indent */

//REDUCERS
export { filterReducer };

function filterReducer(state = {}, action) {
    switch (action.type) {
        case "filter/productFilters":
            {
                const { productFilters } = action.payload;
                console.log("in productFilters action..", productFilters);
                return {
                    ...state,
                    productFilters: productFilters,
                };
            }
        case "filter/setCategoryFilter":
            {
                const { category } = action.payload;
                console.log("in setCategoryFilter action..", category);
                return {
                    ...state,
                    current_filter: {...state.current_filter, category: category }
                };
            }
        case "filter/setSearchFilter":
            {
                const { searchParams } = action.payload;
                console.log("in setSearchFilter action..", searchParams);
                return {
                    ...state,
                    current_filter: {...state.current_filter, searchParams: searchParams }
                };
            }
        case "filter/setRatingFilter":
            {
                const { rating } = action.payload;
                console.log("in setRatingFilter action..", rating);
                return {
                    ...state,
                    current_filter: {...state.current_filter, rating: rating }
                };
            }
        case "filter/setPricingFilter":
            {
                const { pricerange } = action.payload;
                console.log("in setRatingFilter action..", pricerange);
                return {
                    ...state,
                    current_filter: {...state.current_filter, pricefrom: pricerange.from, priceto: pricerange.to }
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
    console.log("in getProductFilters: ", category);
    return async function getProductFiltersThunk(dispatch) {
        let url = "/api/products/prodcat/" + category;
        console.log("url Product Category Filters :: ", url);
        const { categories } = await fetch(url).then((response) =>
            response.json()
        );
        console.log("data from ProductFilters :: ", categories);
        dispatch({
            type: "filter/productFilters",
            payload: {
                productFilters: categories,
            },
        });
    };
}

function addCategoryFilter(category) {
    console.log("in addCategoryFilter: ", category);
    return {
        type: "filter/setCategoryFilter",
        payload: { category: category }
    };
}

function addSearchFilter(searchParams) {
    console.log("in addSearchFilter: ", searchParams);
    return {
        type: "filter/setSearchFilter",
        payload: { searchParams: searchParams }
    };
}

function addRatingFilter(rating) {
    console.log("in addCategoryFilter: ", rating);
    return {
        type: "filter/setRatingFilter",
        payload: { rating: rating }
    };
}

function addPricingFilter(price) {
    console.log("in addPricingFilter: ", price);
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

//export actions
export { getProductFilters, addCategoryFilter, addRatingFilter, addPricingFilter, addSearchFilter };