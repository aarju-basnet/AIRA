const express = require('express')
const{protect} =require('../Middlewares/authMiddleware')
const{aiLimiter} = require('../Middlewares/rateLimiters')
const { checkChatOwner } = require('../Middlewares/chatMiddleware')
const { createChat, addMessage, getUserChats, getChatById,  deleteChat,} = require('../Controllers/chatController')

const router = express.Router()

router.post("/create",  protect, createChat)

router.post("/message", protect, aiLimiter, checkChatOwner, addMessage)

router.get("/", protect, getUserChats)


router.get("/:chatId", protect, checkChatOwner, getChatById)

router.delete("/:chatId", protect, checkChatOwner, deleteChat)

module.exports = router

