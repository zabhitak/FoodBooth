var User = require("../user/User")
var OTP = require("../OTP/OTP")

const nodemailer = require("nodemailer")

const user = process.env.EMAIL_ID 
const pass = process.env.PASSWORD

const auth = {
    user ,
    pass  
}

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


const signup = async (req,res) => {
    const {username,email,password,confirmPassword} = req.body
    
    if(password !== confirmPassword ){
        req.flash("error","PASSWORD ARE NOT THE SAME")
        res.redirect("/signup")
    }else{
        try{
            var users = await User.findOne({ email })
            if(users){
                req.flash("error","EMAIL ALREADY IN USE")
                res.redirect("/signup")
            } 
            
            users = await User.findOne({ username })
            if(users){
                req.flash("error","USERNAME ALREADY IN USE")
                res.redirect("/signup")
            }

            const smtpTrans = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth 
            })
            var otp = ""
            for(var i = 0 ; i < 6; i++ ){
                var randomIndex = Math.floor(Math.random() * 62)
                otp += characters[randomIndex]
            }
    
            const mailOpts = {
                from: "Natto",
                to : email,
                subject: 'Natto | Verify Account',
                text: "Hi," + "\n\n" + 
                "To proceed further with your account verification at Natto , Please use the OTP given below.This OTP is only valid for 60 minutes."
                + "\n\n" + 
                "OTP : " + otp + " \n\n" + 
                "Regards,\n" +
                "Team ,Natto"
            }
    
            var response = await smtpTrans.sendMail(mailOpts)
            var otpCreated = await OTP.create({
                timeOfSending : Date.now(),
                otp ,
                username,
                email,
                password,
            })
            req.flash("success",`Enter OTP sent to provided email`)
            res.redirect(`/verifyOtp-${otpCreated.id}`)
        }
        catch(err){
            console.error(err)
            req.flash("error","Cannot Verify Your Account !!!")
            res.redirect("/signup")
        }
    }
}
module.exports = signup