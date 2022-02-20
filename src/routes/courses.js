const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', MiddlewareController.verifyTokenAdmin, courseController.create);
router.post('/store', MiddlewareController.verifyTokenAdmin, courseController.store);
router.get('/:id/edit', MiddlewareController.verifyTokenAdmin, courseController.edit);
router.post('/handle-form-actions', MiddlewareController.verifyTokenAdmin, courseController.handleFormActions);
router.post(
    '/handle-trash-form-actions',
    MiddlewareController.verifyTokenAdmin,
    courseController.handletrashFormActions,
);
router.put('/:id', MiddlewareController.verifyTokenAdmin, courseController.update);
router.patch('/:id/restore', MiddlewareController.verifyTokenAdmin, courseController.restore);
router.delete('/:id', MiddlewareController.verifyTokenAdmin, courseController.destroy);
router.delete('/:id/force', MiddlewareController.verifyTokenAdmin, courseController.forceDestroy);
router.delete('/:id/forces', MiddlewareController.verifyTokenAdmin, courseController.forcesDestroy);
router.get('/:slug', MiddlewareController.verifyToken, courseController.show);

module.exports = router;
