const express = require('express')
const router = express.Router()

const PrintController = require('../controllers/PrintController')

router
.get("/in", PrintController.printProductIn)
.get("/out", PrintController.printProductOut)
.get("/in/:id", PrintController.printProductIn)
.get("/out/:id", PrintController.printProductOut)

module.exports = router

