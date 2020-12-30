var Admin = require("../Admin")

cancelledOrders = (req,res) => {
    Admin.findById(req.user._id).populate({
        path : 'cancelledOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'cancelledOrders',
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
            var {cancelledOrders} = admin
            var whichOrder = "Cancelled Orders"
            res.render("admin/orders",{ user : admin, title : whichOrder, orders : cancelledOrders,whichOrder })
        }
    })
}
module.exports = cancelledOrders