var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user')

module.exports = function(passport){

  passport.serializeUser(function(user, done){
    done(null, user._id);
  })
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user)
    });
  });

  passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
      //console.log( "REQUEST", req)
      //console.log("EMAIL", email)
      //console.log('PASSWORD', password)
      //console.log("DONE", done)
        process.nextTick(function() {
          User.findOne({ 'local.email' :  email }, function(err, user) {
              if (err){
                  return done(err);
              }
              if (user) {
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              }
              else {

                  var newUser = new User();
                  newUser.local.email = email;
                  newUser.local.password = newUser.generateHash(password);
                  newUser.isAdmin = false;
                  newUser.save(function(err) {
                      if (err){
                        console.log(err);
                      }
                      return done(null, newUser);
                  });
              }
          });
        });
    }));


  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done){

    //console.log( "REQUEST", req)
    //console.log("EMAIL", email)
    //console.log('PASSWORD', password)
    //console.log("DONE", done)

    User.findOne({'local.email' : email}, function(err, user){
      console.log(done)
      if (err){
        return done(err)
      }
      if (!user){
        return done(null, false, req.flash('loginMessage', 'This User Does Not Exist'));
      }
      if (!user.validPassword(password)){
        return done(null, false, req.flash('loginMessage', 'Wrong Credentials'));
      }
      // all is well so we return a user
      done(null, user);
    });
  }));
};
