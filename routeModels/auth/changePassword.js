const User = require("../user/User")

const changePassword = async (req,res) => {
    const userID  = req.user.id
    const { password,confirmPassword } = req.body
    try{
        if(password !== confirmPassword){
            req.flash("error","Passwords are not same")
            res.redirect("/settings")
        }else if(password.length < 6){
            req.flash("error","Password length must be atleast 6")
            res.redirect("/settings")
        }else{
            var user = await User.findById(userID)

            await user.setPassword(password)
    
            var savedUser = await user.save()
    
            var updated = await User.findByIdAndUpdate(userID,savedUser)
    
            req.flash("success","Password changed successfully !!!")
            res.redirect("/index")
        }
        

    }catch(err){
        console.log(err)
        req.flash("error","Cannot reset your password right now!!!")
        res.redirect("/")
    }
}

module.exports = changePassword