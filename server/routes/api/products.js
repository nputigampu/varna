/* eslint-disable indent */
const { getProductsBySearchParams, getProductsBySelection, getPopularProducts } = require("../../database/db");
const { Router } = require("express");
const { sliderItems, mainCategories } = require("../../config/data");
const { men, women, accessories, childNodes, all } = require("../../config/categories");
const router = Router();

function resolveSortBy(sortby) {
    switch (sortby) {
        case 'newest':
            return { column: 'createdat', sorted: 'DESC' };
        case 'price_lowest':
            return { column: 'price_value', sorted: 'ASC' };
        case 'price_higjest':
            return { column: 'price_value', sorted: 'DESC' };
        case 'rating':
            return { column: 'rating', sorted: 'DESC' };
        case 'popularity':
            return { column: 'ratings_total', sorted: 'DESC' };
        default:
            return { column: 'createdat', sorted: 'DESC' };
    }
}
//Return categories for each section
router.get("/api/products/prodcat/:id", async(req, res) => {
    console.log("In /api/products/prodcat ", req.params.id);

    switch (req.params.id) {
        case 'men':
            res.json({ categories: men });
            break;
        case 'women':
            res.json({ categories: women });
            break;
        case 'accessories':
            res.json({ categories: accessories });
            break;
        default:
            res.json({ categories: all });
    }

});

//Search for products
router.get("/api/products/search/", async(req, res) => {
    const { searchParams } = req.query;
    console.log("In /api/prodcts/search/ ", searchParams);
    getProductsBySearchParams(searchParams)
        .then(result => {
            // console.log("products: ", result);
            if (result.rowCount > 0) {
                result.success = true;
                res.json(result);
            } else {
                res.json({
                    success: false,
                    error: 'no products found'
                });
            }
        })
        .catch(error => {
            res.json({
                success: false,
                error: 'error while retrieveing products'
            });
            console.log("error while retrieveing products: ", error);
        });
});

//Search for slider products
router.get("/api/products/slideritems", async(req, res) => {
    console.log("In /api/products/slideritems ");
    res.json({ sliderItems });
});

//Search for maincategories
router.get("/api/products/maincategories", async(req, res) => {
    console.log("In /api/products/maincategories ");
    res.json({ mainCategories });
});

//Search for most popular products
router.get("/api/products/popularProducts", async(req, res) => {
    console.log("In /api/products/popularProducts ");
    const { products } = await getPopularProducts();
    res.json({
        popularProducts: products
    });
});

//Search for products by Category
router.get("/api/products/", function(req, res) {
    console.log("In /api/products/ ", req.query);
    const { category, rating, pricefrom, priceto, searchParams } = req.query;
    let categories = [];
    //ugly hack to get child categories. Need to fix it later.
    if (parseInt(category) < 100) {
        let node = childNodes.find(({ node }) => node === category);
        categories = node.children;
    } else {
        categories[0] = category;
    }
    const { orderby, sorted } = resolveSortBy('');

    if (req.query) {
        getProductsBySelection(categories, rating, pricefrom, priceto, searchParams)
            .then(result => {
                console.log("products found matching search params: ", result.rowCount);
                result.success = true;
                res.json(result);
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: 'error while searching for products'
                });
                console.log("error while searching for products: ", error);
            });
    }
});


module.exports = router;