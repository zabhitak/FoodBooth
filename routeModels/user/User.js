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
})


UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema)