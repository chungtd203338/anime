const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get(
    '/search',
    MiddlewareController.verifyToken,
    siteController.search
);
router.get(
    '/',
    MiddlewareController.verifyToken,
    siteController.index,
);

module.exports = router;