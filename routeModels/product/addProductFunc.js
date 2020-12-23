const User = require("../user/User")
const Product = require("./Product")
addProductFunc = async (req,res) => {
    try {
        const userId = req.user.id
        var user = await User.findById(userId)
        if(user.role == 'User'){
          res.redirect("/index")
        }else{
          
          const { title, price, description, category, offer,deliveryCharge,deliveryTime } = (req.body)
          var images = []
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
          const newProduct = await Product.create({ title,price,description,images, user,category, offer,deliveryCharge,deliveryTime })
  
          user.products.unshift(newProduct)

          var savedUser = await user.save()

          var updatedUser = await User.findByIdAndUpdate(userId, savedUser )

          req.flash("success","Your product uploaded successfully")
          res.redirect("/index")

        }
        
    } catch (err) {
        console.log(err)
        req.flash("error","Cannot Add Product Right Now !!!")
        res.redirect("/index")
    }
}

module.exports = addProductFunc