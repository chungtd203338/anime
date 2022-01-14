const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

//test
const newsModel = require('../src/app/models/News');
const courseModel = require('../src/app/models/Course');
//end test
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const port = 3000;

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);

//app.use(morgan('combined'))

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

//test
app.get('/newstest', async (req, res) => {
    console.log(req.query);
    var data = await newsModel.find({
        name: { $regex: '.*' + req.query.name + '.*' },
    });
    res.json(data);
});
/*
app.get("/coursetest", async (req, res)=>{
    console.log(req.query)
    if(req.query.name == undefined){
        var data = await courseModel.find()
        res.json(data)
    }
    var data = await courseModel.find({ "name": { $regex: '.*' + req.query.name+ '.*' } })
    res.json(data)
})*/
//end test
