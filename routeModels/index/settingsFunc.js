var User = require("../user/User")
const multer = require("multer")
const uuid = require("uuid")
const path = require("path")

const fileStorage = multer.diskStorage({
    destination : "images/",
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + uuid.v4() + path.extname(file.originalname));
    }
})
  
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/JPG' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const upload =  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'); 

const settingsRoute = async (req,res) => {
    try {
        var user = await User.findById(req.user.id)
        var { fullName, address,  description,  email,  phoneNumber, website, } = (req.body)
        upload(req,res ,async (err) => {
            if(err){
                console.log(err)
                 req.flash("error","Cannot update your data right now !!!")
                res.redirect("/index")
            }
            if(req.file){
                var avatar = req.file.path
                user.avatar = avatar
            }
            user.fullName = fullName
            user.address = address
            user.description = description
            user.email = email
            user.phoneNumber = phoneNumber
            user.website = website

            var savedUser = await user.save()

            var updatedUser = await User.findByIdAndUpdate(req.user.id,savedUser)
            req.flash("success","Data updated successfully")
            res.redirect("/index")
        } ) 

        
    } catch (error) {
        console.log(error)
        req.flash("error","Cannot update your data right now !!!")
        res.redirect("/index")
    }
    
} 

module.exports = settingsRoute