var mongoose = require("mongoose")

var EmailSchema = new mongoose.Schema({
    email : {
        type : String,
        default : ""
    }
    
})

module.exports = mongoose.model("Email",EmailSchema)