DROP TABLE IF EXISTS password_reset;
DROP TABLE IF EXISTS wish_list;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    firstName      VARCHAR(255) NOT NULL,
    lastName       VARCHAR(255) NOT NULL,
	username       VARCHAR (50),
    email           VARCHAR(50) NOT NULL UNIQUE,
    passwordHash   VARCHAR NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id              SERIAL PRIMARY KEY,
	product_id      VARCHAR(15)  NOT NULL,
	category_id     VARCHAR(15)  NOT NULL, 
    title           VARCHAR NOT NULL,
	image           VARCHAR(255) NOT NULL,
	brand			VARCHAR(100),
	rating	 		NUMERIC(2,1) ,
	ratings_total   INT,  
	price_value     NUMERIC (10,2) NOT NULL,
	price_currency 	CHAR(3) NOT NULL,
	price_symbol 	CHAR(1) NOT NULL,
	availability 	VARCHAR(255),
	no_of_items		SMALLINT NOT NULL,
    createdAt      	TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset(
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(6) NOT NULL,
    email           VARCHAR(50) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wish_list (
    id                  SERIAL PRIMARY KEY,
	userid              INT REFERENCES users(id) NOT NULL,
	productid           INT REFERENCES products(id) NOT NULL,
	item_size			VARCHAR(10),
	item_color			VARCHAR(20),
    createdAt      	    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id                  SERIAL PRIMARY KEY,
	userid              INT REFERENCES users(id) NOT NULL,
	order_amount        NUMERIC (10,2) NOT NULL,
	address_houseno     VARCHAR(10) NOT NULL,
	address_street	    VARCHAR(50) NOT NULL,
	address_city		VARCHAR(50) NOT NULL,
	address_pin	        VARCHAR(10) NOT NULL,
	no_of_items		    SMALLINT NOT NULL,
	status              SMALLINT,
    createdAt      	    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id                  SERIAL PRIMARY KEY,
	orderid             INT REFERENCES orders(id) NOT NULL,
	productid           INT REFERENCES products(id) NOT NULL,
	no_of_items         SMALLINT NOT NULL, 
	item_amount         NUMERIC (10,2) NOT NULL,
	item_size			VARCHAR(10),
	item_color			VARCHAR(20),
    createdAt      	    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
