var Admin = require("../Admin")

addProduct = (req,res) => {
    Admin.findById(req.user._id)
    .exec(function(err,user) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }else{
            if(user.role == 'User' ){
                res.redirect("/index")
            }else{
                res.render("admin/addProduct",{ title : "Add Product", user })
            }
        }
    })
}
module.exports = addProduct