var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('addbus', { title: 'Express' });
});

module.exports = router;
router.post('/',function (req,res,next) {
    var id=req.body.Id;
    var from=req.body.From;
    var to=req.body.To;
    var date=req.body.Date;
    var price=req.body.Price;
    var available=req.body.Available;

    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("sucess conected in register" );
            dbo.collection("buses").insertOne({"_id":id,"from":from,"to":to,"date":date,"price":price,"available":available,
                });
            console.log("inserted succesfully");
            db.close();
            return res.redirect("/addbus");

        }
    });
    //console.log(email);


});