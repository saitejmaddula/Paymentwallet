var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
    id = req.cookies['phone'];
    console.log(id);
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
                    s=result;
                    var name=s['name'];
                    var phone=s['phone'];
                    var email=s['email'];
                    var address=s['address'];
                    var KYC=s['KYC'];
                    var DOB=s['DOB'];
                    res.render('profile',{dname:name,dphone:phone,demail:email,daddress:address,dKYC:KYC,dDOB:DOB});

                }
            });
            db.close();

        }


    });
});
router.post('/',function (req,res,next) {
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var DOB=req.body.DOB;
    var address=req.body.address;
    var file=req.body.file;
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";

    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register" );
            dbo.collection("users").updateOne({_id:phone},{$set:{"name":name,"phone":phone,"email":email,address:address,
                "KYC":"Not Verified","DOB":DOB,"file":file}},{upsert: true});
            console.log("updated succesfully");
            // var seconds=15;
            // var waitTill = new Date(new Date().getTime() + seconds * 1000);
            //while(waitTill > new Date()){

            //}


        }
        return res.redirect("/home");

            });


        });

//console.log("hello");
module.exports = router;
