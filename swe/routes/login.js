var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET home page. */
var alert=require('alert-node');
var tri=0;
var left=3;
router.get('/', function(req, res, next) {

    if (tri<=0)
    res.render('login',{ title: 'Login' ,message:""});
    else
        res.render('login',{title:'Login',message:'Invalid credentials  '+left+' tries left'})
});
router.post('/',function (req,res,next) {
    var phone=req.body.phone;
    var pwd=req.body.psw;
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register" );
            dbo.collection("users").findOne({_id:phone,pass:pwd},function (err,result) {
                if (err) {  console.log(err); throw err;  }
                else
                {
                    if (result==null) {
                         tri=1;
                         left--;
                        if (left==0) {
                            tri = 0;
                            left=3;
                            return res.redirect("/register");
                        }

                        return res.redirect("/");

                    }
                    else {
                        res.cookie('phone', phone);
                        // req.cookies['cookie'] to read
                        var a=result;
                        a=a['email'];
                        res.cookie('email',a);
                        return res.redirect("/home");
                    }
                }

            });
            db.close();

        }
    });

});
//console.log("hello");
module.exports = router;
