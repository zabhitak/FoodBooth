var User = require("../user/User")

const settingsRoute = async (req,res) => {
    try {
        var user = await User.findById(req.user._id)
        var { fullName, address,  description, phoneNumber, website, } = (req.body)
        const avatar = req.files[0].path

        user.avatar = avatar
        user.fullName = fullName
        user.address = address
        user.description = description
        user.phoneNumber = phoneNumber
        user.website = website

        var savedUser = await user.save()

        var updatedUser = await User.findByIdAndUpdate(req.user._id,savedUser)
        req.flash("success","Data updated successfully")
        res.redirect("/index")
        
    } catch (error) {
        console.log(error)
        req.flash("error","Cannot update your data right now !!!")
        res.redirect("/index")
    }
    
} 

module.exports = settingsRoute