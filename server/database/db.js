/* eslint-disable indent */
const spicedPg = require("spiced-pg");
let dbuser;
let dbpwd;
if (process.env.NODE_ENV == 'production') {
    console.log("running in prod");
} else {
    dbuser = require('../../secrets.json').dbuser;
    dbpwd = require('../../secrets.json').dbpwd;
}

const db = spicedPg(
    process.env.DATABASE_URL ||
    `postgres:${dbuser}:${dbpwd}@localhost:5432/varna`
);

/////////////////////////QUERY for user registeration///////////////////////////
module.exports.addUser = (firstName, lastName, email, username, pwdHash) => {
    const query = `
        INSERT INTO users(firstName, lastName, email, username, passwordHash)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id, firstName, lastName, email, username    `;
    const params = [firstName, lastName, email, username, pwdHash];
    return db.query(query, params)
        .then(result => {
            return result.rows[0];
        });
};

module.exports.getUser = (email) => {
    return db
        .query(`SELECT id, passwordHash FROM users WHERE email = $1;`, [email])
        .then((result) => {
            return { rowCount: result.rowCount, user: result.rows[0] };
        });
};

module.exports.getUserById = (id) => {
    return db
        .query(`SELECT id, firstname, lastname, email, username FROM users WHERE id = $1;`, [id])
        .then((result) => {
            return { rowCount: result.rowCount, user: result.rows[0] };
        });
};

/////////////////////////QUERY for password reset ///////////////////////////
module.exports.createPasswordResetCode = (email, code) => {
    const query = `
        INSERT INTO password_reset(email, code)
        VALUES($1, $2)
        RETURNING id `;
    const params = [email, code];
    return db.query(query, params)
        .then(result => {
            return result.rows[0];
        });
};

module.exports.getPasswordResetCode = (email) => {
    return db
        .query(`SELECT code FROM password_reset 
        WHERE email = $1 
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        order by created_at desc fetch first 1 row only ;`, [email])
        .then((result) => {
            return { rowCount: result.rowCount, resetCode: result.rows[0] };
        });
};

module.exports.updatePwd = (email, passwordHash) => {
    return db
        .query(`UPDATE users SET passwordHash = $2 where email = $1;`, [email, passwordHash]);
};

/////////////////////////QUERY for products ///////////////////////////
module.exports.getProductsBySearchParams = (searchParams) => {
    return db
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability 
                        FROM products
                        WHERE (LOWER(title) ILIKE $1)
                        LIMIT 100`, ['%' + searchParams + '%'])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        });
};

module.exports.getProductsBySelectionSortByLatest = (categories, rating, pricefrom, priceto, searchParams) => {
    return db
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability
                FROM PRODUCTS   
                WHERE category_id = ANY($1)
                AND rating >= $2
                AND price_value >= $3
                AND price_value <= $4
                AND (LOWER(title) ILIKE $5)
                ORDER BY createdat DESC
                LIMIT 50
             `, [categories, rating, pricefrom, priceto, '%' + searchParams + '%'])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        })
        .catch(function(err) {

        });
};

module.exports.getProductsBySelectionSortByPriceLow = (categories, rating, pricefrom, priceto, searchParams) => {
    return db
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability
                FROM PRODUCTS   
                WHERE category_id = ANY($1)
                AND rating >= $2
                AND price_value >= $3
                AND price_value <= $4
                AND (LOWER(title) ILIKE $5)
                ORDER BY PRICE_VALUE ASC
                LIMIT 50
             `, [categories, rating, pricefrom, priceto, '%' + searchParams + '%'])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        })
        .catch(function(err) {

        });
};

module.exports.getProductsBySelectionSortByPriceHigh = (categories, rating, pricefrom, priceto, searchParams) => {
    return db
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability
                FROM PRODUCTS   
                WHERE category_id = ANY($1)
                AND rating >= $2
                AND price_value >= $3
                AND price_value <= $4
                AND (LOWER(title) ILIKE $5)
                ORDER BY PRICE_VALUE DESC
                LIMIT 50
             `, [categories, rating, pricefrom, priceto, '%' + searchParams + '%'])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        })
        .catch(function(err) {

        });
};

module.exports.getProductsBySelectionSortByRating = (categories, rating, pricefrom, priceto, searchParams) => {
    return db
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability
                FROM PRODUCTS   
                WHERE category_id = ANY($1)
                AND rating >= $2
                AND price_value >= $3
                AND price_value <= $4
                AND (LOWER(title) ILIKE $5)
                ORDER BY rating DESC
                LIMIT 50
             `, [categories, rating, pricefrom, priceto, '%' + searchParams + '%'])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        })
        .catch(function(err) {

        });
};

module.exports.getProductsBySelectionSortByPopularity = (categories, rating, pricefrom, priceto, searchParams) => {
    return db
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability
                FROM PRODUCTS   
                WHERE category_id = ANY($1)
                AND rating >= $2
                AND price_value >= $3
                AND price_value <= $4
                AND (LOWER(title) ILIKE $5)
                ORDER BY ratings_total DESC
                LIMIT 50
             `, [categories, rating, pricefrom, priceto, '%' + searchParams + '%'])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        })
        .catch(function(err) {

        });
};

module.exports.getPopularProducts = () => {
    return db
        // .query(`select id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability  
        //         from products
        //         order by ratings_total desc
        //         LIMIT 8`, [])
        .query(`SELECT id, product_id as productid, category_id, title, image, brand, rating, ratings_total, price_value, availability
        FROM (
        SELECT id, product_id, category_id, title, image, brand, rating, ratings_total, price_value, availability, Rank() 
          over (Partition BY category_id
                ORDER BY ratings_total DESC ) AS Rank
        FROM PRODUCTS
        ) rs WHERE Rank <= 1
		;`, [])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        });
};
module.exports.updateNoOfItems = (productId, change) => {
    return db
        .query(`UPDATE products 
                SET no_of_items = no_of_items + $2
                WHERE product_id = $1
                `, [productId, change])
        .then((result) => {
            return { rowCount: result.rowCount, products: result.rows };
        });
};

/////////////////////////QUERY for orders ///////////////////////////
module.exports.newOrder = (userid, amount, address_houseno, address_street, address_city, address_pin, no_of_items, status) => {
    const query = `
        INSERT INTO order(userid, amount, address_houseno, address_street, address_city, address_pin, no_of_items, status)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, TO_CHAR(createdAt, 'DD/MM/YYYY, HH24:MI:SS') AS createdAt;
    `;
    const params = [userid, amount, address_houseno, address_street, address_city, address_pin, no_of_items, status];
    return db.query(query, params);
};

module.exports.getOrders = (userid) => {
    const query = `
    SELECT *
        FROM orders
        WHERE userid = $1;
    `;
    const params = [userid];
    return db.query(query, params);
};

module.exports.getOrderItems = (orderid) => {
    const query = `
    SELECT *
        FROM order_items
        WHERE orderid = $1;
    `;
    const params = [orderid];
    return db.query(query, params);
};

/////////////////////////QUERY for wish list ///////////////////////////
module.exports.addProductToWishlist = (userid, productid, item_size, item_color) => {
    const query = `
       WITH inserted AS (
        INSERT INTO wish_list(userid, productid, item_size, item_color)
    VALUES($1, $2, $3, $4)
        RETURNING id, userid, productid, item_size, item_color, createdat
               )
    SELECT inserted.*, b.category_id, b.title,b.image,b.price_value,b.color,b.sizes 
    FROM inserted
    INNER JOIN products b ON inserted.productid = b.product_id  
    `;
    const params = [userid, productid, item_size, item_color];
    return db.query(query, params);
};

module.exports.removeProductFromWishList = (userid, productid) => {
    const query = `
    DELETE
        FROM wish_list
        WHERE userid = $1 AND productid = $2;
    `;
    const params = [userid, productid];
    return db.query(query, params);
};

module.exports.getWishListForUser = (userid) => {
    const query = `
    SELECT a.userid,a.productid,a.item_size,a.item_color,b.category_id, b.title,b.image,b.price_value,b.color,b.sizes,b.rating,b.ratings_total
        FROM wish_list a, products b 
        WHERE a.productid = b.product_id
        AND userid = $1;
    `;
    const params = [userid];
    return db.query(query, params);
};

/////////////////////////QUERY for wish list ///////////////////////////
module.exports.addItemToCart = (userid, productid, item_size, item_color) => {
    const query = `
    WITH inserted AS (
        INSERT INTO cart(userid, productid, item_size, item_color, no_of_items)
    VALUES($1, $2, $3, $4, 1)
        RETURNING id, userid, productid, item_size, item_color, no_of_items, createdat
        )
    SELECT inserted.*, b.category_id, b.title,b.image,b.price_value,b.color,b.sizes 
    FROM inserted
    INNER JOIN products b ON inserted.productid = b.product_id  
    `;
    const params = [userid, productid, item_size, item_color];
    return db.query(query, params);
};

module.exports.removeItemFromCart = (userid, productid) => {
    const query = `
    DELETE
        FROM cart
        WHERE userid = $1 AND productid = $2;
    `;
    const params = [userid, productid];
    return db.query(query, params);
};

module.exports.getCartItems = (userid) => {
    const query = `
   SELECT a.userid,a.productid,a.item_size,a.item_color,a.no_of_items,b.category_id, b.title,b.image,b.price_value,b.color,b.sizes 
        FROM cart a, products b 
        WHERE a.productid = b.product_id
        AND userid = $1;
    `;
    const params = [userid];
    return db.query(query, params);
};

module.exports.increaseItemsInCart = (userid, productid, number) => {
    const query = `
    UPDATE cart SET no_of_items = no_of_items + $3
        WHERE userid = $1 AND productid = $2;
    `;
    const params = [userid, productid, number];
    return db.query(query, params);
};

module.exports.decreaseItemsInCart = (userid, productid, number) => {
    const query = `
    UPDATE cart SET no_of_items = no_of_items - $3
        WHERE userid = $1 AND productid = $2;
    `;
    const params = [userid, productid, number];
    return db.query(query, params);
};


module.exports.emptyCard = (userid) => {
    const query = `
     DELETE
        FROM cart
        WHERE userid = $1 ;
    `;
    const params = [userid];
    return db.query(query, params);
};