var Admin = require("../Admin")

editProfile = (req,res) => {
    Admin.findById(req.user._id)
    .exec(function(err,admin) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }else{
            res.render("admin/editProfile",{ user : admin, title : "Edit Profile" })
        }
    })
}
module.exports = editProfile