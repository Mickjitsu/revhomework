var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const accessKey = process.env.ACCESS_KEY;



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
app.use(cors({
  origin: '*', 
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/create-token', (req, res) => {
  createToken()
      .then(tokenData => {
          console.log('Server-side response data:', tokenData); 
          res.json(tokenData); 
          console.log('Response successful');
      })
      .catch(error => {
          console.error('Error in /create-token route:', error);
          res.status(500).send('Internal Server Error');
      });
});


  function createToken() {
    console.log('AccessKey:', accessKey)
    let data = JSON.stringify({
      "amount": 1,
      "currency": "GBP"
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sandbox-merchant.revolut.com/api/orders',
      headers: { 
        'Content-Type': 'application/json', 
        'Revolut-Api-Version': '2024-05-01', 
        'Accept': 'application/json', 
        'Authorization': `Bearer sk_zo5QXdUHTMkWLtBkLFqA6wdLnpyjNYt2SfsRIibi9NdeFjHCwdKoYFvSQwueFnMH`
      },
      data : data
    };
    
    return axios(config)
        .then(response => {
            console.log('Server-side response data:', JSON.stringify(response.data));
            return response.data; 
        })
        .catch(error => {
            console.error('Server-side error:', error);
            throw error; 
  }
        )}

app.use(function(req, res, next) {
    next(createError(404));
  });
  

  app.use(function(err, req, res, next) {
    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  

    res.status(err.status || 500);
    res.render('error');
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
