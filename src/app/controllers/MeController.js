const User = require('../models/User');
const Film = require('../models/Film');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    storedFilms(req, res, next) {
        Promise.all([
            Film.find({}).sortable(req),
            Film.countDocumentsDeleted(),
        ])
            .then(([films, deletedCount]) =>
                res.render('me/stored-films', {
                    deletedCount,
                    films: multipleMongooseToObject(films),
                }),
            )
            .catch(next);
    }

    trashFilms(req, res, next) {
        Film.findDeleted({})
            .sortable(req)
            .then((films) =>
                res.render('me/trash-films', {
                    films: multipleMongooseToObject(films),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();