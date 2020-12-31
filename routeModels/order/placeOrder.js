var User = require("../user/User")
var Order = require("./Order")
var Admin = require("../admin/Admin")


placeOrder = async (req,res) => {
    const userId = req.user._id
    try {
        var user = await User.findById(userId).populate({
            path : 'cart',
            populate : {
              path : 'product',
              model : "Product",
            }
          })

        var products = user.cart
        var adminId = products[0].product.user
        var admin = await Admin.findById(adminId)

        var { totalCost } = user

        var newOrder = await Order.create({ customer : user , products,totalCost ,restaurant : admin })

        user.currentOrder = newOrder

        if(user.orders.length > 10){
            user.orders = user.orders.slice(0,10) // max 10 orders at a time
        }

        user.orders.unshift(newOrder)

        user.cart = []

        user.totalCost = 0

        var savedUser = await user.save()

        var updatedUser = await User.findByIdAndUpdate(userId,savedUser)

        admin.currentOrders.unshift(newOrder)

        await admin.save()

        req.flash("success","Order placed successfully")
        // res.redirect("/index")
        return res.json({redirect : "/index"})

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot place order right now")
        // res.redirect("/myCart")
        return res.json({redirect : "/index"})
    }
}
module.exports = placeOrder


