const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/admin/product/"

const middleware = require("../middleware")

const addProduct = require(`${commonPath}addProduct`)
const addProductFunc = require(`${commonPath}addProductFunc`)
const myProducts = require(`${commonPath}myProducts`)
const postDeleteProduct = require(`${commonPath}deleteProduct`)
const editProduct = require(`${commonPath}editProduct`)
const editProductFunc = require(`${commonPath}editProductFunc`)


router.get("/addProduct",middleware.isLoggedIn,addProduct)
router.post("/addProduct",middleware.isLoggedIn,addProductFunc)

router.get('/editProduct-:productId',middleware.isLoggedIn,editProduct)
router.post('/editProduct-:productId',middleware.isLoggedIn,editProductFunc)


router.get("/myProducts",middleware.isLoggedIn,myProducts)

router.post('/delete-product', middleware.isLoggedIn, postDeleteProduct);

module.exports = router