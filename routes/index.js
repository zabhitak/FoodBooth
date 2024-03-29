const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/index/"

const indexRoute = require(`${commonPath}indexRoute`)
const settingsRoute = require(`${commonPath}settingsRoute`)
const settingsFunc = require(`${commonPath}settingsFunc`)

const middleware = require("../middleware");
const sendFeedback = require("../routeModels/feedback/sendFeedback");

const User = require("../routeModels/user/User")

router.get('/', async (req,res) => {
    user = null
    if(req.user){
        user = await User.findById(req.user._id)
        if(req.user.role == "Admin"){
            res.redirect("/admin/index")
        }else{
            res.render("home",{ user, title : "Home" })
        }
    }else{
        res.render("home",{ user, title : "Home" })
    }
} )

router.get("/index",middleware.isLoggedIn,indexRoute)

router.get('/settings',middleware.isLoggedIn,settingsRoute)
router.post("/settings",middleware.isLoggedIn,settingsFunc)

router.post("/feedback",sendFeedback)


module.exports = router