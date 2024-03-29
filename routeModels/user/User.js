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
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            default : null
        },
        quantity : {
            type : String,
            default : 1,
        },
    }] ,
    totalCost : {
        type : String,
        default : "0"
    },
    currentOrder : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order",
    },
    orders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order",
        default : []
    }]
})
 

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema)