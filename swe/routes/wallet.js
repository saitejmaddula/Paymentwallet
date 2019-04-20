var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET home page. */
var wallet,name;
router.get('/', function(req, res, next) {
    //res.render('wallet', { title: 'Express',wallet:100 });
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
                    wallet = s['wallet'];
                    name=s['name'];
                    res.render('wallet', {
                        dwallet: wallet,
                        dname:name

                    });

                }
            });
            db.close();

        }


    });
});
router.post('/',function (req,res,next) {
    var amoney=req.body.amoney;
    var id=req.cookies['phone'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";

    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("sucess conected in wallet" );
           // s=dbo.collection("users").findOne({id:})
            var newamt=parseInt(wallet)+parseInt(amoney);
            dbo.collection("users").updateOne({_id:id},{$set:{"wallet":newamt}},{upsert: true});
            console.log("updated succesfully");
            // var seconds=15;
            // var waitTill = new Date(new Date().getTime() + seconds * 1000);
            //while(waitTill > new Date()){

            //}


        }
        return res.redirect("/payment");

    });


});

module.exports = router;
