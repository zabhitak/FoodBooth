var mongoose = require("mongoose")

var orderSchema = new mongoose.Schema({
    timeOfOrder : {
        type : Date,
        default : Date.now()
    },
    customer : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin"
    },
    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            default : null
        },
        quantity : {
            type : String,
            default : 1
        },
        default : []
    }],
    totalCost : {
        type : String,
        default : "0"
    },
    status : {
        type : String,
        default : "Accepted" // accepted -> current .. delivered .. cancelled .. onTheWay
    }
    
})

module.exports = mongoose.model("Order",orderSchema)