var Admin = require("../Admin")

currentOrders = (req,res) => {
    Admin.findById(req.user._id).populate({
        path : 'currentOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'currentOrders',
        populate : {
          path : 'products',
          populate : {
            path : 'product',
            model : "Product"
          }
        }
      })
    .exec(function(err,admin) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }else{
            var {currentOrders} = admin
            var whichOrder = "Current Orders"
            res.render("admin/orders",{ user : admin, title : whichOrder, orders : currentOrders,whichOrder })
        }
    })
}
module.exports = currentOrders