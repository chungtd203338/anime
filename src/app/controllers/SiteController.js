const Film = require('../models/Film');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        Film.find({})
            .then((films) => {
                res.render('home', {
                    films: multipleMongooseToObject(films),
                });
            })
            .catch(next);
    }

    async search(req, res) {
        console.log(req.query.name);
        var films = await Film.find({
            name: { $regex: req.query.name, $options: 'i' },
        });
        res.render('home', {
            films: multipleMongooseToObject(films),
        });
    }
}

module.exports = new SiteController();
