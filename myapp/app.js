var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');

const port = 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/create-token', (req, res) => {
    createToken()
      .then(tokenData => {
        res.json(tokenData); // Send JSON response
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
  });


  function createToken() {
    const data = JSON.stringify({
      "amount": 500,
      "currency": "GBP"
    });
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sandbox-merchant.revolut.com/api/orders',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': 'Bearer sk_1ek7aDJefqKpmisI0Whgi59GBtQkTRivOFEQcHZui10G2_-LFS-oinjBMeHPi79r'
      },
      data: data
    };
  
    return axios(config)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating token:', error);
        throw new Error('Error creating token');
      });
  }
  
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
