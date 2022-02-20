const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/courses', MiddlewareController.verifyTokenAdmin, meController.storedCourses);
router.get('/trash/courses', MiddlewareController.verifyTokenAdmin, meController.trashCourses);

router.get('/stored/news', MiddlewareController.verifyTokenAdmin, meController.storedNews);
router.get('/trash/news', MiddlewareController.verifyTokenAdmin, meController.trashNews);

module.exports = router;
