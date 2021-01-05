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

        order.status = "delivered"

        await order.save()

        var currentlyOnTheWayOrders = admin.onTheWayOrders
        var currentlydeliveredOrders = admin.deliveredOrders

        var requiredIndex = currentlyOnTheWayOrders.findIndex(eachOne => eachOne._id == orderId );

        var requiredOrder = currentlyOnTheWayOrders[requiredIndex]

        currentlydeliveredOrders.unshift(requiredOrder)

        delete currentlyOnTheWayOrders[requiredIndex]

        currentlyOnTheWayOrders = currentlyOnTheWayOrders.filter( eachOne => {
            return eachOne != null
        } )

        admin.onTheWayOrders = currentlyOnTheWayOrders

        var savedAdmin = await admin.save()

        var updatedAdmin = await Admin.findByIdAndUpdate(adminId,savedAdmin)

        const eventEmitter = req.app.get('eventEmitter')
        var data = {
            username : customer.username,
            address : customer.address,
            userId : customer._id      
        } 
        eventEmitter.emit('confirmDelivery', data)

        req.flash("success","Order's delivery registered successfully")

        res.redirect("/admin/index")

    } catch (error) {
        console.log(error)
        req.flash("error","Unable to fetch data")
        res.redirect("/admin/index")
    }
}
module.exports = orderInfo