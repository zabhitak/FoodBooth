var mongoose = require("mongoose")

var otpSchema = new mongoose.Schema({
    timeOfSending : Date,
    otp : String,
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
<<<<<<< HEAD
    role : {
        type : String,
        default : "User"
    },
=======
>>>>>>> 70ed34759fe6a280e752adebb6d508d42378cf40
})

module.exports = mongoose.model("OTP",otpSchema)