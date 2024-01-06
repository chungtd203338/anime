const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get(
    '/stored/films',
    MiddlewareController.verifyTokenAdmin,
    meController.storedFilms,
);
router.get(
    '/trash/films',
    MiddlewareController.verifyTokenAdmin,
    meController.trashFilms,
);

module.exports = router;
