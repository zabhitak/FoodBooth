var mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
    timeOfUploading : Date,
    commentText : String,
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    product : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
})

module.exports = mongoose.model("Comment",commentSchema)