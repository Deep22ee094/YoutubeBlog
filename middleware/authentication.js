const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return function (req, res, next) {
        const tokenCookievalue = req.cookies[cookieName];

        if (!tokenCookievalue) {
            return next();
        }

        try {
            const userpayload = validateToken(tokenCookievalue);
            req.user = userpayload;
        } catch (error) {
            // Optional: console.log("Invalid token");
        }

        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
