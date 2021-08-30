let express = require('express');
let path = require('path');
let flash = require('connect-flash');
var session = require('express-session');

require('./db/mongoose');
let router = require('./router.js');

let app = express();

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'moviedb',
  resave: false,
  saveUninitialized: false
}));

app.use(flash())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Access public folder from root
app.use('/public', express.static('public'));
app.get('/layouts/', function (req, res) {
  res.render('view');
});

//For set layouts of html view
let expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Add Route file with app
app.use('/', router);

app.listen(process.env.PORT, function () {
  console.log('Server is up and running on PORT ' + process.env.PORT);
});
