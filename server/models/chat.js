const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },

    content: {
      type: String, // prompt or text reply
    },

    imageUrl: {
      type: String, // generated image URL
    },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },

    messages: [messageSchema],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
