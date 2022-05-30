const express = require("express");
const app = express();
const { Server } = require("http");
const compression = require("compression");
const path = require("path");
const { logger } = require("./middlewares/common");
const cookieSession = require('cookie-session');
const server = Server(app);
let sessionSecret;

if (process.env.NODE_ENV == 'production') {
    sessionSecret = process.env.SESSION_SECRET;
} else {
    sessionSecret = require('../secrets.json').SESSION_SECRET;
}

app.use(compression());
app.use(express.json());
// Request body parser
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Cookie session middleware
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    // cookie become invalid after 30 minutes
    maxAge: 1000 * 60 * 60 * 0.5,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

app.use(logger);

app.use(require("./routes/api/user.js"));

app.use(require("./routes/api/products.js"));

app.use(require("./routes/api/orders.js"));

app.use(require("./routes/api/wishlist.js"));

app.use(require("./routes/api/cart.js"));

app.get('/shop/icons/:id', (req, res) => {
    let id = req.params.id;
    res.sendFile(path.join(__dirname, "..", "client/public/icons/" + id));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function() {
    console.log("I'm listening .. ");
});