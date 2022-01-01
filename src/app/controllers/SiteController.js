const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    async search(req, res) {
        console.log(req.query.name)
        var courses = await Course.find({ "name": { $regex: '.*' + req.query.name+ '.*' } })
        res.render('home', {
            courses: multipleMongooseToObject(courses),
        });
    }
}

module.exports = new SiteController();
