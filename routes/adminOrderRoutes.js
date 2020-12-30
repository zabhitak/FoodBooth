const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/admin/order/"

const orderInfo = require(`${commonPath}orderInfo`)
const sendForDelivery = require(`${commonPath}sendForDelivery`)
const cancelOrder = require(`${commonPath}cancelOrder`)
const confirmDelivery = require(`${commonPath}confirmDelivery`)


const currentOrders = require(`${commonPath}currentOrders`)
const onTheWayOrders = require(`${commonPath}onTheWayOrders`)
const deliveredOrders = require(`${commonPath}deliveredOrders`)
const cancelledOrders = require(`${commonPath}cancelledOrders`)

const middleware = require("../middleware")

router.get("/orderInfo-:orderId",middleware.isLoggedIn,orderInfo)

router.get("/currentOrders",middleware.isLoggedIn,currentOrders)
router.get("/onTheWayOrders",middleware.isLoggedIn,onTheWayOrders)
router.get("/deliveredOrders",middleware.isLoggedIn,deliveredOrders)
router.get("/cancelledOrders",middleware.isLoggedIn,cancelledOrders)


router.post("/sendForDelivery-:orderId",middleware.isLoggedIn,sendForDelivery)
router.post("/cancelOrder-:orderId",middleware.isLoggedIn,cancelOrder)
router.post("/confirmDelivery-:orderId",middleware.isLoggedIn,confirmDelivery)


module.exports = router