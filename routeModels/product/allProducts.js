var User = require("../user/User")
var Products = require("../admin/product/Product")

allProducts =  async (req,res) => {
    try {
        var user;
        if(req.user){
            user = await  User.findById(req.user._id)
        }
             
        var products = await Products.find({}).populate("user")

        
        res.render("products",{ title : "All Products", user, products , myProducts : false })
    } catch (error) {
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = allProducts