var Admin = require("../Admin")

const editProfileFunc = async (req,res) => {
    try {
        var user = await Admin.findById(req.user._id)
        var { fullName, address,  description, phoneNumber, website, } = (req.body)
        if(req.files.length != 0){
            const avatar = req.files[0].path  
            user.avatar = avatar 
        }

        user.fullName = fullName
        user.address = address
        user.description = description
        user.phoneNumber = phoneNumber
        user.website = website

        var savedUser = await user.save()

        var updatedUser = await Admin.findByIdAndUpdate(req.user._id,savedUser)
        req.flash("success","Data updated successfully")
        res.redirect("/admin/index")
        
    } catch (error) {
        console.log(error)
        req.flash("error","Cannot update your data right now !!!")
        res.redirect("/admin/index")
    }
    
} 

module.exports = editProfileFunc