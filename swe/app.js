var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter=require('./routes/register');
var homeRouter=require('./routes/home');
var profileRouter=require('./routes/profile');
var walletRouter=require('./routes/wallet');
var creditcardRouter=require('./routes/creditcard');
var netbankingRouter=require('./routes/netbanking');
var paymentRouter=require('./routes/payment');
var savedcardRouter=require('./routes/savedcard');
var shoppingRouter=require('./routes/shopping');
var productsRouter=require('./routes/products');
var mobile1Router=require('./routes/mobile1');
var mobile2Router=require('./routes/mobile2');
var mobile3Router=require('./routes/mobile3');
var mobile4Router=require('./routes/mobile4');
var case1Router=require('./routes/case1');
var case2Router=require('./routes/case2');
var case3Router=require('./routes/case3');
var case4Router=require('./routes/case4');
var cartRouter=require('./routes/cart');
var rechargeRouter=require('./routes/recharge');
var paywithwalletRouter=require('./routes/paywithwallet');
var clearcartRouter=require('./routes/clearcart');
var searchbusRouter=require('./routes/searchbus');
var showbusRouter=require('./routes/showbus');
var addbusRouter=require('./routes/addbus');
var bookticketsRouter=require('./routes/booktickets');
var sucessRouter=require('./routes/sucess');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/',loginRouter);
app.use('/register',registerRouter);
app.use('/users', usersRouter);
app.use('/home',homeRouter);
app.use('/profile',profileRouter);
app.use('/wallet',walletRouter);
app.use('/creditcard',creditcardRouter);
app.use('/netbanking',netbankingRouter);
app.use('/payment',paymentRouter);
app.use('/savedcard',savedcardRouter);
app.use('/shopping',shoppingRouter);
app.use('/products',productsRouter);
app.use('/mobile1',mobile1Router);
app.use('/mobile2',mobile2Router);
app.use('/mobile3',mobile3Router);
app.use('/mobile4',mobile4Router);
app.use('/case1',case1Router);
app.use('/case2',case2Router);
app.use('/case3',case3Router);
app.use('/case4',case4Router);
app.use('/cart',cartRouter);
app.use('/recharge',rechargeRouter);
app.use('/paywithwallet',paywithwalletRouter);
app.use('/clearcart',clearcartRouter);
app.use('/searchbus',searchbusRouter);
app.use('/showbus',showbusRouter);
app.use('/addbus',addbusRouter);
app.use('/booktickets',bookticketsRouter);
app.use('/sucess',sucessRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
