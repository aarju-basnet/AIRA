const express = require('express')
const userController = require('../Controllers/userController')
const authMiddleware = require('../Middlewares/authMiddleware')


const router = express.Router()

router.post('/register', userController.register)

router.post('/verify-email',  authMiddleware.protect, userController.verifyEmail)

router.post('/login',   userController.login)
router.post('/logout', userController.logout)

router.post('/reset-password', userController.resetPasswords)
router.post('/enter-otp', userController.enterotp)

// ✅ middleware first, controller second
router.get('/data', authMiddleware.protect, userController.getuserdata)

module.exports = router
