const { compile } = require("ejs");
const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/order/"

const middleware = require("../middleware")

const placeOrder = require(`${commonPath}placeOrder`)
const getInvoice = require(`${commonPath}getInvoice`)

router.post("/order",middleware.isLoggedIn,placeOrder)
router.get("/getInvoice-:orderId",middleware.isLoggedIn,getInvoice)

module.exports = router