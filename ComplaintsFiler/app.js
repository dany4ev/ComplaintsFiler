var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware registrations
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// image file uploaded assets
app.use(express.static(path.join(__dirname, 'uploads')));

// public assets
app.use(express.static(path.join(__dirname, 'public')));

// enable cors based ajax requests
app.use(require('cors')());

// controller routes
app.use('/', require('./routes/index'));
app.use('/complaints', require('./routes/complaints'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

// listen for requests
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;