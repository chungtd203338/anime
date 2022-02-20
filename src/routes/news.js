const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/create', MiddlewareController.verifyTokenAdmin, newsController.create);
router.post('/store', MiddlewareController.verifyTokenAdmin, newsController.store);
router.get('/:id/edit', MiddlewareController.verifyTokenAdmin, newsController.edit);
router.post('/handle-form-actions', MiddlewareController.verifyTokenAdmin, newsController.handleFormActions);
router.post(
    '/handle-trash-form-actions',
    MiddlewareController.verifyTokenAdmin,
    newsController.handletrashFormActions,
);
router.put('/:id', MiddlewareController.verifyTokenAdmin, newsController.update);
router.patch('/:id/restore', MiddlewareController.verifyTokenAdmin, newsController.restore);
router.delete('/:id', MiddlewareController.verifyTokenAdmin, newsController.destroy);
router.delete('/:id/force', MiddlewareController.verifyTokenAdmin, newsController.forceDestroy);
router.delete('/:id/forces', MiddlewareController.verifyTokenAdmin, newsController.forcesDestroy);
router.get('/:slug', MiddlewareController.verifyToken, newsController.show);
router.get('/', MiddlewareController.verifyToken, newsController.index);

module.exports = router;