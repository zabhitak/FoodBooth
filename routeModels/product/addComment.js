const Product = require("./Product")
const Comment = require("./Comment")
const User = require("../user/User")
const addComment = async (req,res) => {
    const {productId} = req.params
    try {
        var user = await User.findById(req.user.id)
        var userImage = user.avatar
        var username = user.username
        var product = await Product.findById(productId)

        var { commentText } = req.body

        var newComment = await Comment.create({ commentText, product, user,userImage,username })

        product.comments.unshift(newComment)

        await product.save()
        

        req.flash("success","Comment added successfully")
        res.redirect(`productDetail-${productId}`)

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot add comment right now")
        res.redirect(`productDetail-${productId}`)
    }
}

module.exports = addComment