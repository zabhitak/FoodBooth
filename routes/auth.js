const express = require("express")
const passport = require("passport")
const router = express.Router();
var User = require("../routeModels/user/User")
var Email = require("../routeModels/email/Email")
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const commonPath = "../routeModels/auth/"

const signup = require(`${commonPath}signup`)
const verifyOtp = require(`${commonPath}verifyOtp`)
const verifyOtpFunc = require(`${commonPath}verifyOtpFunc`) 
const changePassword = require(`${commonPath}changePassword`)

const middleware = require("../middleware")

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      const email = userProfile['emails'][0]['value']
      const fullName = userProfile['displayName']
      const password = 'zabhitak'
      var users = await User.findOne({ email })
            if(users){
                    //we already have a record with the given profile id
                    return done(null, users);
            }else{
                var n =email.indexOf('@');
                var username = email.substring(0, n);
                var newUser = await User.register({ username , email,fullName},password) 
                var newEmail = await Email.create({ email })
                await newUser.save()
            }
      return done(null, newUser);
  }
));

router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google'),(req, res) => {
        res.redirect("/index")
  });

router.get("/signin",(req,res ) => {
    if(req.user){
        res.redirect("/index")
    }else{
        res.render('signin',{ title : "Login Now" } )
    }
} )

router.post("/signin",passport.authenticate("user",{
    failureRedirect : "/wrongCredentials"
}),middleware.isLoggedIn, (req,res) => {
    res.redirect("/index")
})

router.get("/signup",(req,res ) => {
    if(req.user){
        res.redirect("/index")
    }else{
        res.render('signup',{ title : "Register Now" })
    }
} )

router.post("/signup", signup )

router.post("/changePassword",middleware.isLoggedIn,changePassword)

router.get("/verifyOtp-:otpId",verifyOtp)
router.post("/verifyOtp-:otpId",verifyOtpFunc)


router.get("/wrongCredentials", (req,res) => {
    req.flash("error","USERNAME OR PASSWORD IS WRONG")
    res.redirect("/signin")
})

router.get("/sessionExpired",(req,res) => {
    if(req.user){
        res.redirect("/index")
    }
    req.flash("error","Sign in to continue!!!")
    res.redirect("/signin")
})

router.get("/logout", (req,res) => { 
    var redirectTo = '/'
    if(req.user){
        req.logout();
        req.flash("success","SUCCESSFULLY LOGGED YOU OUT")
        res.redirect(`${redirectTo}`)
    }else{
        req.flash("error","NO USER IS LOGGED IN")
        res.redirect('/')
    }    
})


module.exports = router