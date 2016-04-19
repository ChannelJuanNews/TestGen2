// app/routes.js

module.exports = function(app, passport) {

    /*All  our get routes*/
    app.get('/', function(req, res) {
      if (req.isAuthenticated()){
        res.render('profile.ejs', {user : req.user});
      }
      else{
        res.render('index.ejs', {user : null}); // load the index.ejs file
      }
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/profile',isLoggedIn, function(req, res){
      res.render('profile.ejs');
    })

    /*All our post routes*/
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/',
      failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/',
      failureFlash : true
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
}


function isAdmin(req, res, next) {
  return false;
}
