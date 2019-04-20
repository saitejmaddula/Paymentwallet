var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var carti,cartp,cartq;
var s;
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
                    s=result;
                    carti=s['cart']['id'];
                    cartp=s['cart']['price'];
                    cartq=s['cart']['quantity'];
                    console.log(carti);
                    var total=0;
                    data=[];
                    var labels=[];
                    for(i=0;i<carti.length;i++)
                    {
                        total=total+cartp[i]*cartq[i];
                        data[i]=[carti[i],cartp[i],cartq[i]];
                        labels[i]="label"+i;

                    }
                    res.cookie("order",total-100);
                    res.render('cart', { title: 'Express',dcarti:carti,dcartp:cartp,dcartq:cartq,total:total,labels:labels});
                }
            });
            db.close();

        }


    });

});
router.post('/',function (req,res,next) {
    var amoney = req.body.amoney;
    var id = req.cookies['phone'];
    var MongoClient = mongodb.MongoClient;
    var dburl = "mongodb://localhost:27017/";
    var del=req.body.labels;
    del=parseInt(del[5]);

    MongoClient.connect(dburl, useNewUrlParser = true, function (err, db) {

        if (err) {
            console.log(err);
            throw err;
        } else {
            var dbo = db.db("paytm");
            console.log("sucess conected in wallet");
            console.log(cartq);
            var s="cart.id."+del;
            console.log("hey there");
            dbo.collection("users").findOne({_id: id}, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log("good");
                    s = result;
                    carti = s['cart']['id'];
                    cartp = s['cart']['price'];
                    cartq = s['cart']['quantity'];
                }
            }
            );
            cartq.splice(del,1);
            cartp.splice(del,1);
            carti.splice(del,1);

           dbo.collection("users").updateOne({_id:id},{$set:{"cart.id":carti}});
            dbo.collection("users").updateOne({_id:id},{$set:{"cart.quantity":cartq}});
            dbo.collection("users").updateOne({_id:id},{$set:{"cart.price":cartp}});


        }
        return res.redirect("/cart");

    });

});
module.exports = router;
