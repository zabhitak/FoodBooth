var Admin = require("../Admin")

onTheWayOrders = (req,res) => {
    Admin.findById(req.user._id).populate({
        path : 'onTheWayOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'onTheWayOrders',
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
            var {onTheWayOrders} = admin
            var whichOrder = "Sent for delivery Orders"
            res.render("admin/orders",{ user : admin, title : whichOrder, orders : onTheWayOrders,whichOrder })
        }
    })
}
module.exports = onTheWayOrders