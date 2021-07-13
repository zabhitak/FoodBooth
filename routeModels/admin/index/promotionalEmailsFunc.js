var Admin = require("../Admin")
var Email = require("../../email/Email")

const nodemailer = require("nodemailer")

const user = process.env.ADMIN_ID 
const pass = process.env.ADMIN_PASSWORD

const auth = {
    user ,
    pass  
}


promotionalEmailsFunc = async (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        try {
            var admin = await Admin.findById(req.user._id)
            
            var allEmail = await Email.find({})

            var { subject, text } = req.body
            const smtpTrans = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth 
            })

            await allEmail.forEach( async eachEmail => {
                var { email } = eachEmail
                const mailOpts = {
                    from: "FoodBooth",
                    to : email,
                    subject,
                    text
                }
                var response = await smtpTrans.sendMail(mailOpts)
            } )

            req.flash("success","Email sent successfully !!!")
            res.redirect("/admin/index")

        } catch (error) {
            console.log(error)
            req.flash("error","Cannot send Email right now")
            res.redirect("/admin/index")
        }
    }
}
module.exports = promotionalEmailsFunc