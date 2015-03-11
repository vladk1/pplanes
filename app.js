var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);
app.get('/', function(req,res){
    res.sendfile('./public/layout/home.html');
});
app.get('/start_questions', function(req,res){
    res.sendfile('./public/layout/start_questions.html');
});
app.get('/planes', function(req,res){
    res.sendfile('./public/layout/paper_planes_instr.html');
});
app.get('/uncertainty', function(req,res){
    res.sendfile('./public/layout/uncertainty_theory.html');
});
app.get('/approximation', function(req,res){
    res.sendfile('./public/layout/uncertainty_approximation.html');
});
app.get('/analysis', function(req,res){
    res.sendfile('./public/layout/monte_carlo_method.html');
});
app.get('/results', function(req,res){
    res.sendfile('./public/layout/results.html');
});
app.get('/choose_plane', function(req,res){
    res.sendfile('./public/layout/choose_plane.html');
});
app.get('/game_build_plane', function(req,res){
    res.sendfile('./public/layout/game_build_plane.html');
});

app.get('/flight_distance', function(req,res){
    res.sendfile('./public/layout/flight_distance.html');
});
app.get('/score', function(req,res){
    res.sendfile('./public/layout/score.html');
});
app.get('/end_questions', function(req,res){
    res.sendfile('./public/layout/end_questions.html');
});
app.get('/questions_result', function(req,res){
    res.sendfile('./public/layout/questions_result.html');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
