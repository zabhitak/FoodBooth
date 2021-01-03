var mongoose = require("mongoose")

var productSchema = new mongoose.Schema({
    timeOfUploading : {
        type : Date,
        default : Date.now()
    },
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin"
    },
    title : {
        type : String,
        default : "",
    },
    images : [{
        type : String,
        default : []
    }],
    description : {
        type : String,
        default : ""
    },
    price : {
        type : String,
        default : ""
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
        default : []
    }],
    category : {
        type : String,
        default : "Dinner"
    },
    offer : {
        type : String,
        default : "0",
    },
    deliveryCharge : {
        type : String,
        default : "0",
    },
    deliveryTime : {
        type : String,
        default : "",
    } ,
    isAvailable : {
        type : String,
        default : "available"
    }
    
})

module.exports = mongoose.model("Product",productSchema)