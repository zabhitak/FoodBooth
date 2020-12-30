var User = require("../user/User")

settingsRoute = (req,res) => {
    User.findById(req.user._id)
    .exec(function(err,user) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signin")
        }else{
            res.render("settings",{ user : user, title : "Settings" })
        }
    })
}
module.exports = settingsRoute