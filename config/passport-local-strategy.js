const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/users');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email,password, done){
        User.findOne({email:email},function(err,user){
            if(err){
                return done(err);
            }
            if(!user || user.password != password){
                //window.alert("Incorrect password");
               return done(null,false);
              
            }
            return done(null,user);
        })
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){

        }
        return done(null,user);
    })
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;



