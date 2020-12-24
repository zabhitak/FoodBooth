var mongoose = require("mongoose")

var orderSchema = new mongoose.Schema({
    timeOfOrder : {
        type : Date,
        default : Date.now()
    },
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        default : []
    }],
    totalCost : {
        type : String,
        default : "0"
    }
    
})

module.exports = mongoose.model("Order",orderSchema)