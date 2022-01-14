const News = require('../models/News');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class NewsController {
    index(req, res, next) {
        News.find({})
            .then((news) => {
                res.render('news', {
                    news: multipleMongooseToObject(news),
                });
            })
            .catch(next);
    }

    show(req, res, next) {
        News.findOne({ slug: req.params.slug })
            .then((news) => {
                res.render('news/show', { news: mongooseToObject(news) });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('news/create');
    }

    store(req, res, next) {
        const news = new News(req.body);
        news.save()
            .then(() => res.redirect('/news'))
            .catch((error) => {});
    }

    edit(req, res, next) {
        News.findById(req.params.id)
            .then((news) =>
                res.render('news/edit', {
                    news: mongooseToObject(news),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        News.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    }

    destroy(req, res, next) {
        News.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forceDestroy(req, res, next) {
        News.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forcesDestroy(req, res, next) {
        News.deleteMany({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restore(req, res, next) {
        News.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                News.delete({ _id: { $in: req.body.newsIds } })
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
                News.restore({ _id: { $in: req.body.newsIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteMany':
                News.deleteMany({ _id: { $in: req.body.newsIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid!' });
        }
    }
}

module.exports = new NewsController();
