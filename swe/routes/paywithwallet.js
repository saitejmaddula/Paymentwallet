var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var order;
var wallet;
/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
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
                    console.log("good");
                    s = result;
                    order=req.cookies['order'];
                    wallet=s['wallet'];
                    var w = "Wallet Balance:"+s['wallet'];
                    res.render('paywithwallet', { title: 'Express',dwallet:w,order:order});

                }
            });
            db.close();

        }


    });

});
router.post('/',function (req,res,next) {
    var use=req.body.use;
    var id=req.cookies['phone'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";

    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            console.log("sucess conected in wallet");
            var order = req.cookies['order'];
            order = parseInt(order);
            console.log(use);
            if (use == 'Checked') {
                var newamt = parseInt(wallet) - parseInt(order);
                console.log(newamt);
                if (newamt >= 0) {
                    dbo.collection("users").updateOne({_id: id}, {$set: {"wallet": newamt}}, {upsert: true});
                    return res.redirect('/sucess');
                }
                else {

                    dbo.collection("users").updateOne({_id: id}, {$set: {"wallet": 0}}, {upsert: true});
                    return res.redirect('/payment');
                }
            }
            else{
                return res.redirect('/payment');
            }
            console.log("updated succesfully");
        }
    })

        });
module.exports = router;
