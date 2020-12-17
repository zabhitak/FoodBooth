const express = require("express")
const passport = require("passport")
const router = express.Router();

const samePath = "../routeModels/auth/"

const signup = require(`${samePath}signup`)
const verifyOtp = require(`${samePath}verifyOtp`)
const verifyOtpFunc = require(`${samePath}verifyOtpFunc`) 

const middleware = require("../middleware")

router.get("/signin",(req,res ) => {
    if(req.user){
        res.redirect("/index")
    }
    res.render('signin',{ title : "Login Now" } )
} )

router.post("/signin",passport.authenticate("local",{
    failureRedirect : "/wrongCredentials"
}),middleware.isLoggedIn, (req,res) => {
    res.redirect("/index")
})

router.get("/signup",(req,res ) => {
    if(req.user){
        res.redirect("/index")
    }
    res.render('signup',{ title : "Register Now" })
} )

router.post("/signup", signup )

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