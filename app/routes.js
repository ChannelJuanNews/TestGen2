// app/routes.js
module.exports = function(app, passport) {

    /*All  our get routes*/
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/login')

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    /*All our post routes*/
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile',
      failureRedirect : '/',
      failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile',
      failureRedirect : '/',
      failureFlash : true
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isAdmin(req, res, next) {
  return false;
}
