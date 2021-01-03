var Admin = require("../Admin")
var Product = require("./Product")

editProduct = async (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        const { productId } = req.params
        try {
            var user = await Admin.findById(req.user._id)
    
            var product = await Product.findById(productId)
    
            if(user.role == 'User' ){
                res.redirect("/index")
            }else{
                res.render("admin/editProduct",{ title : "Edit Product", user, product })
            }
    
        } catch (err) {
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }
    }
}
module.exports = editProduct