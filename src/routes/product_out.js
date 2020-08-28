const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')


router
.get("/", ProductController.getProductOut)
.post("/", ProductController.productOut)


module.exports = router

