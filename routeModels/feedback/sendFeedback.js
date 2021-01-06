var Feedback = require("./Feedback")
var Email = require("../email/Email")

const sendFeedback = async (req,res) => {
    try {
        var {email , name , address, cost, message } = req.body
        var emailExists = await Email.find({ email  })
        if(!emailExists){
            var newEmail = await Email.create({ email })
        }
        var newFeedback = await Feedback.create( {email , name , address, cost, message } )
        req.flash("success","Feedback sent successfully")
        res.redirect("/")
    } catch (error) {
        console.log(error)
        req.flash("error","Cannot send feedback right now")
        res.redirect("/")
    }
}

module.exports = sendFeedback