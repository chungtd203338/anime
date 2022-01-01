const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    storedCourses(req, res, next) {

        Promise.all([
            Course.find({}).sortable(req), 
            Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findDeleted({}).sortable(req)
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    storedNews(req, res, next) {

        Promise.all([
            News.find({}).sortable(req),
            News.countDocumentsDeleted()])
            .then(([news, deletedCount]) =>
                res.render('me/stored-news', {
                    deletedCount,
                    news: multipleMongooseToObject(news),
                }),
            )
            .catch(next);
    }

    trashNews(req, res, next) {
        News.findDeleted({}).sortable(req)
            .then((news) =>
                res.render('me/trash-news', {
                    news: multipleMongooseToObject(news),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
