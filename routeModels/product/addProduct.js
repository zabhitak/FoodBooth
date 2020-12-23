var User = require("../user/User")

indexRoute = (req,res) => {
    User.findById(req.user.id)
    .exec(function(err,user) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signin")
        }else{
            if(user.role == 'User' ){
                res.redirect("/index")
            }else{
                res.render("addProduct",{ title : "Add Product", user })
            }
        }
    })
}
module.exports = indexRoute