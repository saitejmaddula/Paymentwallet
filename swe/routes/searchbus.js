var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('searchbus', { title: 'Express' });
});
router.post('/', function(req, res, next) {
    //res.send('respond with a resource');
    var from=req.body.From;
    var to=req.body.To;
    var date=req.body.Date;
    res.cookie('from',from);
    res.cookie('to',to);
    res.cookie('date',date);
    return res.redirect('/showbus');
});
module.exports = router;

