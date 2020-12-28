var User = require("../user/User")
var Order = require("./Order")


placeOrder = async (req,res) => {
    const userId = req.user.id
    try {
        var user = await User.findById(userId)

        var products = user.cart

        var restaurant = await User.findById(products[0].user)

        var { totalCost } = user

        var newOrder = await Order.create({ customer : user , products,totalCost ,restaurant })

        user.currentOrder = newOrder

        if(user.orders.length > 10){
            user.orders = user.orders.slice(0,10) // max 10 orders at a time
        }

        user.orders.unshift(newOrder)

        user.cart = []

        user.totalCost = 0

        var savedUser = await user.save()

        var updatedUser = await User.findByIdAndUpdate(userId,savedUser)

        req.flash("success","Order placed successfully")
        res.redirect("/index")

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot place order right now")
        res.redirect("/myCart")
    }
}
module.exports = placeOrder