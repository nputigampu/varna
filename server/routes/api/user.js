const {
    isLoggedIn,
    login,
    hashPassword,
    sendEmailWithCode,
} = require("../../middlewares/common");
const {
    addUser,
    getUserById,
    getUser,
    getPasswordResetCode,
    updatePwd,
    createPasswordResetCode,
} = require("../../database/db");
const cryptoRandomString = require("crypto-random-string");
const { Router } = require("express");
const router = Router();

//get user details
router.get("/api/user", isLoggedIn, async (req, res) => {
    const { user } = await getUserById(req.session.userId);
    res.json({ user });
});

//add new user
router.post("/api/user", async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    const pwdHash = await hashPassword(password);
    const newUser = await addUser(
        firstname,
        lastname,
        email,
        username,
        pwdHash
    );
    req.session.userId = newUser.id;
    res.json({ newUser });
});

// Login new user
router.post("/api/user/login", login, async (req, res) => {
    const { user } = await getUserById(req.session.userId);
    res.json({ user });
});

// forgot password
router.post("/api/user/password", function (req, res) {
    const { email } = req.body;
    getUser(email)
        .then((result) => {
            if (result.rowCount == 0) {
                res.json({
                    success: false,
                    error: "Email does not exist. Try again !",
                });
            } else {
                const code = cryptoRandomString({ length: 6 });
                req.session.userId = "";
                createPasswordResetCode(email, code).then(() => {
                    sendEmailWithCode({ email, code });
                    res.json({ success: true });
                });
            }
        })
        .catch((error) => {
            res.json({
                success: false,
                error: "Something went wrong. Please try again !",
            });
        });
});

// update password
router.put("/api/user/password", function (req, res) {
    const { email, code, password } = req.body;
    getPasswordResetCode(email)
        .then((result) => {
            if (result.rowCount == 0) {
                res.json({
                    success: false,
                    error: "Code expired. Request new code !",
                });
            } else {
                if (code == result.resetCode.code) {
                    hashPassword(password)
                        .then((hasedPwd) => {
                            updatePwd(email, hasedPwd)
                                .then((result) => {
                                    res.json({ success: true });
                                })
                                .catch((error) => {
                                    res.json({
                                        success: false,
                                        error: "Something went wrong while updating the password. Please try again",
                                    });
                                });
                        })
                        .catch((error) => {
                            res.json({
                                success: false,
                                error: "Something went wrong while updating the password. Please try again",
                            });
                        });
                } else {
                    res.json({
                        success: false,
                        error: "Incorrect code. Request new code !",
                    });
                }
            }
        })
        .catch((error) => {
            res.json({
                success: false,
                error: "Something went wrong. Please try again !",
            });
        });
});

// Logout
router.post("/api/user/logout", isLoggedIn, function (req, res) {
    if (req.session.userId) {
        req.session = null;
    }
    res.json({
        success: true,
    });
});

module.exports = router;
