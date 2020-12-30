var Admin = require("../Admin")

myProfile = (req,res) => {
    Admin.findById(req.user._id)
    .exec(function(err,admin) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }else{
            res.render("admin/profile",{ user : admin, title : "My Profile" })
        }
    })
}
module.exports = myProfile