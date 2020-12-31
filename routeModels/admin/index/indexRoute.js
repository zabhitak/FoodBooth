var Admin = require("../Admin")

indexRoute = (req,res) => {
    Admin.findById(req.user._id).populate({
        path : 'currentOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'deliveredOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'cancelledOrders',
        populate : {
          path : 'customer',
        }
      }).populate({
        path : 'onTheWayOrders',
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
      }).populate({
        path : 'deliveredOrders',
        populate : {
          path : 'products',
          populate : {
            path : 'product',
            model : "Product"
          }
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
          if(admin){
            if(admin.role == 'User' ){
              res.redirect("/index")
            }else{
              var {onTheWayOrders,cancelledOrders,currentOrders,deliveredOrders} = admin
              res.render("admin/dashboard",{ user : admin, title : "Dashboard",onTheWayOrders,cancelledOrders,currentOrders,deliveredOrders })
         
            }
          }else{
            res.redirect("/index")
          }
        }
    })
}
module.exports = indexRoute