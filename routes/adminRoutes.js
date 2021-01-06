const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/admin/index/"

const indexRoute = require(`${commonPath}indexRoute`)
const profile = require(`${commonPath}profile`)
const editProfile = require(`${commonPath}editProfile`)
const editProfileFunc = require(`${commonPath}editProfileFunc`)
const promotionalEmails = require(`${commonPath}promotionalEmails`)
const promotionalEmailsFunc = require(`${commonPath}promotionalEmailsFunc`)
const Feedbacks = require(`${commonPath}Feedbacks`)

const middleware = require("../middleware")

router.get("/index",middleware.isLoggedIn,indexRoute)

router.get("/profile",middleware.isLoggedIn,profile )
router.get("/editProfile",middleware.isLoggedIn,editProfile )
router.post("/editProfile",middleware.isLoggedIn,editProfileFunc )

router.get("/promotionalEmails",middleware.isLoggedIn,promotionalEmails  )
router.post("/promotionalEmails",middleware.isLoggedIn,promotionalEmailsFunc  )

router.get("/feedbacks",middleware.isLoggedIn, Feedbacks )

module.exports = router