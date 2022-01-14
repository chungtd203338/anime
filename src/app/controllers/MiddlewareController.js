const jwt = require('jsonwebtoken');
const { mongooseToObject } = require('../../util/mongoose');

const MiddlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, 'secretkey', (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid!');
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json('Ban chua dang nhap!');
        }
    },

    verifyTokenAdmin: (req, res, next) => {
        MiddlewareController.verifyToken(req, res, () => {
            if (req.user.email === 'halequyen19042001@gmail.com') {
                next();
            } else {
                res.status(403).json('Ban khong co quyen truy cap!');
            }
        });
    },
};

module.exports = MiddlewareController;
