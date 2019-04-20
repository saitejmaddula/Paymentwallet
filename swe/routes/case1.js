var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('case1', { title: 'Express' });
});
router.post('/',function (req,res,next) {
    var quantity=req.body.quantity;
    var pid="case1";
    var price=299;

    var id=req.cookies['phone'];

    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";

    MongoClient.connect(dburl, useNewUrlParser=true,function(err, db) {

        if(err) {  console.log(err); throw err;  }
        else {
            var dbo = db.db("paytm");
            console.log("sucess conected in mobile1" );
            // s=dbo.collection("users").findOne({id:})
            dbo.collection("users").updateOne({_id:id},{$push:{"cart.id":pid,"cart.quantity":quantity,"cart.price":price}});
            console.log("updated succesfully");



        }
        return res.redirect("/shopping");

    });


});
module.exports = router;
