const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')


router
.get("/", ProductController.getProductIn)
.post("/", ProductController.productIn)


module.exports = router

