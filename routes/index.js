const express = require("express")
const router = express.Router();

const indexRoute = require("../routeModels/index/indexRoute")

const middleware = require("../middleware")

const User = require("../routeModels/user/User")

router.get('/', async (req,res) => {
    user = null
    if(req.user){
        user = await User.findById(req.user.id)

    }
    res.render("home",{ user })
} )

router.get("/index",middleware.isLoggedIn,indexRoute)

module.exports = router