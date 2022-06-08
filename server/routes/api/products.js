/* eslint-disable indent */
const {
    getProductsBySearchParams,
    getProductsBySelectionSortByLatest,
    getProductsBySelectionSortByPriceLow,
    getProductsBySelectionSortByPriceHigh,
    getProductsBySelectionSortByRating,
    getProductsBySelectionSortByPopularity,
    getPopularProducts,
    getProductsTotalCountBySelection
} = require("../../database/db");
const { Router } = require("express");
const { sliderItems, mainCategories } = require("../../config/data");
const { men, women, accessories, childNodes, all } = require("../../config/categories");
const router = Router();

//Return categories for each section
router.get("/api/products/prodcat/:id", async(req, res) => {


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

    getProductsBySearchParams(searchParams)
        .then(result => {
            // 
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
            console.log("error", error);
            res.json({
                success: false,
                error: 'error while retrieveing products'
            });

        });
});

//Search for slider products
router.get("/api/products/slideritems", async(req, res) => {

    res.json({ sliderItems });
});

//Search for maincategories
router.get("/api/products/maincategories", async(req, res) => {

    res.json({ mainCategories });
});

//Search for most popular products
router.get("/api/products/popularProducts", async(req, res) => {

    const { products } = await getPopularProducts();
    res.json({
        popularProducts: products
    });
});

//Search for products by Category
router.get("/api/products/", async(req, res) => {

    const { category, rating, pricefrom, priceto, searchParams, sort, page } = req.query;
    let offset = (page - 1) * 20;
    let categories = [];
    //ugly hack to get child categories. Need to fix it later.
    if (parseInt(category) < 100) {
        let node = childNodes.find(({ node }) => node === category);
        categories = node.children;
    } else {
        categories[0] = category;
    }

    if (req.query) {
        var result;
        //To do: Investigate if total count and results can be returned in a single db call        
        const { totalCount } = await getProductsTotalCountBySelection(categories, rating, pricefrom, priceto, searchParams);
        switch (sort) {
            case 'NEWEST':
                result = await getProductsBySelectionSortByLatest(categories, rating, pricefrom, priceto, searchParams, offset);
                res.json({ totalCount: totalCount, products: result.products });
                break;
            case 'PRICE_LOW':
                result = await getProductsBySelectionSortByPriceLow(categories, rating, pricefrom, priceto, searchParams, offset);
                res.json({ totalCount: totalCount, products: result.products });
                break;
            case 'PRICE_HIGH':
                result = await getProductsBySelectionSortByPriceHigh(categories, rating, pricefrom, priceto, searchParams, offset);
                res.json({ totalCount: totalCount, products: result.products });
                break;
            case 'RATING':
                result = await getProductsBySelectionSortByRating(categories, rating, pricefrom, priceto, searchParams, offset);
                res.json({ totalCount: totalCount, products: result.products });
                break;
            case 'POPULARITY':
                result = await getProductsBySelectionSortByPopularity(categories, rating, pricefrom, priceto, searchParams, offset);
                res.json({ totalCount: totalCount, products: result.products });
                break;
        }

    }
});


module.exports = router;