const { getUser } = require("../database/db");
const bcrypt = require("bcryptjs");
const ses = require("../config/aws");
exports.compare = bcrypt.compare;

module.exports.isLoggedIn = (request, response, next) => {
    if (request.session.userId) {
        next();
        return;
    }
    response.json({ error: "Please login first !" });
};

module.exports.hashPassword = (password) => {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    getUser(email)
        .then(result => {
            if (result.rowCount == 0) {
                res.json({
                    error: "Email does not exist. Try again !"
                });
            } else {
                bcrypt.compare(password, result.user.passwordhash)
                    .then(cmpresult => {
                        if (cmpresult) {
                            req.session.userId = result.user.id;
                            next();
                            return;
                        } else {
                            res.json({
                                error: "Incorrect Password. Please enter correct Password !"
                            });
                        }
                    });
            }
        })
        .catch(error => {
            console.log('error: ', error);
            res.json({
                error: 'Something went wrong. Please try again !'
            });
        });
};

module.exports.logger = (request, response, next) => {
    if (process.env.DEBUG) {
        console.log("---");
        const { method, url } = request;
        const time = new Date().toLocaleTimeString();
        console.log(`${method} ${url} [${time}]`);
        ["query", "body", "session"].forEach((x) =>
            console.log(x, {...request[x] })
        );
        console.log("---\n");
    }
    next();
};

module.exports.sendEmailWithCode = ({ email, code }) => {

    ses.sendEmail({
        Source: 'nagalakshmi.putigampu@gmail.com',
        Destination: {
            ToAddresses: ['nagalakshmi1988.putigampu@gmail.com']
        },
        Message: {
            Body: {
                Text: {
                    Data: "Please use the code " + code + "to reset your password"
                }
            },
            Subject: {
                Data: "Password Reset for your VARNA account!"
            }
        }
    }).promise().then(
        () => console.log('it worked!')
    ).catch(
        err => console.log(err)
    );
};