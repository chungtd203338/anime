const Film = require('../models/Film');
const { mongooseToObject } = require('../../util/mongoose');

class FilmController {
    show(req, res, next) {
        console.log(req.params);
        Film.findOne({ slug: req.params.slug })
            .then((film) => {
                console.log(film);
                res.render('films/show', {
                    film: mongooseToObject(film),
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('films/create');
    }
    // "/filmtest"

    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDDC5AcZRCNiOzGAUfnhRR6awZSpw`;
        const film = new Film(req.body);
        film
            .save()
            .then(() => res.redirect(`/me/stored/films`))
            .catch((error) => {});
    }

    edit(req, res, next) {
        Film.findById(req.params.id)
            .then((film) =>
                res.render('films/edit', {
                    film: mongooseToObject(film),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Film.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/films'))
            .catch(next);
    }

    destroy(req, res, next) {
        Film.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forceDestroy(req, res, next) {
        Film.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forcesDestroy(req, res, next) {
        Film.deleteMany({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restore(req, res, next) {
        Film.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Film.delete({ _id: { $in: req.body.filmIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid!' });
        }
    }

    handletrashFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Film.restore({ _id: { $in: req.body.filmIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteMany':
                Film.deleteMany({ _id: { $in: req.body.filmIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid!' });
        }
    }

    test_get(req, res) {
        res.json({
            hello: 'world'
          });
    }

    test_post(req, res) {
        if (req.body.name) {
            res.json({
              name: req.body.name
            });
          } else {
            res.status(400).json({
              message: 'name is a required param'
            });
          }
    }
}

module.exports = new FilmController();