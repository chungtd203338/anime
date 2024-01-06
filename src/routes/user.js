const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/login', userController.login);
router.post('/pass', userController.pass);
router.get('/register', userController.register);
router.post('/store', userController.store);
router.post('/refresh', userController.refresh);
router.get(
    '/logout',
    // middlewareController.verifyToken,
    userController.logout,
);
module.exports = router;
