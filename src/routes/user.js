const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')


router
.get("/", UserController.getUser)
.post("/", UserController.saveUser)

router.route("/:id")
.get(UserController.getUserById)
.patch(UserController.updateUser)
.delete(UserController.deleteUser)

module.exports = router

