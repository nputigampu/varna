/* eslint-disable indent */

//REDUCERS
export { homepageReducer };

function homepageReducer(state = {}, action) {
    switch (action.type) {
        case "homepage/slideritems":
            {
                const { slideritems } = action.payload;

                return {
                    ...state,
                    slideritems: slideritems,
                };
            }
        case "homepage/maincategories":
            {
                const { maincategories } = action.payload;

                return {
                    ...state,
                    maincategories: maincategories,
                };
            }
        case "homepage/popularProducts":
            {
                const { popularProducts } = action.payload;

                return {
                    ...state,
                    popularProducts: popularProducts,
                };
            }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
}

//ACTIONS

function getSliderItems() {

    return async function getSliderItemsThunk(dispatch) {
        const { sliderItems } = await fetch("/api/products/slideritems").then((response) =>
            response.json()
        );

        dispatch({
            type: "homepage/slideritems",
            payload: {
                slideritems: sliderItems,
            },
        });
    };
}

//get main categories
function getMainCategories() {

    return async function getMainCategoriesThunk(dispatch) {
        const { mainCategories } = await fetch("/api/products/maincategories").then((response) =>
            response.json()
        );

        dispatch({
            type: "homepage/maincategories",
            payload: {
                maincategories: mainCategories,
            },
        });
    };
}

//get most popular products
function getPopularProducts() {

    return async function getPopularProductsThunk(dispatch) {
        const { popularProducts } = await fetch("/api/products/popularProducts").then((response) =>
            response.json()
        );

        dispatch({
            type: "homepage/popularProducts",
            payload: {
                popularProducts: popularProducts,
            },
        });
    };
}

//export actions
export { getSliderItems, getMainCategories, getPopularProducts };