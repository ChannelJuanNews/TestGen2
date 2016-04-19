/*This is the server that we wil use to fuck shit up ma nigga*/
/*These are also all our dependencies for our application*/
var express = require('express');
var app = express();
var port = process.env.PORT || 8082;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('express-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var sessionStore = new expressSession.MemoryStore;
var db = require('./config/database.js');

mongoose.connect(db.url, function(err){
  if (err){
    console.log(err);
  }
  console.log('connected to mongoose');
})

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('views'));
app.use(express.static('bower_components'));

app.set('view engine', 'ejs');

app.use(expressSession({
  cookie : {maxAge : 60000},
  store  : sessionStore,
  secret : 'zybooks',
  resave : true,
  saveUninitialized : true
}));
app.use(flash());

app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


app.use(passport.initialize());
app.use(passport.session());



require('./config/passport')(passport) // this configures passport
require('./app/routes.js')(app, passport) // this configures our routes

app.listen(port, function(){
  console.log('we in nigga at port', port);
})
