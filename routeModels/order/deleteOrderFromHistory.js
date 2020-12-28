
const Order = require("./Order")
const User = require("../user/User")

const deleteOrderFromHistory = async (req,res) => {
    const { orderId, index} = req.params

    try {
        var user = await User.findById(req.user.id)
        
        var order = await Order.findByIdAndDelete(orderId)


        req.flash("success",`Order removed from history`)
        res.redirect(`index`)

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot reomve order from history right now")
        res.redirect(`index`)
    }
}

module.exports = deleteOrderFromHistory