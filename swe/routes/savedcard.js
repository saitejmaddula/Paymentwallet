var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
    id = req.cookies['phone'];
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
                    s = result;
                    cardNumber = s['cardNumber'];
                    exm=s['exm'];
                    exy=s['exy'];

                    res.render('savedcard', {
                        dcardNumber:cardNumber,
                        dexm:exm,
                        dexy:exy,

                    });

                }
            });
            db.close();

        }


    });
});
router.post('/',function (req,res,next) {
    var acardNumber = req.body.cardNumber;
    var aexm = req.body.exm;
    var aexy = req.body.exy;
    var id = req.cookies['phone'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";

    MongoClient.connect(dburl, useNewUrlParser = true, function (err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            console.log("sucess conected in wallet");
            // s=dbo.collection("users").findOne({id:})
            dbo.collection("users").updateOne({_id: id}, {
                $set: {
                    "cardNumber": acardNumber,
                    "exm": aexm,
                    "exy": aexy
                }
            }, {upsert: true});
            console.log("updated succesfully");
            // var seconds=15;
            // var waitTill = new Date(new Date().getTime() + seconds * 1000);
            //while(waitTill > new Date()){

            //}


        }
        return res.redirect("/home");

    });

});
    module.exports = router;
