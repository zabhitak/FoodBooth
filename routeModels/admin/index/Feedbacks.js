var Admin = require("../Admin")
var Feedback = require("../../feedback/Feedback")

Feedbacks = async (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        try {
            var admin = await Admin.findById(req.user._id)
            var feedbacks = await Feedback.find({})
            res.render("admin/feedbacks",{ user : admin, data : feedbacks, title : "Feedbacks" })
        } catch (error) {
            console.log(error)
            req.flash("error","Cannot fetch data from database")
            res.redirect("/admin/index")
        }
    }
  
}
module.exports = Feedbacks