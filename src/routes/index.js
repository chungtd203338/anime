const meRouter = require('./me');
const filmsRouter = require('./films');
const siteRouter = require('./site');
const userRouter = require('./user');

function route(app) {
    app.use('/me', meRouter);
    app.use('/films', filmsRouter);

    app.use('/', siteRouter);
    app.use('/user', userRouter);
}

module.exports = route;
