const express = require('express')
const router = express.Router()

const LoginController = require('../controllers/LoginController')


router
.post("/login", LoginController.login)
.post("/register", LoginController.register)

module.exports = router

