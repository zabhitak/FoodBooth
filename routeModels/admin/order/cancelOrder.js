var Admin = require("../Admin")
var Order = require("../../order/Order")

orderInfo =  async (req,res) => {
    const { orderId } = req.params
    try {
        if(req.user.role == 'User'){
            res.redirect("/index")
        }
        var adminId = req.user._id
        var order = await Order.findById(orderId).populate("customer")

        var { customer  } = order

        var admin = await Admin.findById(adminId)

        order.status = "cancelled"

        await order.save()

        var currentlyCurrentOrders = admin.currentOrders
        var currentlyCancelledOrders = admin.cancelledOrders

        var requiredIndex = currentlyCurrentOrders.findIndex(eachOne => eachOne._id == orderId );

        var requiredOrder = currentlyCurrentOrders[requiredIndex]

        currentlyCancelledOrders.unshift(requiredOrder)

        delete currentlyCurrentOrders[requiredIndex]

        currentlyCurrentOrders = currentlyCurrentOrders.filter( eachOne => {
            return eachOne != null
        } )

        admin.currentOrders = currentlyCurrentOrders

        var savedAdmin = await admin.save()

        var updatedAdmin = await Admin.findByIdAndUpdate(adminId,savedAdmin)

        const eventEmitter = req.app.get('eventEmitter')
        var data = {
            username : customer.username,
            address : customer.address,
            userId : customer._id      
        } 
        eventEmitter.emit('cancelOrder', data)

        req.flash("success","Order cancelled successfully")

        res.redirect("/admin/index")

    } catch (error) {
        console.log(error)
        req.flash("error","Unable to fetch data")
        res.redirect("/admin/index")
    }
}
module.exports = orderInfo