const Product = require("./Product")
const User = require("../user/User")

const removeFromCart = async (req,res) => {
    const { productId, index} = req.params

    try {
        var user = await User.findById(req.user.id)
        
        var product = await Product.findById(productId)

        var currentCart = user.cart
        delete currentCart[index]
        
        var newCart = currentCart.filter( eachOne => {
            return eachOne != null
        } )

        user.cart = newCart

        var { price, deliveryCharge } = product

        var indexOfDollar = price.indexOf('$')
        var indexOfDollarDC = price.indexOf('$')
        var productPrice , productDeleveryCharge, currency

        if(indexOfDollar == -1){
            var indexOfRs = price.indexOf('Rs')
            var indexOfRsDC = price.indexOf('Rs')
            productPrice = parseFloat( price.slice(indexOfRs+1,price.length) )
            productDeleveryCharge = parseFloat( deliveryCharge.slice(indexOfRsDC+1,deliveryCharge.length) )
            currency =  price.slice(0,indexOfDollar+1)
        }else{
            productPrice = parseFloat( price.slice(indexOfDollar+1,price.length) )
            productDeleveryCharge = parseFloat( deliveryCharge.slice(indexOfDollarDC+1,deliveryCharge.length) )
            currency =  price.slice(0,indexOfDollar+1)
        }
        var totalCost =  parseFloat(user.totalCost) - parseFloat(productPrice) - parseFloat(productDeleveryCharge)
        if(totalCost < 0){
            totalCost = 0
        }
        user.totalCost = totalCost

        await user.save()

        var updatedUser = await User.findByIdAndUpdate(req.user.id)

        req.flash("success",`${product.title} removed from cart`)
        res.redirect(`myCart`)

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot reomve from cart right now")
        res.redirect(`myCart`)
    }
}

module.exports = removeFromCart