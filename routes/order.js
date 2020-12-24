const { compile } = require("ejs");
const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/order/"

const middleware = require("../middleware")

const placeOrder = require(`${commonPath}placeOrder`)

router.post("/order",middleware.isLoggedIn,placeOrder)

module.exports = router