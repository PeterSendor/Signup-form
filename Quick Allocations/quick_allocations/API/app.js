var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql')

var indexRouter = require('./routes/index');
var assignRouter = require('./routes/assign');
var inputAllocations = require("./routes/inputAllocations");
var allocate = require('./routes/allocate');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password  : 'phero01?!',     // your root username
  database : 'HRallocations'   // the name of your db
});

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/assign', assignRouter);
app.use('/inputAllocations', inputAllocations);
app.use('/allocate', allocate);


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