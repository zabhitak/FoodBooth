const { compile } = require("ejs");
const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/order/"

const middleware = require("../middleware")

const placeOrder = require(`${commonPath}placeOrder`)
const getInvoice = require(`${commonPath}getInvoice`)
const deleteOrderFromHistory = require(`${commonPath}deleteOrderFromHistory`)



router.post("/order",middleware.isLoggedIn,placeOrder)
router.get("/getInvoice-:orderId",middleware.isLoggedIn,getInvoice)
router.get("/deleteOrderFromHistory-:orderId-:index",middleware.isLoggedIn,deleteOrderFromHistory)



module.exports = router