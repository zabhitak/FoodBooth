var User = require("../user/User")
var Product = require("./Product")

editProduct = async (req,res) => {
    const { productId } = req.params
    try {
        var user = await User.findById(req.user.id)

        var product = await Product.findById(productId)

        if(user.role == 'User' ){
            res.redirect("/index")
        }else{

            res.render("editProduct",{ title : "Edit Product", user, product })
        }

    } catch (err) {
        console.log(err)
        req.flash("error","Unexpected Error Occured!!!")
        res.redirect("/signin")
    }
}
module.exports = editProduct