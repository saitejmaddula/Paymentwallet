var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('recharge', { title: 'Express',message:"",pay:"Pay Now" });
});
var order,m;
var p="Pay Now"
router.post('/', function(req, res, next) {
    //res.send('respond with a resource')
        var amount=req.body.Amount;
        var Promocode=req.body.Promocode;
        amount=parseInt(amount);
        if (Promocode=='10')
        {
            order=amount-10;
        }
        else if (Promocode=='20')
        {order=amount-20;}
        p="Pay "+amount;
        m="Promo applied";
        res.cookie('order',order);
    return res.redirect('/paywithwallet');
});

module.exports = router;
