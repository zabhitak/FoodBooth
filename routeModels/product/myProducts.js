var User = require("../user/User")

myProducts =  async (req,res) => {
    
    try {
        var user = await  User.findById(req.user.id).populate({
            path : 'products',
            populate : {
              path : 'User',
              model : "User",
            }
          })
        if(user.role == 'User'){
            res.redirect("/index")
        }
        var { products } = user
        
        res.render("products",{ title : "My Products", user, products , myProducts : true })
    } catch (error) {
        req.flash("error","Not able to fetch data from database")
        res.redirect("/index")
    }
   
} 
module.exports = myProducts