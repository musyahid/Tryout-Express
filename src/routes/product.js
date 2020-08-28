const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')


router
.get("/", ProductController.getProduct)
.post("/", ProductController.saveProduct)

router.route("/:id")
.get(ProductController.getProductById)
.patch(ProductController.updateProduct)
.delete(ProductController.deleteProduct)


module.exports = router

