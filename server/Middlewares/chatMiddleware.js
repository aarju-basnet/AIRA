const chatModel = require('../models/chat')

async function checkChatOwner(req, res, next) {
  try {
    const chatId = req.params.chatId || req.body.chatId;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    req.chat = chat; 
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { checkChatOwner };
