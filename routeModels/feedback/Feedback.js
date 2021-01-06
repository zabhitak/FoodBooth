var mongoose = require("mongoose")

var FeedbackSchema = new mongoose.Schema({
    email : {
        type : String,
        default : ""
    },
    name : {
        type : String,
        default : ""
    },
    address : {
        type : String,
        default : ""
    },
    cost : {
        type : String,
        default : ""
    },
    message : {
        type : String,
        default : ""
    },
    time : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Feedback",FeedbackSchema)