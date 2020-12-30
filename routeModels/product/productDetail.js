const User = require("../user/User")
const Admin = require("../admin/Admin")
const Product = require("../admin/product/Product")
myProducts =  async (req,res) => {
    var { productId } = req.params
    try {
        var user,quantity = 1;
        if(req.user){
            if(req.user.role == "User"){
                user = await  User.findById(req.user._id)
                var {cart } = user
                var required = cart.filter(eachOne => {
                    return eachOne.product == productId
                })
                if(required.length != 0){
                    quantity = required[0].quantity
                }
            }else{
                user = await  Admin.findById(req.user._id)
            }
        }
        
        var product = await Product.findById(productId).populate("user")
            .populate({
                path : 'comments',
                populate : {
                    path : 'Comment',
                    model : "Comment",
                }
            })

        var isOwner = false;
        if(req.user){
            if(product.user._id == user._id){
                isOwner = true;
            }
        }
        if(req.user){
            if(req.user.role == "User"){
                res.render("productDetail",{ title : "Product Detail", user, product ,isOwner, quantity })
            }else{
                res.render("admin/productDetail",{ title : "Product Detail", user, product ,isOwner })
            }
        }else{
            res.render("productDetail",{ title : "Product Detail", user, product ,isOwner ,quantity })
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = myProducts