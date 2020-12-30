var User = require("../user/User")

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
        res.render("myCart",{ title : "My Products", user, products ,totalCost })

    } catch (error) {
        req.flash("error","Not able to fetch data from database")
        res.redirect("/index")
    }
   
} 
module.exports = myCart