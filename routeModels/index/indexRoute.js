var User = require("../user/User")

indexRoute = (req,res) => {
    User.findById(req.user.id)
    .exec(function(err,user) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signin")
        }else{
            res.render("index",{ user : user, title : "My Profile" })
        }
    })
}
module.exports = indexRoute