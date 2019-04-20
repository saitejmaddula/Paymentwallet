var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register',{ title: 'Register' });

});
router.post('/',function (req,res,next) {
    var name=req.body.name;
    var pwd=req.body.psw;
    var phone=req.body.phone;
    var email=req.body.email;
    var pass=req.body.psw;

    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register" );
            dbo.collection("users").insertOne({"_id":phone,"name":name,"phone":phone,"email":email,"pass":pass,"address":"",
                "KYC":"Not Verified","DOB":"","wallet":0,'cardNumber':"","exm":"","exy":""});
            console.log("inserted succesfully");
            db.close();
            return res.redirect("/");

        }
    });
   //console.log(email);


});
//console.log("hello");
module.exports = router;
