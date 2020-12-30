var Admin = require("../Admin")
var Order = require("../../order/Order")

orderInfo =  async (req,res) => {
    const { orderId } = req.params
    try {
        if(req.user.role == 'User'){
            res.redirect("/index")
        }
        var order = await Order.findById(orderId).populate("customer").populate({
              path : 'products',
              populate : {
                path : 'product',
                model : "Product"
              }
          })
        var admin = Admin.findById(req.user.id)
        
        res.render("admin/orderInfo",{ user : admin, order, title : "Order Info"  })

    } catch (error) {
        console.log(error)
        req.flash("error","Unable to fetch data")
        res.redirect("/admin")
    }
}
module.exports = orderInfo