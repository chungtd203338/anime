const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

class UserController {
    login(req, res, next) {
        res.render('user/login');
    }

    register(req, res, next) {
        res.render('user/register');
    }

    store(req, res, next) {
        const user = new User(req.body);
        user.save()
        res.render('user/login');
    }
}

module.exports = new UserController();
