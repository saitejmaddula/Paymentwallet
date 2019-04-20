var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    var id = req.cookies['phone'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    MongoClient.connect(dburl, useNewUrlParser = true, function (err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register");
            dbo.collection("users").findOne({_id: id}, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    var a=[];
                    var car={
                        id:[],
                        quantity:[],
                        price:[]
                    };
                    dbo.collection("users").updateOne({_id:id},{$set:{"cart":car}});


                }
            });
        }
        res.redirect('/paywithwallet');


    });

});

module.exports = router;
