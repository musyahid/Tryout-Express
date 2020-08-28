const express = require('express')
const router = express.Router()

const PrintController = require('../controllers/PrintController')

router
.get("/in", PrintController.printProductIn)
.get("/out", PrintController.printProductOut)

module.exports = router

