const Product = require("./Product")
const User = require("../user/User")

const addToCart = async (req,res) => {
    const {productId} = req.params
    try {
        var user = await User.findById(req.user.id)
        
        var product = await Product.findById(productId)

        user.cart.unshift(product)
        // user.cart.products = []

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
        // if( user.cart.length != 1 ){
        //     productDeleveryCharge = 0;
        // }
        var totalCost =  parseFloat(user.totalCost) + parseFloat(productPrice) + parseFloat(productDeleveryCharge)
               
        user.totalCost = totalCost

        await user.save()

        var updatedUser = await User.findByIdAndUpdate(req.user.id)

        req.flash("success",`${product.title} added to cart`)
        res.redirect(`productDetail-${productId}`)

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot add to cart")
        res.redirect(`productDetail-${productId}`)
    }
}

module.exports = addToCart