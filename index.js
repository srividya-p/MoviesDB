let app = require('express')();
let express = require('express');
let path = require('path');
let http = require('http').Server(app);
let bodyParser = require('body-parser');
let router = require('./router.js');

// Access public folder from root
app.use('/public', express.static('public'));
app.get('/layouts/', function(req, res) {
  res.render('view');
});

//For set layouts of html view
let expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Add Route file with app
app.use('/', router); 

http.listen(process.env.PORT, function(){
  console.log('Server is up and running on PORT '+ process.env.PORT);
});
