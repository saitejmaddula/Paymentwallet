var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/paytm";
    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
        console.log("sucess conected")}
    });
    res.render('home',{ title: 'home' });
    console.log("hi there");
   //console.log(req);

});
//console.log("hello");
module.exports = router;
