const User = require("../user/User")
const Product = require("./Product")
const fileHelper = require('../../util/file');

editProductFunc = async (req,res) => {
    const { productId } = req.params
    try {
        const userId = req.user.id
        var user = await User.findById(userId)

        var product = await Product.findById(productId)

        if(user.role == 'User'){
          res.redirect("/index")
        }else{
          
            const { title, price, description, category, offer,deliveryCharge,deliveryTime } = (req.body)
            var images = []
            product.title = title
            product.price = price
            product.description = description
            product.category = category
            product.offer = offer
            product.deliveryCharge = deliveryCharge
            product.deliveryTime = deliveryTime
            if(req.files.length != 0){
                product.images.forEach(element => {
                    fileHelper.deleteFile(element);
                });
                if(req.files[0]){
                    images.push(req.files[0].path)
                    }
                if(req.files[1]){
                    images.push(req.files[1].path)
                    }
                if(req.files[2]){
                    images.push(req.files[2].path)
                    }
                if(req.files[3]){
                    images.push(req.files[3].path)
                }
                 product.images = images
            }
            await product.save()

            req.flash("success","Your product edited successfully")
            res.redirect(`/productDetail-${productId}`)

        }
        
    } catch (err) {
        console.log(err)
        req.flash("error","Cannot Add Product Right Now !!!")
        res.redirect("/index")
    }
}

module.exports = editProductFunc