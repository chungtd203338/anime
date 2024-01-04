const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const filmController = require('../app/controllers/FilmController');

router.get('/create', MiddlewareController.verifyTokenAdmin, filmController.create);
router.post('/store', MiddlewareController.verifyTokenAdmin, filmController.store);
router.get('/:id/edit', MiddlewareController.verifyTokenAdmin, filmController.edit);
router.post('/handle-form-actions', MiddlewareController.verifyTokenAdmin, filmController.handleFormActions);
router.post(
    '/handle-trash-form-actions',
    MiddlewareController.verifyTokenAdmin,
    filmController.handletrashFormActions,
);
router.put('/:id', MiddlewareController.verifyTokenAdmin, filmController.update);
router.patch('/:id/restore', MiddlewareController.verifyTokenAdmin, filmController.restore);
router.delete('/:id', MiddlewareController.verifyTokenAdmin, filmController.destroy);
router.delete('/:id/force', MiddlewareController.verifyTokenAdmin, filmController.forceDestroy);
router.delete('/:id/forces', MiddlewareController.verifyTokenAdmin, filmController.forcesDestroy);
router.get('/:slug', MiddlewareController.verifyToken, filmController.show);
router.get('/test_get', MiddlewareController.verifyTokenAdmin, filmController.test_get);
router.post('/test_post', MiddlewareController.verifyTokenAdmin, filmController.test_post);

module.exports = router;
