var Admin = require("../Admin")

promotionalEmails = (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        Admin.findById(req.user._id)
        .exec(function(err,admin) {
            if(err){
                console.log(err)
                req.flash("error","Unexpected Error Occured!!!")
                res.redirect("/admin")
            }else{
                res.render("admin/promotionalEmails",{ user : admin, title : "Promotional Email" })
            }
        })
    }
}
module.exports = promotionalEmails