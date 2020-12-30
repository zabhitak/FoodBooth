const Product = require("../admin/product/Product")
const User = require("../user/User")

const addToCart = async (req,res) => {
    const {productId} = req.params
    var totalCost
    try {
        
        var user = await User.findById(req.user._id)
        var { quantity } = req.body

        var product = await Product.findById(productId)

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

        var currentCart  = user.cart
       
        var requiredIndex = currentCart.findIndex(eachOne => eachOne.product == productId );

        var newItem = {
            product ,
            quantity
        }

        if(requiredIndex != -1){
            var currentQuantity = user.cart[requiredIndex].quantity
            user.cart[requiredIndex] = newItem
            totalCost =  parseFloat(user.totalCost) + (quantity - currentQuantity) * ( parseFloat(productPrice) + parseFloat(productDeleveryCharge))
            
        }else{
            user.cart.unshift(newItem)
            totalCost =  parseFloat(user.totalCost) + quantity * ( parseFloat(productPrice) + parseFloat(productDeleveryCharge))
            
        }

        // user.cart.products = []

        // if( user.cart.length != 1 ){
        //     productDeleveryCharge = 0;
        // }
        user.totalCost = totalCost

        await user.save()

        var updatedUser = await User.findByIdAndUpdate(req.user._id)

        req.flash("success",`${product.title} added to cart`)
        res.redirect(`productDetail-${productId}`)

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot add to cart")
        res.redirect(`productDetail-${productId}`)
    }
}

module.exports = addToCart