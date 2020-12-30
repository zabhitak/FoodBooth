var User = require("../user/User")

indexRoute = (req,res) => {
    User.findById(req.user._id).populate({
        path : 'currentOrder',
        populate : {
          path : 'products',
          populate : {
            path : 'product',
            model : "Product"
          }
        }
      }).populate({
        path : 'orders',
        populate : {
          path : 'products',
          populate : {
            path : 'product',
            model : "Product"
          }
        }
      })
    .exec(function(err,user) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signin")
        }else{
            res.render("index",{ user : user, title : "My Profile" })
        }
    })
}
module.exports = indexRoute