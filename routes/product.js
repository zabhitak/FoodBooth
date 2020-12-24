const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/product/"

const middleware = require("../middleware")

const addProduct = require(`${commonPath}addProduct`)
const addProductFunc = require(`${commonPath}addProductFunc`)
const myProducts = require(`${commonPath}myProducts`)
const productDetail = require(`${commonPath}productDetail`)
const allProducts = require(`${commonPath}allProducts`)
const addComment = require(`${commonPath}addComment`)
const addToCart = require(`${commonPath}addToCart`)
const myCart = require(`${commonPath}myCart`)
const removeFromCart = require(`${commonPath}removeFromCart`)
const postDeleteProduct = require(`${commonPath}deleteProduct`)

router.get('/allProducts',allProducts)

router.get("/addProduct",middleware.isLoggedIn,addProduct)
router.post("/addProduct",addProductFunc)

router.get("/myProducts",middleware.isLoggedIn,myProducts)
router.get("/productDetail-:productId",productDetail)

router.post('/addComment-:productId',middleware.isLoggedIn,addComment)

router.get('/addToCart-:productId',middleware.isLoggedIn,addToCart)

router.get('/myCart',middleware.isLoggedIn,myCart)

router.get('/remove-:productId-:index',middleware.isLoggedIn,removeFromCart)

router.post('/delete-product', middleware.isLoggedIn, postDeleteProduct);

module.exports = router