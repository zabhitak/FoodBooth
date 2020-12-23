const mongoose = require("mongoose")

var passportLocalMongoose = require("passport-local-mongoose")
const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    otp : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "OTP"
    },
    avatar : {
        type : String,
        default : null
    },
    fullName : {
        type : String,
        default : ""
    },
    address : {
        type : String,
        default : ""
    },
    description : {
        type : String,
        default : ""
    },
    phoneNumber : {
        type : String,
        default : ""
    },
    website : {
        type : String,
        default : ""
<<<<<<< HEAD
    },
    role : {
        type : String,
        default : "User"
    },
    products : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        default : []
    }],
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        default : []
    }]
=======
    }
>>>>>>> 70ed34759fe6a280e752adebb6d508d42378cf40
})
 

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema)