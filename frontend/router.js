var express = require('express');
var router = express.Router();

// Dashboard
router.get('/', function (req, res) {
    res.locals = {  title: 'Movies DB' };
    res.render('Dashboard/dashboard');
})


module.exports = router;