var Admin = require("../Admin")

deliveredOrders = (req,res) => {
    Admin.findById(req.user._id).populate({
        path : 'deliveredOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'deliveredOrders',
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
            var {deliveredOrders} = admin
            var whichOrder = "Delivered Orders"
            res.render("admin/orders",{ user : admin, title : whichOrder, orders : deliveredOrders,whichOrder })
        }
    })
}
module.exports = deliveredOrders