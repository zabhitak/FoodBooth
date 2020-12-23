const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/product/"

const middleware = require("../middleware")

const addProduct = require(`${commonPath}addProduct`)
const addProductFunc = require(`${commonPath}addProductFunc`)
const myProducts = require(`${commonPath}myProducts`)
const productDetail = require(`${commonPath}productDetail`)

router.get("/addProduct",middleware.isLoggedIn,addProduct)
router.post("/addProduct",addProductFunc)

router.get("/myProducts",middleware.isLoggedIn,myProducts)
router.get("/productDetail-:productId",productDetail)



module.exports = router