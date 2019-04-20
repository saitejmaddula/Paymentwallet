var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET users listing. */
var data="";
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    var from=req.cookies['from'];
    var to=req.cookies['to'];
    var date=req.cookies['date'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    MongoClient.connect(dburl, useNewUrlParser = true, function (err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register");
            dbo.collection("buses").find({from:from,to:to,date:date}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {

                    data=result;
                    var labels=[];
                    for(i=0;i<data.length;i++)
                    {
                        labels[i]="label"+i;

                    }
                }
                res.render('showbus',{data:data,labels:labels});
            });
            db.close();

        }


    });


});
router.post('/',function (req,res,next) {
    var id = req.cookies['phone'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    var del=req.body.labels;
    del=parseInt(del[5]);
console.log("hey buddy");
    MongoClient.connect(dburl, useNewUrlParser = true, function (err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            var busid=data[del]["_id"];
            res.cookie('busid',busid);

        }
        return res.redirect("/booktickets");

    });

});
module.exports = router;
