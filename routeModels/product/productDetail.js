const User = require("../user/User")
const Product = require("./Product")
myProducts =  async (req,res) => {
    try {
        var user;
        if(req.user){
            user = await  User.findById(req.user.id)
        }
        var product = await Product.findById(req.params.productId).populate("user")
            .populate({
                path : 'comments',
                populate : {
                    path : 'Comment',
                    model : "Comment",
                }
            })

          var isOwner = false;
          if(req.user){
            if(product.user.id == user.id){
                isOwner = true;
              }
          }
        
        res.render("productDetail",{ title : "Product Detail", user, product ,isOwner })
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = myProducts