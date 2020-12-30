const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/product/"

const middleware = require("../middleware")

const productDetail = require(`${commonPath}productDetail`)
const allProducts = require(`${commonPath}allProducts`)
const addComment = require(`${commonPath}addComment`)
const addToCart = require(`${commonPath}addToCart`)
const myCart = require(`${commonPath}myCart`)
const removeFromCart = require(`${commonPath}removeFromCart`)

router.get('/allProducts',allProducts)

router.get("/productDetail-:productId",productDetail)

router.post('/addComment-:productId',middleware.isLoggedIn,addComment)

router.post('/addToCart-:productId',middleware.isLoggedIn,addToCart)

router.get('/myCart',middleware.isLoggedIn,myCart)

router.get('/remove-:productId-:index',middleware.isLoggedIn,removeFromCart)

module.exports = router