var User = require("../user/User")
const keys = require('../../keys');
const Publishable_Key = keys.Publishable_Key;

myCart =  async (req,res) => {
    
    try {
        var user = await  User.findById(req.user._id).populate({
            path : 'cart',
            populate : {
              path : 'product',
              model : "Product",
            }
          })
        var { totalCost }  = user
        var products = user.cart
        var isOrderAllowed = true
        var orderAllowed = products.filter( eachProduct => {
          return eachProduct.product.isAvailable === "notAvailable"
        } )
        if(orderAllowed.length != 0){
          isOrderAllowed = false
        }
        res.render("myCart",{ title : "My Products", user, products ,totalCost,Publishable_Key,isOrderAllowed })

    } catch (error) {
        req.flash("error","Not able to fetch data from database")
        res.redirect("/index")
    }
   
} 
module.exports = myCart