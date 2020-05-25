require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var apiProductRoute = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', apiProductRoute);
// cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));
// Use static files
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {
    name: 'Nguyen Duy',
  });
});

app.use('/users', authMiddleware.requiredAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
// app.use(csurf({ cookie: true }));
app.use('/transfer', authMiddleware.requiredAuth, transferRoute);

app.listen(port, function () {
  console.log('Server is listening port: ' + port);
});
