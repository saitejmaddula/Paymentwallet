var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET users listing. */
router.get('/', function(req, res, next) {
    id = req.cookies['busid'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    MongoClient.connect(dburl, useNewUrlParser = true, function (err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register");
            dbo.collection("buses").findOne({_id: id}, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    s = result;
                    var cost = s["price"];

                    res.render('booktickets', {title: 'Express', cost: cost});

                }
            });
            db.close();

        }

    });
});
router.post('/',function (req,res,next) {
    var notic=req.body.notic;
    notic=parseInt(notic);
    console.log(notic + "notic")
    var id=req.cookies['busid'];
    var order=req.body.total;
    res.cookie('order',order);
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    var avail,s;
    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("busid"+id);
            dbo.collection("buses").findOne({_id: id}, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    s = result;
                    avail=s["available"];
                    avail=parseInt(avail);
                    console.log(avail-notic);
                    dbo.collection("buses").updateOne({_id:id},{$set:{"available":avail-notic}},{upsert: true});
                    console.log("updated succesfully");

                }
            });




        }
        return res.redirect("/paywithwallet");

    });


});
module.exports = router;
