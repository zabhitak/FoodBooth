var mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
    timeOfUploading : {
        type : Date,
        default : Date.now()
    },
    commentText : String,
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    product : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    userImage : {
        type : String,
        default : ""
    },
    username : {
        type : String,
        default : ""
    }
})

module.exports = mongoose.model("Comment",commentSchema)